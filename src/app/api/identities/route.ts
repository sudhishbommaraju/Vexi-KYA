import { NextResponse } from 'next/server';
import { store } from '@/lib/engine/store';
import { logger } from '@/lib/engine/logger';
import { generateId } from '@/lib/engine/crypto';
import { CreateIdentityInput, Identity } from '@/lib/engine/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateIdentityInput.parse(body);

    const identity: Identity = {
      id: generateId('id_'),
      type: input.type,
      name: input.name,
      email: input.email,
      verified_kyc: false, // Default to false until verified via KYC endpoint
      created_at: new Date().toISOString(),
    };

    store.saveIdentity(identity);
    logger.log('IDENTITY_CREATED', undefined, identity.id, { type: identity.type });

    return NextResponse.json(identity, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid input' }, { status: 400 });
  }
}

export async function GET() {
  const identities = store.listIdentities();
  return NextResponse.json(identities);
}
