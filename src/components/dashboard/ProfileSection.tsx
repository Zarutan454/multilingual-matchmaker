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

// Define the form validation schema
const formSchema = z.object({
  full_name: z.string().optional(),
  location: z.string().optional(),
  age: z.number().optional(),
  interests: z.string().optional(),
  gender: z.string().optional(),
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
      gender: profile?.gender || "",
    },
  });

  // Überprüfe die Session beim Laden und vor dem Speichern
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
        // Hier NICHT automatisch ausloggen oder weiterleiten
      }
    };
    
    checkSession();
  }, []);

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
              <form onSubmit={form.handleSubmit((data) => handleProfileUpdate(data as Profile))}>
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