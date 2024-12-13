import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [userType, setUserType] = useState<"customer" | "provider">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      toast.error(t("fillAllFields"));
      return false;
    }
    if (password !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return false;
    }
    if (password.length < 6) {
      toast.error(t("passwordTooShort"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await signUp(email, password);
      
      // Erfolgreiche Registrierung
      toast.success(t("registrationSuccess"));
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t("registrationError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("register")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup
            defaultValue="customer"
            onValueChange={(value) => setUserType(value as "customer" | "provider")}
            className="flex flex-col space-y-2 mb-6"
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

          <div className="flex flex-col items-center gap-4 mb-6">
            <Label htmlFor="profileImage" className="cursor-pointer">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImagePreview} />
                <AvatarFallback>
                  {profileImagePreview ? "..." : "+"} 
                </AvatarFallback>
              </Avatar>
            </Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
            <span className="text-sm text-gray-500">{t("profileImage")}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {userType === "provider" && (
            <div className="space-y-2">
              <Label htmlFor="documents">{t("uploadDocuments")}</Label>
              <Input
                id="documents"
                type="file"
                accept=".pdf,image/*"
                multiple
                onChange={handleDocumentsChange}
              />
              <p className="text-sm text-gray-500">{t("documentsNote")}</p>
              {documents.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Hochgeladene Dokumente:</p>
                  <ul className="list-disc list-inside">
                    {documents.map((doc, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {doc.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? t("registering") : t("submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;