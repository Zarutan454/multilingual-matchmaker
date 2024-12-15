import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Letzte Chats abrufen - Vereinfachte Version ohne Join
  const { data: recentChats = [] } = useQuery({
    queryKey: ['recentChats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender.eq.${user?.id},recipient.eq.${user?.id}`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Letzte Kontakte abrufen
  const { data: recentContacts = [] } = useQuery({
    queryKey: ['recentContacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Favoriten abrufen - Vereinfachte Version ohne Join
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user?.id)
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("welcome")}, {user?.user_metadata?.full_name || user?.email}
          </h1>
          <p className="text-gray-400">
            {t("lastLogin")}: {new Date(user?.last_sign_in_at || "").toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Letzte Chats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                {t("messages")}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("recentMessages")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentChats.map((chat: any) => (
                  <div 
                    key={chat.id} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                    onClick={() => navigate(`/messages/${chat.sender === user?.id ? chat.recipient : chat.sender}`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {chat.sender === user?.id ? chat.recipient : chat.sender}
                      </p>
                      <p className="text-sm text-gray-400 truncate">{chat.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Letzte Kontakte */}
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

          {/* Favoriten */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-secondary" />
                {t("favorites")}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("yourFavorites")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favorites.map((favorite: any) => (
                  <div 
                    key={favorite.id} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                    onClick={() => navigate(`/provider/${favorite.profile_id}`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <Star className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Favorit #{favorite.id}</p>
                      <p className="text-sm text-gray-400">{favorite.created_at}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}