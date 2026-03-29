import { store } from './store';
import { logger } from './logger';
import { hashToken, generateId } from './crypto';
import { Transaction, TransactionSchema } from './schema';

export type EvaluationResult = {
  decision: 'APPROVED' | 'DENIED';
  reason: string;
  transaction?: Transaction;
};

export class KYCError extends Error {}
export class AMLError extends Error {}
export class AuthError extends Error {}
export class ScopeError extends Error {}
export class BudgetError extends Error {}

/**
 * Deterministic KYA Evaluation Engine
 */
export function evaluateTransaction(
  rawToken: string,
  vendor: string,
  amount: number,
  action?: string,
  simulate: boolean = false
): EvaluationResult {
  const tokenHash = hashToken(rawToken);

  try {
    // 1. Validate Auth Token exists
    const authToken = store.getAuthToken(tokenHash);
    if (!authToken) {
      throw new AuthError('Invalid authorization token');
    }

    // 2. Check token status
    if (authToken.status !== 'active') {
      throw new AuthError(`Token is ${authToken.status}`);
    }

    // 3. Check token expiration
    if (authToken.expiration && new Date(authToken.expiration) < new Date()) {
      throw new AuthError('Token has expired');
    }

    // 4. Load Agent & Delegation Chain
    const agent = store.getAgent(authToken.agent_id);
    if (!agent) {
      throw new AuthError('Associated agent not found');
    }
    if (agent.status !== 'active') {
      throw new AuthError(`Agent is ${agent.status}`);
    }

    const parentIdentity = store.getIdentity(agent.parent_identity_id);
    if (!parentIdentity) {
      throw new AuthError('Parent identity not found (broken delegation chain)');
    }

    // 5. Verify Identity KYC Status
    if (!parentIdentity.verified_kyc) {
      throw new KYCError('Parent identity failed KYC verification');
    }

    // 6. Validate Vendor Scope
    if (authToken.allowed_vendors && !authToken.allowed_vendors.includes(vendor)) {
      throw new ScopeError(`Vendor '${vendor}' is outside of authorized scope.`);
    }

    // 7. Validate Action Scope (if provided)
    if (action && !authToken.scope.includes(action)) {
       throw new ScopeError(`Action '${action}' is outside of authorized scope.`);
    }

    // 8. Financial / Budget Checks
    if (amount <= 0) {
      throw new BudgetError('Transaction amount must be strictly positive');
    }
    if (authToken.remaining_budget < amount) {
      throw new BudgetError(`Insufficient funds. Required: ${amount}, Remaining: ${authToken.remaining_budget}`);
    }

    // 9. AML Signal Emulation (Suspicious Velocity / Patterns)
    // For the demo, anything over $9990 is flagged
    if (amount > 9990) {
      throw new AMLError(`High-value autonomous transaction flagged by AML monitors.`);
    }

    // --- DECISION: APPROVED ---
    
    // Mutate state ONLY if not simulating
    if (!simulate) {
      authToken.remaining_budget -= amount;
      if (authToken.remaining_budget === 0) {
        authToken.status = 'exhausted';
      }
    }

    const transaction: Transaction = {
      id: generateId('txn_'),
      agent_id: agent.id,
      vendor,
      amount,
      decision: 'APPROVED',
      reason: 'Transaction cryptographically verified and within scoped limits.',
      timestamp: new Date().toISOString(),
    };

    if (!simulate) {
      store.saveTransaction(transaction);
      logger.log('TRANSACTION_EVALUATED', agent.id, transaction.id, {
        decision: transaction.decision,
        amount,
        vendor,
        identity: parentIdentity.id,
      });
    }

    return {
      decision: 'APPROVED',
      reason: transaction.reason,
      transaction,
    };

  } catch (err: any) {
    // --- DECISION: DENIED ---
    const decision = 'DENIED';
    const reason = err.message || 'Unknown evaluation error';
    
    // Create the transaction record even for denials
    const transaction: Transaction = {
      id: generateId('txn_'),
      // If we failed before loading the agent, we just log "unknown_agent"
      agent_id: err instanceof AuthError && err.message === 'Invalid authorization token' ? 'unknown_agent' : 'unknown',
      vendor,
      amount,
      decision,
      reason,
      timestamp: new Date().toISOString(),
    };

    if (!simulate) {
      store.saveTransaction(transaction);
      logger.log('TRANSACTION_EVALUATED', transaction.agent_id, transaction.id, {
        decision,
        reason,
        amount,
        vendor
      });
    }

    return {
      decision,
      reason,
      transaction,
    };
  }
}
