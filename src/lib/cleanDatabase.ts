import { supabase } from "./supabase";

export const cleanDatabase = async () => {
  try {
    // Clean profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ avatar_url: null, gallery: null })
      .neq('id', 'system');

    if (profileError) throw profileError;

    // Clean messages
    const { error: messageError } = await supabase
      .from('messages')
      .update({ content: null })
      .neq('sender', 'system');

    if (messageError) throw messageError;

    return { success: true };
  } catch (error) {
    console.error('Error cleaning database:', error);
    return { success: false, error };
  }
};