import { randomBytes, createHash } from 'crypto';

/**
 * Generate a cryptographically secure token with a specific prefix.
 * Used for issuing Authorization Tokens (e.g. vx_auth_...)
 */
export function generateToken(prefix: string = 'vx_auth_'): string {
  const bytes = randomBytes(24).toString('hex');
  return `${prefix}${bytes}`;
}

/**
 * Hash a previously generated token using SHA-256 for secure storage.
 * We never store the plain text token.
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Mask a token for safe inclusion in audit logs or UI display.
 * Example: vx_auth_12abcde...89def -> vx_auth_...89def
 */
export function maskToken(token: string): string {
  if (token.length < 15) return '***';
  const prefix = token.substring(0, 8); // e.g. vx_auth_
  const suffix = token.substring(token.length - 6);
  return `${prefix}...${suffix}`;
}

/**
 * Generate sequence-friendly unique IDs for engine entities
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(4).toString('hex');
  return `${prefix}${timestamp}_${random}`;
}
