export interface LogEntry {
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  
  private constructor() {}
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  async log(level: LogEntry['level'], message: string, metadata?: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      level: level,
      message: message,
      timestamp: timestamp,
      metadata: metadata,
    };

    try {
      console.log(`[${level.toUpperCase()}] ${message}`, metadata || '');
      this.logs.push(logEntry);
      
      if (this.logs.length > 1000) {
        this.logs = this.logs.slice(-1000);
      }
    } catch (error) {
      console.error('Error logging to system:', error);
    }
  }

  async info(message: string, metadata?: Record<string, any>) {
    return this.log('info', message, metadata);
  }

  async warn(message: string, metadata?: Record<string, any>) {
    return this.log('warning', message, metadata);
  }

  async error(message: string, metadata?: Record<string, any>) {
    return this.log('error', message, metadata);
  }

  async getLogs(limit = 100): Promise<LogEntry[]> {
    return this.logs.slice(-limit);
  }

  async getStats() {
    return {
      totalLogs: this.logs.length,
      errorCount: this.logs.filter(log => log.level === 'error').length,
      warningCount: this.logs.filter(log => log.level === 'warning').length,
      infoCount: this.logs.filter(log => log.level === 'info').length
    };
  }
}

export const logger = Logger.getInstance();
