import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { KYCStatus } from "../kyc/KYCStatus";
import { KYCUpload } from "../kyc/KYCUpload";

export const RegisterFormKYC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-2">
      <Label htmlFor="documents">{t("kycRequired")}</Label>
      {user && (
        <>
          <KYCStatus userId={user.id} />
          <KYCUpload userId={user.id} />
        </>
      )}
    </div>
  );
};