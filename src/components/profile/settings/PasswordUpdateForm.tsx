import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const PasswordUpdateForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword } = useAuth();
  const { t } = useLanguage();

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updatePassword(newPassword);
      toast.success(t('passwordUpdated'));
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(t('errorUpdatingPassword'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordUpdate} className="space-y-4">
      <Input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder={t('newPassword')}
        className="max-w-sm"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {t('updatePassword')}
      </Button>
    </form>
  );
};