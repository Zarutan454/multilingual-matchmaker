export type LogLevel = 'info' | 'warning' | 'error';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface LoggingStats {
  totalLogs: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
}