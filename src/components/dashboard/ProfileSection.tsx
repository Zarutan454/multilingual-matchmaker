import { Profile } from "@/types/profile";
import { ImageUploadSection } from "./ImageUploadSection";
import { ProfileEditForm } from "./ProfileEditForm";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileDisplay } from "./profile/ProfileDisplay";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface ProfileSectionProps {
  profile: Profile | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleAvatarUpdate: (url: string) => Promise<void>;
  handleProfileUpdate: (updatedProfile: Profile) => void;
  userId: string;
}

// Verbesserte Formularvalidierung mit Zod
const formSchema = z.object({
  full_name: z.string().min(1, 'Name ist erforderlich'),
  location: z.string().min(1, 'Standort ist erforderlich'),
  age: z.number().min(18, 'Alter muss mindestens 18 sein').max(100, 'Ungültiges Alter').optional(),
  interests: z.string().optional(),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Bitte wählen Sie ein Geschlecht',
  }),
});

export const ProfileSection = ({
  profile,
  isEditing,
  setIsEditing,
  handleAvatarUpdate,
  handleProfileUpdate,
  userId,
}: ProfileSectionProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      location: profile?.location || "",
      age: profile?.age || undefined,
      interests: profile?.interests || "",
      gender: profile?.gender || undefined,
    },
  });

  // Verbesserte Session-Überprüfung
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

      // Überprüfe Profilzugriff
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
    const isSessionValid = await checkSession();
    if (!isSessionValid) return;

    // Konvertiere die validierten Formulardaten in ein Profile-Objekt
    const updatedProfile: Profile = {
      ...profile!,
      full_name: data.full_name,
      location: data.location,
      age: data.age,
      interests: data.interests,
      gender: data.gender,
    };

    handleProfileUpdate(updatedProfile);
  };

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        userId={userId}
        onProfileUpdate={handleProfileUpdate}
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="relative group">
            <img 
              src={profile?.avatar_url || "/placeholder.svg"} 
              alt={profile?.full_name || ""}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
              <ImageUploadSection
                userId={userId}
                onImageUploaded={handleAvatarUpdate}
                type="avatar"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ProfileEditForm
                  profile={profile}
                  onProfileUpdate={handleProfileUpdate}
                />
              </form>
            </Form>
          ) : (
            <ProfileDisplay profile={profile} />
          )}
        </div>
      </div>
    </Card>
  );
};