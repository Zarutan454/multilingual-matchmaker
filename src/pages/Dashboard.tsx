import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Profil Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                {t("profile")}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("manageProfile")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/profile")}
              >
                {t("editProfile")}
              </Button>
            </CardContent>
          </Card>

          {/* Kalender Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                {t("calendar")}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("manageAppointments")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/calendar")}
              >
                {t("viewCalendar")}
              </Button>
            </CardContent>
          </Card>

          {/* Nachrichten Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                {t("messages")}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("manageMessages")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/messages")}
              >
                {t("viewMessages")}
              </Button>
            </CardContent>
          </Card>

          {/* Einstellungen Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-secondary" />
                {t("settings")}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("manageSettings")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/settings")}
              >
                {t("editSettings")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}