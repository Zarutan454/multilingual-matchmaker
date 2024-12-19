import { supabase } from '@/lib/supabase';
import { LogLevel, LogEntry } from '@/types/logging';

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  async log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;

    const logEntry: Omit<LogEntry, 'id'> = {
      timestamp: new Date().toISOString(),
      level,
      message,
      userId,
      metadata
    };

    try {
      const { error } = await supabase
        .from('system_logs')
        .insert([logEntry]);

      if (error) throw error;

      // Zusätzlich in die Console loggen für Entwicklungszwecke
      console.log(`[${level.toUpperCase()}] ${message}`, metadata);
    } catch (error) {
      console.error('Logging failed:', error);
    }
  }

  info(message: string, metadata?: Record<string, any>) {
    return this.log('info', message, metadata);
  }

  warning(message: string, metadata?: Record<string, any>) {
    return this.log('warning', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    return this.log('error', message, metadata);
  }

  async getStats(): Promise<LoggingStats> {
    try {
      const { data: logs, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      const errorLogs = logs.filter(log => log.level === 'error');
      const warningLogs = logs.filter(log => log.level === 'warning');

      return {
        totalLogs: logs.length,
        errorCount: errorLogs.length,
        warningCount: warningLogs.length,
        recentErrors: errorLogs.slice(0, 5)
      };
    } catch (error) {
      console.error('Error fetching logging stats:', error);
      return {
        totalLogs: 0,
        errorCount: 0,
        warningCount: 0,
        recentErrors: []
      };
    }
  }
}

export const logger = Logger.getInstance();