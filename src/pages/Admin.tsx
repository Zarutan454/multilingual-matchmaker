import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserManagement } from '@/components/admin/UserManagement';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.user_metadata.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.user_metadata.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <UserManagement />
    </div>
  );
};

export default Admin;