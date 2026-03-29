import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../src/lib/engine/store';
import { auditLogger } from '../src/lib/engine/logger';
import { generateApiKey, hashKey } from '../src/lib/engine/crypto';
import { evaluate } from '../src/lib/engine/evaluator';
import { validateInput, CreatePolicySchema, AuthorizeSchema } from '../src/lib/engine/schema';

// ─── Test Helpers ────────────────────────────────────────────────

function setupPolicyAndKey(overrides?: { ttl?: number; status?: 'active' | 'revoked' }) {
  const policy = store.createPolicy({
    max_spend: 5000,
    vendor: 'aws',
    ttl: overrides?.ttl ?? 3600,
    allowed_actions: ['compute.deploy', 'storage.write'],
  });

  const rawKey = generateApiKey();
  const hashed = hashKey(rawKey);
  const keyRecord = store.createKey(hashed, policy.id, overrides?.ttl ?? 3600);

  if (overrides?.status === 'revoked') {
    store.revokeKey(hashed);
  }

  return { policy, rawKey, hashed, keyRecord };
}

// ─── Tests ───────────────────────────────────────────────────────

describe('Deterministic Policy Enforcement Engine', () => {
  beforeEach(() => {
    store.reset();
    auditLogger.reset();
  });

  // ── 1. Approved Transaction ──────────────────────────────────
  it('should APPROVE a valid transaction', () => {
    const { policy, rawKey } = setupPolicyAndKey();

    const result = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 120,
      action: 'compute.deploy',
    });

    expect(result.decision).toBe('APPROVED');
    expect(result.reason).toBe('all checks passed');
    expect(result.remaining_budget).toBe(5000 - 120);
    expect(result.policy_id).toBe(policy.id);
    expect(result.timestamp).toBeDefined();

    // Verify audit log was written
    const logs = auditLogger.getAll();
    expect(logs.length).toBe(1);
    expect(logs[0].decision).toBe('APPROVED');
  });

  // ── 2. Limit Exceeded ────────────────────────────────────────
  it('should DENY when amount exceeds remaining budget', () => {
    const { rawKey } = setupPolicyAndKey();

    const result = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 9999,
      action: 'compute.deploy',
    });

    expect(result.decision).toBe('DENIED');
    expect(result.reason).toContain('exceeds remaining budget');
  });

  // ── 3. Expired Key ──────────────────────────────────────────
  it('should DENY when key is expired', () => {
    // TTL of 0 seconds = immediately expired
    const policy = store.createPolicy({
      max_spend: 5000,
      vendor: 'aws',
      ttl: 0,
      allowed_actions: ['compute.deploy'],
    });

    const rawKey = generateApiKey();
    const hashed = hashKey(rawKey);
    // Manually create with a past expiry
    const keyId = 'key_expired';
    const record = store.createKey(hashed, policy.id, -1); // negative TTL → past expiry

    const result = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 100,
      action: 'compute.deploy',
    });

    expect(result.decision).toBe('DENIED');
    expect(result.reason).toBe('api_key is expired');
  });

  // ── 4. Invalid Vendor ────────────────────────────────────────
  it('should DENY when vendor does not match policy', () => {
    const { rawKey } = setupPolicyAndKey();

    const result = evaluate({
      api_key: rawKey,
      vendor: 'gcp',       // policy expects 'aws'
      amount: 100,
      action: 'compute.deploy',
    });

    expect(result.decision).toBe('DENIED');
    expect(result.reason).toContain("vendor 'gcp' does not match");
  });

  // ── 5. Revoked Key ──────────────────────────────────────────
  it('should DENY when key is revoked', () => {
    const { rawKey } = setupPolicyAndKey({ status: 'revoked' });

    const result = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 100,
      action: 'compute.deploy',
    });

    expect(result.decision).toBe('DENIED');
    expect(result.reason).toBe('api_key is revoked');
  });

  // ── 6. Invalid Action ───────────────────────────────────────
  it('should DENY when action is not allowed by policy', () => {
    const { rawKey } = setupPolicyAndKey();

    const result = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 100,
      action: 'admin.delete',   // not in allowed_actions
    });

    expect(result.decision).toBe('DENIED');
    expect(result.reason).toContain("action 'admin.delete' is not allowed");
  });

  // ── 7. Unknown Key ──────────────────────────────────────────
  it('should DENY when api_key does not exist', () => {
    const result = evaluate({
      api_key: 'vx_nonexistent',
      vendor: 'aws',
      amount: 100,
      action: 'compute.deploy',
    });

    expect(result.decision).toBe('DENIED');
    expect(result.reason).toBe('api_key not found');
  });

  // ── 8. Simulate does not mutate budget ──────────────────────
  it('simulate should not deduct budget', () => {
    const { rawKey } = setupPolicyAndKey();

    const sim = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 1000,
      action: 'compute.deploy',
    }, { mutate: false });

    expect(sim.decision).toBe('APPROVED');
    expect(sim.remaining_budget).toBe(5000); // not deducted

    // Real authorize should still see full budget
    const real = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 1000,
      action: 'compute.deploy',
    }, { mutate: true });

    expect(real.decision).toBe('APPROVED');
    expect(real.remaining_budget).toBe(4000); // now deducted
  });

  // ── 9. Schema Validation ────────────────────────────────────
  it('should reject invalid schema inputs', () => {
    const result = validateInput(AuthorizeSchema, {
      api_key: '',         // empty
      vendor: 'aws',
      amount: -10,         // negative
      action: 'deploy',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    }
  });

  // ── 10. Deterministic evaluation order ──────────────────────
  it('should deny at earliest possible step (revoked before expired)', () => {
    // Create key that is BOTH revoked AND expired
    const policy = store.createPolicy({
      max_spend: 5000,
      vendor: 'aws',
      ttl: -1,
      allowed_actions: ['compute.deploy'],
    });
    const rawKey = generateApiKey();
    const hashed = hashKey(rawKey);
    store.createKey(hashed, policy.id, -1); // expired
    store.revokeKey(hashed); // also revoked

    const result = evaluate({
      api_key: rawKey,
      vendor: 'aws',
      amount: 100,
      action: 'compute.deploy',
    });

    // Should hit 'revoked' check (step 2) BEFORE 'expired' check (step 3)
    expect(result.decision).toBe('DENIED');
    expect(result.reason).toBe('api_key is revoked');
  });
});
