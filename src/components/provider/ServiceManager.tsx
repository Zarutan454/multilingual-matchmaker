import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceForm } from "./ServiceForm";
import { ServiceList } from "./ServiceList";
import { castToService } from "@/types/profile";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PricingManager } from "./PricingManager";
import { ServiceCategorySelector } from "./ServiceCategorySelector";

export const ServiceManager = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
      
      return (data || []).map(castToService);
    },
    enabled: !!user
  });

  const handleAddService = async (newService: {
    name: string;
    description: string;
    duration: number;
    categories: string[];
    price: number;
  }) => {
    if (!user) {
      console.error('No user found');
      toast.error(t("pleaseLogin"));
      return;
    }

    if (!newService.name || !newService.description) {
      console.error('Missing required fields');
      toast.error(t("fillAllFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Adding service:', newService);
      
      const { data: serviceData, error: serviceError } = await supabase
        .from('services')
        .insert([
          {
            provider_id: user.id,
            name: newService.name,
            description: newService.description,
            duration: newService.duration,
            categories: newService.categories,
            price: newService.price
          }
        ])
        .select()
        .single();

      if (serviceError) {
        console.error('Error adding service:', serviceError);
        throw serviceError;
      }

      console.log('Service added successfully:', serviceData);

      // Update the provider's profile with the service categories
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          service_categories: newService.categories
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
      }

      toast.success(t("serviceAdded"));
      queryClient.invalidateQueries({ queryKey: ['services', user.id] });
    } catch (error) {
      console.error('Error in handleAddService:', error);
      toast.error(t("errorAddingService"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      console.log('Deleting service:', id);
      
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('provider_id', user.id);

      if (error) {
        console.error('Error deleting service:', error);
        throw error;
      }

      toast.success(t("serviceDeleted"));
      queryClient.invalidateQueries({ queryKey: ['services', user.id] });
    } catch (error) {
      console.error('Error in handleDeleteService:', error);
      toast.error(t("errorDeletingService"));
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="services" className="space-y-6">
      <TabsList className="grid grid-cols-3 gap-4">
        <TabsTrigger value="services">
          {t("services")}
        </TabsTrigger>
        <TabsTrigger value="categories">
          {t("categories")}
        </TabsTrigger>
        <TabsTrigger value="pricing">
          {t("pricing")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="services">
        <div className="space-y-6">
          <ServiceForm onSubmit={handleAddService} isSubmitting={isSubmitting} />
          <ServiceList services={services} onDelete={handleDeleteService} isEditable={true} />
        </div>
      </TabsContent>

      <TabsContent value="categories">
        <Card className="p-6">
          <ServiceCategorySelector
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </Card>
      </TabsContent>

      <TabsContent value="pricing">
        <Card className="p-6">
          <PricingManager />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
