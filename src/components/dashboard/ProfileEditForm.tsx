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
      
      onProfileUpdate(data as Profile);
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