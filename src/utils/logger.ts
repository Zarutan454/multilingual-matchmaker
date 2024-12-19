import { supabase } from '@/lib/supabase';
import type { LogLevel, LogEntry, LoggingStats } from '@/types/logging';

class Logger {
  async log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    try {
      const { error } = await supabase
        .from('system_logs')
        .insert([
          {
            level,
            message,
            metadata,
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) throw error;
    } catch (error) {
      console.error('Error logging to system:', error);
    }
  }

  async getLogs(limit = 100): Promise<LogEntry[]> {
    try {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data.map(log => ({
        id: log.id,
        timestamp: log.timestamp,
        level: log.level as LogLevel,
        message: log.message,
        userId: log.userid,
        metadata: log.metadata as Record<string, any>
      }));
    } catch (error) {
      console.error('Error fetching logs:', error);
      return [];
    }
  }

  async getStats(): Promise<LoggingStats> {
    try {
      const { data, error } = await supabase
        .from('system_logs')
        .select('level');

      if (error) throw error;

      const stats = {
        totalLogs: data.length,
        errorCount: data.filter(log => log.level === 'error').length,
        warningCount: data.filter(log => log.level === 'warning').length,
        infoCount: data.filter(log => log.level === 'info').length
      };

      return stats;
    } catch (error) {
      console.error('Error fetching log stats:', error);
      return {
        totalLogs: 0,
        errorCount: 0,
        warningCount: 0,
        infoCount: 0
      };
    }
  }
}

export const logger = new Logger();