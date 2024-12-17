import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const EmailUpdateForm = () => {
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateEmail } = useAuth();
  const { t } = useLanguage();

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateEmail(newEmail);
      toast.success(t('emailUpdated'));
      setNewEmail('');
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error(t('errorUpdatingEmail'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailUpdate} className="space-y-4">
      <Input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder={t('newEmail')}
        className="max-w-sm"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {t('updateEmail')}
      </Button>
    </form>
  );
};