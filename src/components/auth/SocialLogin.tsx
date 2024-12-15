import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Github } from "lucide-react";

export const SocialLogin = () => {
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error with Github login:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button 
        variant="outline" 
        onClick={handleGithubLogin}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        Mit Github anmelden
      </Button>
    </div>
  );
};