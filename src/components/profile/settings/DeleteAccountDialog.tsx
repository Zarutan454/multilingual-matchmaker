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

      // Delete all related data in order
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .or(`sender.eq.${user.id},recipient.eq.${user.id}`);

      if (messagesError) {
        console.error('Error deleting messages:', messagesError);
      }

      const { error: favoritesError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id);

      if (favoritesError) {
        console.error('Error deleting favorites:', favoritesError);
      }

      const { error: likesError } = await supabase
        .from('profile_likes')
        .delete()
        .eq('user_id', user.id);

      if (likesError) {
        console.error('Error deleting likes:', likesError);
      }

      const { error: servicesError } = await supabase
        .from('services')
        .delete()
        .eq('provider_id', user.id);

      if (servicesError) {
        console.error('Error deleting services:', servicesError);
      }

      // Delete profile last since it has foreign key relationships
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        console.error('Error deleting profile:', profileError);
        throw new Error(profileError.message);
      }

      // Finally delete the user account
      await deleteAccount();
      toast.success(t('accountDeleted'));
      navigate('/');
    } catch (error) {
      console.error('Error during account deletion:', error);
      toast.error(t('errorDeletingAccount'));
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