import { NextResponse } from 'next/server';
import { store } from '@/lib/engine/store';
import { logger } from '@/lib/engine/logger';
import { generateId } from '@/lib/engine/crypto';
import { CreateDelegationInput, Delegation } from '@/lib/engine/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateDelegationInput.parse(body);

    // Validate identity and agent exist
    const identity = store.getIdentity(input.identity_id);
    if (!identity) {
      return NextResponse.json({ error: 'Identity not found' }, { status: 404 });
    }

    const agent = store.getAgent(input.agent_id);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const delegation: Delegation = {
      id: generateId('del_'),
      agent_id: agent.id,
      identity_id: identity.id,
      granted_scope: input.granted_scope,
      created_at: new Date().toISOString(),
    };

    store.saveDelegation(delegation);
    logger.log('DELEGATION_CREATED', identity.id, agent.id, { 
      delegation_id: delegation.id,
      scope: delegation.granted_scope 
    });

    return NextResponse.json(delegation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid input' }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agent_id');
  
  if (!agentId) {
    return NextResponse.json({ error: 'agent_id query parameter required' }, { status: 400 });
  }

  const delegations = store.listDelegationsForAgent(agentId);
  return NextResponse.json(delegations);
}
