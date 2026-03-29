import { NextResponse } from 'next/server';
import { logger } from '@/lib/engine/logger';

export async function GET() {
  const logs = logger.getLogs();
  return NextResponse.json(logs);
}
