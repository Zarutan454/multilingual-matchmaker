export interface LoggingStats {
  totalLogs: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
}

export const logger = {
  error: async (message: string, metadata?: any) => {
    console.error(message, metadata);
  },
  info: async (message: string, metadata?: any) => {
    console.info(message, metadata);
  },
  getStats: async (): Promise<LoggingStats> => {
    return {
      totalLogs: 0,
      errorCount: 0,
      warningCount: 0,
      infoCount: 0
    };
  }
};