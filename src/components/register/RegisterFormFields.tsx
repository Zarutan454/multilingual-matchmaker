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
          <RadioGroupItem value="customer" id="customer" />
          <Label htmlFor="customer">{t("registerAsCustomer")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="provider" id="provider" />
          <Label htmlFor="provider">{t("registerAsProvider")}</Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="+1234567890"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">{t("age")}</Label>
        <Input
          id="age"
          type="number"
          min="18"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">{t("country")}</Label>
        <Input
          id="country"
          type="text"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
          className="w-full"
        />
      </div>
    </div>
  );
};