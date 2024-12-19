import { supabase } from '@/lib/supabase';
import type { LogLevel, LogEntry } from '@/types/logging';

export const log = async (level: LogLevel, message: string, metadata?: Record<string, any>) => {
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
};

export const getLogs = async (limit = 100): Promise<LogEntry[]> => {
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
      metadata: log.metadata
    }));
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

export const getLogsByLevel = async (level: LogLevel): Promise<LogEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('system_logs')
      .select('*')
      .eq('level', level)
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return data.map(log => ({
      id: log.id,
      timestamp: log.timestamp,
      level: log.level as LogLevel,
      message: log.message,
      userId: log.userid,
      metadata: log.metadata
    }));
  } catch (error) {
    console.error('Error fetching logs by level:', error);
    return [];
  }
};