import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;
      setUsers(profiles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error("Fehler beim Laden der Benutzer");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      
      toast.success("Benutzer erfolgreich gelöscht");
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("Fehler beim Löschen des Benutzers");
    }
  };

  if (loading) {
    return <div>Laden...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Benutzerverwaltung</h2>
      {users.map((user: any) => (
        <Card key={user.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.full_name || 'Kein Name'}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleDeleteUser(user.id)}
            >
              Löschen
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};