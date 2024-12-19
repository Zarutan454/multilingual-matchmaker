import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { BasicInfoForm } from "./customer/BasicInfoForm";
import { InterestsForm } from "./customer/InterestsForm";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Helper function to safely cast Supabase response to Profile
export function castToProfile(data: Record<string, unknown>): Profile {
  return {
    id: String(data.id || ''),
    full_name: data.full_name as string | null,
    bio: data.bio as string | null,
    avatar_url: data.avatar_url as string | null,
    banner_url: data.banner_url as string | null,
    location: data.location as string | null,
    interests: data.interests as string | null,
    occupation: data.occupation as string | null,
    height: data.height as string | null,
    weight: data.weight as string | null,
    availability: Array.isArray(data.availability) ? data.availability : null,
    service_categories: Array.isArray(data.service_categories) ? data.service_categories : null,
    price_range: data.price_range as Profile['price_range'],
    availability_status: (data.availability_status as Profile['availability_status']) || 'offline',
    gallery: Array.isArray(data.gallery) ? data.gallery : null,
    languages: Array.isArray(data.languages) ? data.languages : [],
    services: Array.isArray(data.services) ? data.services.map(castToService) : [],
    age: typeof data.age === 'number' ? data.age : undefined,
    gender: data.gender as string | undefined,
    user_type: (data.user_type as 'customer' | 'provider') || 'customer',
    last_seen: data.last_seen as string | null,
  };
}

// Helper function to safely cast Supabase response to Service
export function castToService(data: Record<string, unknown>): Service {
  return {
    id: String(data.id || ''),
    name: String(data.name || ''),
    description: data.description as string | null,
    duration: Number(data.duration || 0),
    price: typeof data.price === 'number' ? data.price : undefined,
    category: data.category as string | undefined,
    categories: Array.isArray(data.categories) ? data.categories : undefined,
  };
}

interface ProfileEditFormProps {
  profile: Profile | null;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

const formSchema = z.object({
  full_name: z.string().optional(),
  location: z.string().optional(),
  age: z.number().optional(),
  interests: z.string().optional(),
  gender: z.string().optional(),
});

export const ProfileEditForm = ({ profile, onProfileUpdate }: ProfileEditFormProps) => {
  const { t } = useLanguage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      location: profile?.location || "",
      age: profile?.age || undefined,
      interests: profile?.interests || "",
      gender: profile?.gender || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error(t("sessionExpired"));
        return;
      }

      if (!profile?.id) {
        throw new Error('Profile ID fehlt');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: values.full_name,
          location: values.location,
          age: values.age,
          interests: values.interests,
          gender: values.gender
        })
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;
      
      // Use the casting function here
      const updatedProfile = castToProfile(data);
      onProfileUpdate(updatedProfile);
      toast.success(t("profileUpdated"));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t("errorUpdatingProfile"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <BasicInfoForm form={form} />
          <InterestsForm form={form} />
        </div>

        <Button 
          type="submit"
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? t("saving") : t("saveChanges")}
        </Button>
      </form>
    </Form>
  );
};
