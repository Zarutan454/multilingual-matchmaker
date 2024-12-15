import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { supabase } from "@/lib/supabase";

export const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSendCode = async () => {
    try {
      if (!isValidPhoneNumber(phoneNumber)) {
        toast({
          title: t("error"),
          description: t("invalidPhoneNumber"),
          variant: "destructive",
        });
        return;
      }

      const parsedNumber = parsePhoneNumber(phoneNumber);
      setIsVerifying(true);

      const { error } = await supabase.auth.signInWithOtp({
        phone: parsedNumber.number,
      });

      if (error) throw error;

      setCodeSent(true);
      toast({
        title: t("success"),
        description: t("verificationCodeSent"),
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast({
        title: t("error"),
        description: t("errorSendingCode"),
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsVerifying(true);
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: verificationCode,
        type: "sms",
      });

      if (error) throw error;

      toast({
        title: t("success"),
        description: t("phoneVerified"),
      });

      // Update user metadata to mark phone as verified
      const { error: updateError } = await supabase.auth.updateUser({
        phone: phoneNumber,
        data: { phone_verified: true }
      });

      if (updateError) throw updateError;

    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        title: t("error"),
        description: t("invalidVerificationCode"),
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="tel"
          placeholder={t("enterPhoneNumber")}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={codeSent || isVerifying}
        />
        {!codeSent && (
          <Button
            onClick={handleSendCode}
            disabled={isVerifying || !phoneNumber}
            className="w-full"
          >
            {isVerifying ? t("sendingCode") : t("sendVerificationCode")}
          </Button>
        )}
      </div>

      {codeSent && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={t("enterVerificationCode")}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isVerifying}
          />
          <Button
            onClick={handleVerifyCode}
            disabled={isVerifying || !verificationCode}
            className="w-full"
          >
            {isVerifying ? t("verifying") : t("verifyCode")}
          </Button>
        </div>
      )}
    </div>
  );
};