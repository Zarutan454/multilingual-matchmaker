import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { useRecentContacts } from "@/hooks/useRecentContacts";

interface RecentContactsCardProps {
  user: User | null;
}

export const RecentContactsCard = ({ user }: RecentContactsCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: recentContacts = [] } = useRecentContacts(user);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-secondary" />
          {t("contacts")}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t("recentContacts")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentContacts.map((contact: any) => (
            <div 
              key={contact.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
              onClick={() => navigate(`/provider/${contact.id}`)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                {contact.avatar_url ? (
                  <img src={contact.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Users className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">{contact.full_name}</p>
                <p className="text-sm text-gray-400">{contact.location}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};