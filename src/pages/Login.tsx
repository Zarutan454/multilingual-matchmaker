import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '../contexts/LanguageContext';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialLogin } from '../components/auth/SocialLogin';

const Login = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000e6] px-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#222222] border-neutral-700 shadow-xl">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl font-bold text-center text-white">
              {t("login")}
            </CardTitle>
            <CardDescription className="text-center text-neutral-400">
              {t("pleaseLoginFirst")}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <LoginForm />

            <div className="relative">
              <Separator className="my-4 bg-neutral-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-[#222222] px-2 text-sm text-neutral-400">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>
            
            <SocialLogin />
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6">
            <p className="text-sm text-neutral-400">
              {t("noAccount")}{' '}
              <a 
                href="/register" 
                className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors duration-200 font-medium"
              >
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