import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface KYCUploadProps {
  userId: string;
}

export const KYCUpload = ({ userId }: KYCUploadProps) => {
  const { t } = useLanguage();
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File, type: 'id' | 'license') => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}_${Date.now()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from('kyc_documents')
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    return data.path;
  };

  const handleSubmit = async () => {
    if (!idDocument || !businessLicense) {
      toast.error(t("pleaseUploadAllDocuments"));
      return;
    }

    setIsUploading(true);

    try {
      const idPath = await handleFileUpload(idDocument, 'id');
      const licensePath = await handleFileUpload(businessLicense, 'license');

      const { error } = await supabase
        .from('kyc_verifications')
        .insert([
          {
            user_id: userId,
            id_document_path: idPath,
            business_license_path: licensePath,
            status: 'pending',
          }
        ]);

      if (error) throw error;

      toast.success(t("kycDocumentsUploaded"));
    } catch (error) {
      console.error('Error:', error);
      toast.error(t("errorUploadingDocuments"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="idDocument">{t("identityDocument")}</Label>
        <Input
          id="idDocument"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">{t("idDocumentNote")}</p>
      </div>

      <div>
        <Label htmlFor="businessLicense">{t("businessLicense")}</Label>
        <Input
          id="businessLicense"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setBusinessLicense(e.target.files?.[0] || null)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">{t("businessLicenseNote")}</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isUploading || !idDocument || !businessLicense}
        className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {isUploading ? t("uploading") : t("submitDocuments")}
      </button>
    </div>
  );
};