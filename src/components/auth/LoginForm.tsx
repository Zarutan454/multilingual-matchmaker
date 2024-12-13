import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { useLanguage } from '../../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t("fillAllFields"));
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error(t("invalidCredentials"));
        } else {
          toast.error(t("loginError"));
        }
        console.error('Login error:', error);
        return;
      }
      toast.success(t("loginSuccess"));
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t("loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-neutral-300 text-sm">
          {t("email")}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500 focus:border-secondary"
          disabled={isLoading}
          placeholder="email@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-neutral-300 text-sm">
          {t("password")}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#222222] border-neutral-700 text-white placeholder-neutral-500 focus:border-secondary"
          disabled={isLoading}
          placeholder="••••••••"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-secondary hover:bg-secondary/80 text-white transition-colors" 
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>{t("loggingIn")}</span>
          </div>
        ) : (
          t("loginButton")
        )}
      </Button>
    </form>
  );
};