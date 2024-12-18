import { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit, UserCog } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ProfileHeaderProps {
  profile: Profile | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  userId: string;
  onProfileUpdate: (profile: Profile) => void;
}

export const ProfileHeader = ({
  profile,
  isEditing,
  setIsEditing,
  userId,
  onProfileUpdate
}: ProfileHeaderProps) => {
  const { t } = useLanguage();

  const handleUserTypeChange = async (checked: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          user_type: checked ? 'provider' : 'customer',
          category: checked ? 'VIP Begleitung' : null,
          service_categories: checked ? ['Dinner Dates', 'Events & Partys', 'Reisebegleitung'] : null
        })
        .eq('id', userId);

      if (error) throw error;

      onProfileUpdate({
        ...profile!,
        user_type: checked ? 'provider' : 'customer',
        category: checked ? 'VIP Begleitung' : null,
        service_categories: checked ? ['Dinner Dates', 'Events & Partys', 'Reisebegleitung'] : null
      } as Profile);

      toast.success(checked ? t("switchedToProvider") : t("switchedToCustomer"));
    } catch (error) {
      console.error('Error updating user type:', error);
      toast.error(t("errorUpdatingProfile"));
    }
  };

  return (
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-bold">{t("profile")}</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="user-type"
            checked={profile?.user_type === 'provider'}
            onCheckedChange={handleUserTypeChange}
          />
          <Label htmlFor="user-type" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            {profile?.user_type === 'provider' ? t("provider") : t("customer")}
          </Label>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="text-white border-[#9b87f5] hover:bg-[#9b87f5]/20 transition-colors bg-black/30"
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? t("cancel") : t("edit")}
        </Button>
      </div>
    </div>
  );
};