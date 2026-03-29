import { NextResponse } from 'next/server';
import { store } from '@/lib/engine/store';
import { logger } from '@/lib/engine/logger';
import { generateId, generateToken, hashToken, maskToken } from '@/lib/engine/crypto';
import { IssueAuthInput, AuthToken } from '@/lib/engine/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = IssueAuthInput.parse(body);

    // Validate agent exists
    const agent = store.getAgent(input.agent_id);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    // Check if agent is suspended
    if (agent.status !== 'active') {
       return NextResponse.json({ error: `Cannot issue token for ${agent.status} agent` }, { status: 400 });
    }

    // Generate token
    const tokenOptions = {
      token: generateToken(),
      expiration: input.ttl_seconds ? new Date(Date.now() + input.ttl_seconds * 1000).toISOString() : agent.expiration,
    };
    
    const tokenHash = hashToken(tokenOptions.token);

    const authToken: AuthToken = {
      token_hash: tokenHash,
      agent_id: agent.id,
      scope: input.scope,
      budget: input.budget,
      remaining_budget: input.budget,
      allowed_vendors: input.allowed_vendors,
      expiration: tokenOptions.expiration,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    store.saveAuthToken(authToken);
    logger.log('AUTH_ISSUED', agent.id, undefined, { 
      scope: authToken.scope, 
      budget: authToken.budget,
      token_masked: maskToken(tokenOptions.token)
    });

    // Return the plain text token ONLY ONCE
    return NextResponse.json({
      auth_token: tokenOptions.token,
      agent_id: agent.id,
      expiration: authToken.expiration,
      status: authToken.status,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid input' }, { status: 400 });
  }
}
