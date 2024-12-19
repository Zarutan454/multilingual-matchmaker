import { useLanguage } from "../../contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Mail, Lock, Phone, MapPin, Calendar } from "lucide-react";
import { useEffect } from "react";

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

  // Validiere das Alter wenn der Benutzertyp sich ändert
  useEffect(() => {
    if (userType === "provider" && formData.age) {
      const age = parseInt(formData.age);
      if (age < 18) {
        setFormData({ ...formData, age: "" });
      }
    }
  }, [userType]);

  const handleAgeChange = (value: string) => {
    const age = parseInt(value);
    if (userType === "provider" && age < 18) {
      return; // Verhindere Eingabe von Alter unter 18 für Dienstleister
    }
    setFormData({ ...formData, age: value });
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        defaultValue={userType}
        value={userType}
        onValueChange={(value) => setUserType(value as "customer" | "provider")}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="customer" id="customer" className="border-[#9b87f5]" />
          <Label htmlFor="customer" className="text-white/90">{t("customerRegistration")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="provider" id="provider" className="border-[#9b87f5]" />
          <Label htmlFor="provider" className="text-white/90">{t("providerRegistration")}</Label>
        </div>
      </RadioGroup>

      <div className="space-y-4">
        <div className="relative">
          <Label htmlFor="nickname" className="text-white/90 mb-2 block">{t("nickname")}</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="nickname"
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              required
              className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
            />
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="email" className="text-white/90 mb-2 block">{t("email")}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
            />
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="password" className="text-white/90 mb-2 block">{t("password")}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
            />
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="confirmPassword" className="text-white/90 mb-2 block">{t("confirmPassword")}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
            />
          </div>
        </div>

        {userType === "provider" && (
          <>
            <div className="relative">
              <Label htmlFor="phoneNumber" className="text-white/90 mb-2 block">{t("phoneNumber")}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+1234567890"
                  required
                  className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="age" className="text-white/90 mb-2 block">{t("age")}</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="age"
                  type="number"
                  min="18"
                  value={formData.age}
                  onChange={(e) => handleAgeChange(e.target.value)}
                  required
                  className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="country" className="text-white/90 mb-2 block">{t("country")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  className="pl-10 bg-black/50 border-[#9b87f5]/30 text-white placeholder:text-white/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};