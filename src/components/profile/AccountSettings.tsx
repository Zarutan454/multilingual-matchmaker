import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
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
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const AccountSettings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, updatePassword, updateEmail, deleteAccount } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error(t('passwordTooShort'));
      return;
    }
    
    setIsLoading(true);
    try {
      await updatePassword(newPassword);
      toast.success(t('passwordUpdated'));
      setNewPassword('');
    } catch (error) {
      toast.error(t('errorUpdatingPassword'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error(t('emailRequired'));
      return;
    }
    
    setIsLoading(true);
    try {
      await updateEmail(newEmail);
      toast.success(t('emailUpdated'));
      setNewEmail('');
    } catch (error) {
      toast.error(t('errorUpdatingEmail'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    setIsLoading(true);
    try {
      // First, delete all related data
      if (user) {
        // Delete profile data first
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', user.id);
          
        if (profileError) {
          console.error('Error deleting profile:', profileError);
          throw new Error(profileError.message);
        }

        // Then delete the user account
        await deleteAccount();
        toast.success(t('accountDeleted'));
        navigate('/');
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
      toast.error(t('errorDeletingAccount'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <h3 className="text-lg font-medium">{t('changePassword')}</h3>
        <div className="space-y-2">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t('newPassword')}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('updating')}
              </>
            ) : (
              t('updatePassword')
            )}
          </Button>
        </div>
      </form>

      <form onSubmit={handleEmailUpdate} className="space-y-4">
        <h3 className="text-lg font-medium">{t('changeEmail')}</h3>
        <div className="space-y-2">
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={t('newEmail')}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('updating')}
              </>
            ) : (
              t('updateEmail')
            )}
          </Button>
        </div>
      </form>

      <div className="pt-4">
        <h3 className="text-lg font-medium text-destructive mb-4">{t('dangerZone')}</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              {t('deleteAccount')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('deleteAccountConfirm')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('deleteAccountWarning')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleAccountDeletion}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('deleting')}
                  </>
                ) : (
                  t('confirmDelete')
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};