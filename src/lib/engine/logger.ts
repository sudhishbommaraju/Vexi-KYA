import { generateId } from './crypto';
import { AuditLog, AuditLogSchema, AuditAction } from './schema';

class Logger {
  private static instance: Logger;
  private logs: AuditLog[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Append a new immutable entry to the KYA Audit Trail
   */
  public log(
    action: AuditAction,
    actorId?: string,
    targetId?: string,
    metadata?: Record<string, any>
  ): AuditLog {
    const entry: AuditLog = {
      id: generateId('log_'),
      action,
      actor_id: actorId,
      target_id: targetId,
      metadata: metadata || {},
      timestamp: new Date().toISOString(),
    };

    // Validate schema before appending
    const validated = AuditLogSchema.parse(entry);
    this.logs.push(validated);

    // In a real production system, this would stream to Datadog / Splunk
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[KYA AUDIT] ${action} | Actor: ${actorId || 'unknown'} | Target: ${targetId || 'unknown'}`);
    }

    return validated;
  }

  /**
   * Retrieve the full audit trail
   */
  public getLogs(): AuditLog[] {
    // Return a copy to prevent mutation
    return [...this.logs].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Used only in testing to clear state
   */
  public clear(): void {
    if (process.env.NODE_ENV === 'test') {
      this.logs = [];
    }
  }
}

export const logger = Logger.getInstance();
