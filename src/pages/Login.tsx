import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast({
        title: "Anmeldung erfolgreich",
        description: "Sie wurden erfolgreich eingeloggt.",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler bei der Anmeldung",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Anmeldung</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Noch kein Konto?{' '}
          <a href="/register" className="text-primary hover:underline">
            Jetzt registrieren
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;