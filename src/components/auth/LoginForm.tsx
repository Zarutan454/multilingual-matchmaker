import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { useLanguage } from '../../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        console.error('Login error:', signInError);
        if (signInError.message.includes('Invalid login credentials')) {
          toast.error(t("invalidCredentials"));
        } else {
          toast.error(t("loginError"));
        }
        return;
      }

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error(t("sessionError"));
        return;
      }

      // Get profile data from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        toast.error(t("profileError"));
        return;
      }

      // Redirect based on user type from profile
      if (profile?.user_type === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/dashboard');
      }
      
      toast.success(t("loginSuccess"));
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