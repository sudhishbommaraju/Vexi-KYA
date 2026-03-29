import { NextResponse } from 'next/server';
import { store } from '@/lib/engine/store';
import { logger } from '@/lib/engine/logger';
import { generateId } from '@/lib/engine/crypto';
import { CreateAgentInput, Agent } from '@/lib/engine/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateAgentInput.parse(body);

    // Validate parent identity exists
    const parentIdentity = store.getIdentity(input.parent_identity_id);
    if (!parentIdentity) {
      return NextResponse.json({ error: 'Parent identity not found' }, { status: 404 });
    }

    const agent: Agent = {
      id: generateId('ag_'),
      name: input.name,
      parent_identity_id: input.parent_identity_id,
      default_scope: input.default_scope,
      max_budget: input.max_budget,
      expiration: input.expiration,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    store.saveAgent(agent);
    logger.log('AGENT_CREATED', parentIdentity.id, agent.id, { name: agent.name });

    return NextResponse.json(agent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid input' }, { status: 400 });
  }
}

export async function GET() {
  const agents = store.listAgents();
  return NextResponse.json(agents);
}
