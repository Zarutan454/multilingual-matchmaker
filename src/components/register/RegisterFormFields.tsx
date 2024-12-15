import { useLanguage } from "../../contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegisterFormFieldsProps {
  userType: "customer" | "provider";
  setUserType: (type: "customer" | "provider") => void;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    age: string;
    country: string;
    nickname: string;
  };
  setFormData: (data: any) => void;
}

export const RegisterFormFields = ({
  userType,
  setUserType,
  formData,
  setFormData,
}: RegisterFormFieldsProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <RadioGroup
        defaultValue="customer"
        onValueChange={(value) => setUserType(value as "customer" | "provider")}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="customer" id="customer" className="border-[#FFD700]" />
          <Label htmlFor="customer" className="text-white/90">{t("customerRegistration")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="provider" id="provider" className="border-[#FFD700]" />
          <Label htmlFor="provider" className="text-white/90">{t("providerRegistration")}</Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="nickname" className="text-white/90">{t("nickname")}</Label>
        <Input
          id="nickname"
          type="text"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          required
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/90">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white/90">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white/90">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-white/90">{t("phoneNumber")}</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="+1234567890"
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="text-white/90">{t("age")}</Label>
        <Input
          id="age"
          type="number"
          min="18"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-white/90">{t("country")}</Label>
        <Input
          id="country"
          type="text"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
          className="bg-black/50 border-[#FFD700]/30 text-white placeholder-white/50 focus:border-[#FFD700] focus:ring-[#FFD700]/20"
        />
      </div>
    </div>
  );
};