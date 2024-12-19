import { supabase } from './supabase';
import { toast } from "sonner";

export const cleanDatabase = async () => {
  try {
    // Profile-Tabelle bereinigen - Avatar und Gallery zurücksetzen
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        avatar_url: null,
        gallery: [],
        banner_url: null
      })
      .not('id', 'eq', 'system');

    if (profileError) throw profileError;

    // Nachrichten-Tabelle bereinigen - Medieninhalte entfernen
    const { error: messagesError } = await supabase
      .from('messages')
      .update({
        content: content => content.replace(/!\[.*?\]\(.*?\)/g, '[Bild entfernt]')
      });

    if (messagesError) throw messagesError;

    // Storage-Bucket leeren
    const { data: storageFiles, error: storageListError } = await supabase
      .storage
      .from('uploads')
      .list();

    if (storageListError) throw storageListError;

    if (storageFiles && storageFiles.length > 0) {
      const filePaths = storageFiles.map(file => file.name);
      const { error: deleteError } = await supabase
        .storage
        .from('uploads')
        .remove(filePaths);

      if (deleteError) throw deleteError;
    }

    toast.success('Datenbank wurde erfolgreich bereinigt');
    console.log('Datenbank-Bereinigung abgeschlossen');
    
    return true;
  } catch (error) {
    console.error('Fehler bei der Datenbankbereinigung:', error);
    toast.error('Fehler bei der Datenbankbereinigung');
    return false;
  }
};