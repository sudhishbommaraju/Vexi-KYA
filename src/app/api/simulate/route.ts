import { NextResponse } from 'next/server';
import { evaluateTransaction } from '@/lib/engine/evaluator';
import { ExecuteTransactionInput } from '@/lib/engine/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = ExecuteTransactionInput.parse(body);

    const result = evaluateTransaction(
      input.auth_token,
      input.vendor,
      input.amount,
      input.action,
      true // Simulate = true (no state mutation)
    );

    const status = result.decision === 'APPROVED' ? 200 : 403;
    
    return NextResponse.json({
      decision: result.decision,
      reason: result.reason,
      transaction_id: result.transaction?.id,
      timestamp: result.transaction?.timestamp,
    }, { status });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid Request' }, { status: 400 });
  }
}
