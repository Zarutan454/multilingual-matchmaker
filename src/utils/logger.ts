export const logger = {
  error: async (message: string, metadata?: any) => {
    console.error(message, metadata);
  },
  info: async (message: string, metadata?: any) => {
    console.info(message, metadata);
  },
  getStats: async () => {
    return {
      errors: 0,
      warnings: 0,
      info: 0
    };
  }
};