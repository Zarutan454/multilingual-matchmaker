import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
}

export const ServiceManager = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 30
  });

  // Fetch existing services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', user.id);
      
      if (error) {
        console.error('Error fetching services:', error);
        toast.error(t("errorLoadingServices"));
        return [];
      }
      return data || [];
    },
    enabled: !!user
  });

  const handleAddService = async () => {
    if (!user) {
      toast.error(t("pleaseLogin"));
      return;
    }

    if (!newService.name || !newService.description) {
      toast.error(t("fillAllFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([
          {
            provider_id: user.id,
            name: newService.name,
            description: newService.description,
            duration: newService.duration
          }
        ]);

      if (error) throw error;

      toast.success(t("serviceAdded"));
      setNewService({ name: "", description: "", duration: 30 });
      queryClient.invalidateQueries({ queryKey: ['services', user.id] });
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error(t("errorAddingService"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('provider_id', user.id);

      if (error) throw error;

      toast.success(t("serviceDeleted"));
      queryClient.invalidateQueries({ queryKey: ['services', user.id] });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(t("errorDeletingService"));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">{t("addNewService")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder={t("serviceName")}
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Textarea
              placeholder={t("serviceDescription")}
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder={t("duration")}
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Button 
            onClick={handleAddService} 
            className="w-full"
            disabled={isSubmitting}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isSubmitting ? t("adding") : t("addService")}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-400 py-4">{t("noServices")}</p>
        ) : (
          services.map((service) => (
            <Card key={service.id} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    <p className="text-gray-400 mt-1">{service.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {t("duration")}: {service.duration} {t("minutes")}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};