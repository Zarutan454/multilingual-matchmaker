import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const SocialLogin = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isRegistration = location.pathname === '/register';
  
  return (
    <div className="space-y-4">
      <Auth
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#9b87f5',
                brandAccent: '#7E69AB',
                inputBackground: '#222222',
                inputText: 'white',
                inputBorder: '#404040',
                inputLabelText: '#d4d4d4',
              },
            },
          },
          className: {
            container: 'text-neutral-300',
            button: 'bg-[#222222] border-neutral-700 text-white hover:bg-neutral-800',
            divider: 'bg-neutral-700',
          }
        }}
        providers={["google"]}
        redirectTo={window.location.origin}
        onlyThirdPartyProviders={true}
        view={isRegistration ? "sign_up" : "sign_in"}
        showLinks={false}
      />
    </div>
  );
};