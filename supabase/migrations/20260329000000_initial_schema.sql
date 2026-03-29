-- Vexi KYA Initial Schema Migration

-- 1. Identities
CREATE TABLE IF NOT EXISTS identities (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('human', 'organization')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    verified_kyc BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Agents
CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    parent_identity_id TEXT NOT NULL REFERENCES identities(id) ON DELETE CASCADE,
    default_scope TEXT[] DEFAULT '{}',
    max_budget NUMERIC DEFAULT 1000,
    expiration TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('active', 'suspended', 'revoked')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Delegations
CREATE TABLE IF NOT EXISTS delegations (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    identity_id TEXT NOT NULL REFERENCES identities(id) ON DELETE CASCADE,
    granted_scope TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Auth Tokens
CREATE TABLE IF NOT EXISTS auth_tokens (
    token_hash TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    scope TEXT[] DEFAULT '{}',
    budget NUMERIC NOT NULL,
    remaining_budget NUMERIC NOT NULL,
    allowed_vendors TEXT[],
    expiration TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('active', 'exhausted', 'revoked', 'expired')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    vendor TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    decision TEXT NOT NULL CHECK (decision IN ('APPROVED', 'DENIED')),
    reason TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    actor_id TEXT,
    target_id TEXT,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE delegations ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Allow full access to authenticated users for development)
-- In production, these should be restricted to specific users or roles.

CREATE POLICY "Allow public read-only access to identities" ON identities FOR SELECT USING (true);
CREATE POLICY "Allow service role full access to identities" ON identities FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public read-only access to agents" ON agents FOR SELECT USING (true);
CREATE POLICY "Allow service role full access to agents" ON agents FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public read-only access to delegations" ON delegations FOR SELECT USING (true);
CREATE POLICY "Allow service role full access to delegations" ON delegations FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to auth_tokens" ON auth_tokens FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public read-only access to transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow service role full access to transactions" ON transactions FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to audit_logs" ON audit_logs FOR ALL USING (auth.role() = 'service_role');
