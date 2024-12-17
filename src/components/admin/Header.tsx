import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-[#222222] border-b border-[#333] p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-400" />
          </Button>
          <span className="text-gray-400">
            {user?.email}
          </span>
        </div>
      </div>
    </header>
  );
};