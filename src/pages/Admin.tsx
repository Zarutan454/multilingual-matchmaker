import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
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
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <UserManagement />
      </div>
    </AdminLayout>
  );
};

export default Admin;