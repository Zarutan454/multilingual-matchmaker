import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        toast.error('Bitte melden Sie sich an');
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        toast.error('Keine Berechtigung');
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      <p className="text-gray-300">
        Willkommen im Admin-Bereich. Diese Seite wird noch entwickelt.
      </p>
    </div>
  );
};

export default Admin;