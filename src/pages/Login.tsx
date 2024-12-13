import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 px-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-neutral-200/50">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("login")}
            </CardTitle>
            <CardDescription className="text-center text-neutral-600">
              {t("pleaseLoginFirst")}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  type="button"
                  variant={loginMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setLoginMethod('email')}
                  className="w-1/2 transition-all duration-300"
                >
                  {t("emailLogin")}
                </Button>
                <Button
                  type="button"
                  variant={loginMethod === 'phone' ? 'default' : 'outline'}
                  onClick={() => setLoginMethod('phone')}
                  className="w-1/2 transition-all duration-300"
                >
                  {t("phoneLogin")}
                </Button>
              </div>

              {loginMethod === 'email' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                      {t("email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/50 border-neutral-200 focus:border-primary/50 focus:ring-primary/50"
                      disabled={isLoading}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
                      {t("password")}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/50 border-neutral-200 focus:border-primary/50 focus:ring-primary/50"
                      disabled={isLoading}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                    {t("phoneNumber")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full bg-white/50 border-neutral-200 focus:border-primary/50 focus:ring-primary/50"
                    disabled={isLoading}
                    placeholder="+1234567890"
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" 
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

            <div className="mt-6 space-y-4">
              <div className="relative">
                <Separator className="my-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-sm text-neutral-500">
                    {t("orContinueWith")}
                  </span>
                </div>
              </div>
              
              <Auth
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#1a365d',
                        brandAccent: '#c69963',
                      },
                    },
                  },
                }}
                providers={["google"]}
                view="sign_in"
                showLinks={false}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6">
            <p className="text-sm text-neutral-600">
              {t("noAccount")}{' '}
              <a href="/register" className="text-primary hover:text-secondary transition-colors duration-200 font-medium">
                {t("registerNow")}
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;