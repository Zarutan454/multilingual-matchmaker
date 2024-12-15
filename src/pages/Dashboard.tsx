import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "../components/Navbar";
import { RecentChatsCard } from "@/components/dashboard/RecentChatsCard";
import { RecentContactsCard } from "@/components/dashboard/RecentContactsCard";
import { FavoritesCard } from "@/components/dashboard/FavoritesCard";
import { ServiceManager } from "@/components/provider/ServiceManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Calendar, Settings } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const displayName = user?.user_metadata?.nickname || user?.user_metadata?.full_name || user?.email;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Profile Overview Card */}
        <Card className="mb-8 bg-black/50 backdrop-blur-sm border-neutral-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 border-2 border-[#FFD700]/30">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-black/50 text-white">
                  {displayName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{displayName}</h1>
                <div className="flex flex-wrap gap-4 text-gray-400">
                  {user.user_metadata?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.user_metadata.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/profile')}
                    className="border-[#FFD700]/30 hover:bg-[#FFD700]/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t("editProfile")}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/provider-dashboard')}
                    className="border-[#FFD700]/30 hover:bg-[#FFD700]/10"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {t("manageServices")}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/50 border-neutral-800">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="services">{t("services")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RecentChatsCard user={user} />
              <RecentContactsCard user={user} />
              <FavoritesCard user={user} />
            </div>
          </TabsContent>

          <TabsContent value="services">
            <ServiceManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}