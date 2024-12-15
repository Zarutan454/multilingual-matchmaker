import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const UserManagement = () => {
  const { t } = useLanguage();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error(`${t('errorFetchingUsers')}: ${error.message}`);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success(t('usersLoadedSuccessfully'));
    },
    onError: (error: Error) => {
      toast.error(`${t('errorFetchingUsers')}: ${error.message}`);
    }
  });

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    setUpdatingUserId(userId);
    const toastId = toast.loading(t('updatingUserStatus'));

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;

      toast.success(t('userStatusUpdated'), { id: toastId });
      try {
        await refetch();
      } catch (refetchError) {
        toast.error(`${t('errorRefetchingUsers')}: ${refetchError.message}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error(`${t('errorUpdatingUser')}: ${error.message}`, { id: toastId });
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-500">{t('errorLoadingUsers')}</p>
        <Button onClick={() => refetch()}>{t('tryAgain')}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">{t('userManagement')}</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('email')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('role')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name || t('notProvided')}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status || t('pending')}
                  </span>
                </TableCell>
                <TableCell>{user.role || t('user')}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        disabled={updatingUserId === user.id}
                      >
                        {updatingUserId === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(user.id, 'active')}
                        disabled={updatingUserId === user.id}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        {t('activate')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(user.id, 'suspended')}
                        disabled={updatingUserId === user.id}
                        className="text-red-600"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        {t('suspend')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
