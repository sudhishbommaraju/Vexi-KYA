import { z } from 'zod';

// Base ID Types
const IdPrefixes = {
  identity: 'id_',
  agent: 'ag_',
  delegation: 'del_',
  auth: 'vx_auth_',
  transaction: 'txn_',
  log: 'log_',
} as const;

// 1. Identity
export const IdentityType = z.enum(['human', 'organization']);
export const IdentitySchema = z.object({
  id: z.string().startsWith(IdPrefixes.identity),
  type: IdentityType,
  name: z.string().min(1),
  email: z.string().email(),
  verified_kyc: z.boolean(),
  created_at: z.string().datetime(),
});
export type Identity = z.infer<typeof IdentitySchema>;

export const CreateIdentityInput = z.object({
  type: IdentityType,
  name: z.string().min(1),
  email: z.string().email(),
});

// 2. Agent
export const AgentStatus = z.enum(['active', 'suspended', 'revoked']);
export const AgentSchema = z.object({
  id: z.string().startsWith(IdPrefixes.agent),
  name: z.string().min(1),
  parent_identity_id: z.string().startsWith(IdPrefixes.identity),
  default_scope: z.array(z.string()),
  max_budget: z.number().nonnegative(),
  expiration: z.string().datetime().nullable(),
  status: AgentStatus,
  created_at: z.string().datetime(),
});
export type Agent = z.infer<typeof AgentSchema>;

export const CreateAgentInput = z.object({
  name: z.string().min(1),
  parent_identity_id: z.string().startsWith(IdPrefixes.identity),
  default_scope: z.array(z.string()).default([]),
  max_budget: z.number().nonnegative().default(1000),
  expiration: z.string().datetime().nullable().default(null),
});

// 3. Delegation
export const DelegationSchema = z.object({
  id: z.string().startsWith(IdPrefixes.delegation),
  agent_id: z.string().startsWith(IdPrefixes.agent),
  identity_id: z.string().startsWith(IdPrefixes.identity),
  granted_scope: z.array(z.string()),
  created_at: z.string().datetime(),
});
export type Delegation = z.infer<typeof DelegationSchema>;

export const CreateDelegationInput = z.object({
  agent_id: z.string().startsWith(IdPrefixes.agent),
  identity_id: z.string().startsWith(IdPrefixes.identity),
  granted_scope: z.array(z.string()),
});

// 4. Authorization Token
export const AuthTokenStatus = z.enum(['active', 'exhausted', 'revoked', 'expired']);
export const AuthTokenSchema = z.object({
  token_hash: z.string(),
  agent_id: z.string().startsWith(IdPrefixes.agent),
  scope: z.array(z.string()),
  budget: z.number().nonnegative(),
  remaining_budget: z.number().nonnegative(),
  allowed_vendors: z.array(z.string()).nullable(),
  expiration: z.string().datetime().nullable(),
  status: AuthTokenStatus,
  created_at: z.string().datetime(),
});
export type AuthToken = z.infer<typeof AuthTokenSchema>;

export const IssueAuthInput = z.object({
  agent_id: z.string().startsWith(IdPrefixes.agent),
  scope: z.array(z.string()),
  budget: z.number().nonnegative(),
  allowed_vendors: z.array(z.string()).nullable().default(null),
  ttl_seconds: z.number().positive().nullable().default(null),
});

// 5. Transaction
export const TransactionDecision = z.enum(['APPROVED', 'DENIED']);
export const TransactionSchema = z.object({
  id: z.string().startsWith(IdPrefixes.transaction),
  agent_id: z.string().startsWith(IdPrefixes.agent),
  vendor: z.string(),
  amount: z.number().nonnegative(),
  decision: TransactionDecision,
  reason: z.string(),
  timestamp: z.string().datetime(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const ExecuteTransactionInput = z.object({
  auth_token: z.string().startsWith(IdPrefixes.auth),
  vendor: z.string(),
  amount: z.number().nonnegative(),
  action: z.string().optional(),
});

// 6. Audit Log
export const AuditActionSchema = z.enum([
  'IDENTITY_CREATED',
  'AGENT_CREATED',
  'DELEGATION_CREATED',
  'AUTH_ISSUED',
  'TRANSACTION_EVALUATED',
  'KYC_SIGNAL_EVALUATED'
]);
export type AuditAction = z.infer<typeof AuditActionSchema>;

export const AuditLogSchema = z.object({
  id: z.string().startsWith(IdPrefixes.log),
  action: AuditActionSchema,

  actor_id: z.string().optional(),
  target_id: z.string().optional(),
  metadata: z.record(z.string(), z.any()),
  timestamp: z.string().datetime(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;
