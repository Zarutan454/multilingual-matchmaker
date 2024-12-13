import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import { Separator } from "@/components/ui/separator";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const validateForm = () => {
    if (loginMethod === 'email' && (!email || !password)) {
      toast.error(t("fillAllFields"));
      return false;
    }
    if (loginMethod === 'phone' && !phoneNumber) {
      toast.error(t("enterPhoneNumber"));
      return false;
    }
    if (loginMethod === 'email' && password.length < 6) {
      toast.error(t("passwordTooShort"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      if (loginMethod === 'email') {
        await signIn(email, password);
        toast.success(t("loginSuccess"));
        navigate('/profile');
      } else {
        // Handle phone login through Supabase
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneNumber
        });
        if (error) throw error;
        toast.success(t("otpSent"));
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t("loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4 animate-fade-in">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {t("login")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("pleaseLoginFirst")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                type="button"
                variant={loginMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setLoginMethod('email')}
              >
                {t("emailLogin")}
              </Button>
              <Button
                type="button"
                variant={loginMethod === 'phone' ? 'default' : 'outline'}
                onClick={() => setLoginMethod('phone')}
              >
                {t("phoneLogin")}
              </Button>
            </div>

            {loginMethod === 'email' ? (
              <>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    disabled={isLoading}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("password")}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full"
                    disabled={isLoading}
                    placeholder="••••••••"
                  />
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("phoneNumber")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full"
                  disabled={isLoading}
                  placeholder="+1234567890"
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loggingIn")}
                </>
              ) : (
                t("loginButton")
              )}
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="space-y-4">
            <p className="text-sm text-gray-500 text-center">{t("orContinueWith")}</p>
            
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              view="sign_in"
              showLinks={false}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {t("noAccount")}{' '}
            <a href="/register" className="text-primary hover:underline">
              {t("registerNow")}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;