import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const DeleteAccountDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, deleteAccount } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAccountDeletion = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('No user found');
      }

      console.log('Starting account deletion process for user:', user.id);

      // 1. Zuerst alle Nachrichten löschen
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`);

      if (messagesError) {
        console.error('Error deleting messages:', messagesError);
        throw new Error(`Failed to delete messages: ${messagesError.message}`);
      }

      // 2. Alle Favoriten löschen
      const { error: favoritesError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id);

      if (favoritesError) {
        console.error('Error deleting favorites:', favoritesError);
        throw new Error(`Failed to delete favorites: ${favoritesError.message}`);
      }

      // 3. Alle Likes löschen
      const { error: likesError } = await supabase
        .from('profile_likes')
        .delete()
        .or(`user_id.eq.${user.id},profile_id.eq.${user.id}`);

      if (likesError) {
        console.error('Error deleting likes:', likesError);
        throw new Error(`Failed to delete likes: ${likesError.message}`);
      }

      // 4. Alle Services löschen
      const { error: servicesError } = await supabase
        .from('services')
        .delete()
        .eq('provider_id', user.id);

      if (servicesError) {
        console.error('Error deleting services:', servicesError);
        throw new Error(`Failed to delete services: ${servicesError.message}`);
      }

      // 5. Alle Dateien im Storage löschen
      const { data: files, error: filesError } = await supabase
        .storage
        .from('uploads')
        .list(`${user.id}`);

      if (filesError) {
        console.error('Error listing files:', filesError);
        throw new Error(`Failed to list files: ${filesError.message}`);
      }

      if (files && files.length > 0) {
        const { error: deleteFilesError } = await supabase
          .storage
          .from('uploads')
          .remove(files.map(file => `${user.id}/${file.name}`));

        if (deleteFilesError) {
          console.error('Error deleting files:', deleteFilesError);
          throw new Error(`Failed to delete files: ${deleteFilesError.message}`);
        }
      }

      // 6. Das Profil löschen
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        console.error('Error deleting profile:', profileError);
        throw new Error(`Failed to delete profile: ${profileError.message}`);
      }

      // 7. Schließlich den Auth-Account löschen
      await deleteAccount();
      
      toast.success(t('accountDeleted'));
      navigate('/');
    } catch (error) {
      console.error('Error during account deletion:', error);
      toast.error(t('errorDeletingAccount'));
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {t('deleteAccount')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('confirmDeletion')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('deletionWarning')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAccountDeletion}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t('confirmDelete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};