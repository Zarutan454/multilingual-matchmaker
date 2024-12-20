import { useEffect } from "react";
import { Profile } from "@/types/profile";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ProfileEditForm } from "../ProfileEditForm";

interface ProfileFormProps {
  profile: Profile | null;
  userId: string;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

const formSchema = z.object({
  full_name: z.string().min(1, 'Name ist erforderlich'),
  location: z.string().min(1, 'Standort ist erforderlich'),
  age: z.number().min(18, 'Alter muss mindestens 18 sein').max(100, 'Ungültiges Alter').optional(),
  interests: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'not_specified'], {
    required_error: 'Bitte wählen Sie ein Geschlecht',
  }),
});

export const ProfileForm = ({ profile, userId, onProfileUpdate }: ProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      location: profile?.location || "",
      age: profile?.age || undefined,
      interests: profile?.interests || "",
      gender: (profile?.gender as "male" | "female" | "other" | "not_specified") || "not_specified",
    },
  });

  const checkSession = async () => {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      const session = data?.session;

      if (sessionError) {
        console.error('Session error:', sessionError);
        toast.error("Es gab ein Problem mit Ihrer Sitzung. Bitte laden Sie die Seite neu.");
        return false;
      }

      if (!session) {
        console.warn('No active session found');
        toast.error("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
        return false;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        if (profileError.message.includes('timeout')) {
          toast.error("Zeitüberschreitung beim Laden des Profils. Bitte versuchen Sie es erneut.");
        } else {
          toast.error("Fehler beim Laden des Profils. Bitte versuchen Sie es später erneut.");
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session check error:', error);
      toast.error("Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.");
      return false;
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const isSessionValid = await checkSession();
      if (!isSessionValid) return;

      const updatedProfile: Profile = {
        ...profile!,
        full_name: data.full_name,
        location: data.location,
        age: data.age,
        interests: data.interests,
        gender: data.gender,
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          location: data.location,
          age: data.age,
          interests: data.interests,
          gender: data.gender,
        })
        .eq('id', userId);

      if (error) throw error;

      onProfileUpdate(updatedProfile);
      toast.success("Profil erfolgreich aktualisiert");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Fehler beim Aktualisieren des Profils");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfileEditForm
          profile={profile}
          onProfileUpdate={onProfileUpdate}
        />
      </form>
    </Form>
  );
};