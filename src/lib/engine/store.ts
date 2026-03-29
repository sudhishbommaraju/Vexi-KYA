import { 
  Identity, Agent, Delegation, AuthToken, Transaction 
} from './schema';

class EngineStore {
  private static instance: EngineStore;

  // In-memory data structures mapping ID -> Entity
  private identities: Map<string, Identity> = new Map();
  private agents: Map<string, Agent> = new Map();
  private delegations: Map<string, Delegation> = new Map();
  
  // Maps token hash -> AuthToken
  private authTokens: Map<string, AuthToken> = new Map();
  
  // Maps transaction ID -> Transaction
  private transactions: Map<string, Transaction> = new Map();

  private constructor() {}

  public static getInstance(): EngineStore {
    if (!EngineStore.instance) {
      EngineStore.instance = new EngineStore();
    }
    return EngineStore.instance;
  }

  // --- IDENTITIES ---
  public getIdentity(id: string): Identity | undefined {
    return this.identities.get(id);
  }

  public saveIdentity(identity: Identity): void {
    this.identities.set(identity.id, identity);
  }

  public listIdentities(): Identity[] {
    return Array.from(this.identities.values());
  }

  // --- AGENTS ---
  public getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  public saveAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  public listAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  // --- DELEGATIONS ---
  public getDelegation(id: string): Delegation | undefined {
    return this.delegations.get(id);
  }

  public saveDelegation(delegation: Delegation): void {
    this.delegations.set(delegation.id, delegation);
  }

  public listDelegationsForAgent(agentId: string): Delegation[] {
    return Array.from(this.delegations.values()).filter(d => d.agent_id === agentId);
  }

  // --- AUTH TOKENS ---
  public getAuthToken(hash: string): AuthToken | undefined {
    return this.authTokens.get(hash);
  }

  public saveAuthToken(authToken: AuthToken): void {
    this.authTokens.set(authToken.token_hash, authToken);
  }

  // --- TRANSACTIONS ---
  public saveTransaction(tx: Transaction): void {
    this.transactions.set(tx.id, tx);
  }

  public listTransactions(): Transaction[] {
    return Array.from(this.transactions.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // --- DANGEROUS / TESTING ---
  public clear(): void {
    if (process.env.NODE_ENV === 'test') {
      this.identities.clear();
      this.agents.clear();
      this.delegations.clear();
      this.authTokens.clear();
      this.transactions.clear();
    }
  }
}

export const store = EngineStore.getInstance();
