import { NextResponse } from 'next/server';
import { store } from '@/lib/engine/store';
import { logger } from '@/lib/engine/logger';
import { z } from 'zod';

const EvaluateKYCInput = z.object({
  identity_id: z.string(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  dob: z.string(),
  ssn_last4: z.string().length(4),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = EvaluateKYCInput.parse(body);

    const identity = store.getIdentity(input.identity_id);
    if (!identity) {
      return NextResponse.json({ error: 'Identity not found' }, { status: 404 });
    }

    if (identity.type !== 'human') {
      return NextResponse.json({ error: 'KYC signals only apply to human identities' }, { status: 400 });
    }

    // In a production environment, this would call out to a provider like Alloy or Socure.
    // For Vexi, if the SSN is '0000', simulate a failure. Otherwise, pass.
    
    const decision = input.ssn_last4 === '0000' ? 'DENIED' : 'APPROVED';
    const reason = decision === 'APPROVED' 
      ? 'Identity verified perfectly against public records.'
      : 'Address verification failed. Manual review required.';

    if (decision === 'APPROVED') {
      identity.verified_kyc = true;
    }

    logger.log('KYC_SIGNAL_EVALUATED', identity.id, undefined, {
      decision,
      reason,
      provider: 'mock_socure_provider_v1'
    });

    return NextResponse.json({
      identity_id: identity.id,
      decision,
      reason,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid input' }, { status: 400 });
  }
}
