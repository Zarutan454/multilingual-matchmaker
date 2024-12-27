import { getSystemPrompt } from '../config/prompt';

export const initializeAI = () => {
  const systemPrompt = getSystemPrompt();
  console.log('AI System initialized with prompt:', systemPrompt);
  // Hier können weitere AI-Initialisierungen erfolgen
};