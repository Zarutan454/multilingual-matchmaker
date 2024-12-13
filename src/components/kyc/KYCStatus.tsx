import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { createClient } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface KYCStatusProps {
  userId: string;
}

type KYCStatus = 'pending' | 'approved' | 'rejected' | null;

export const KYCStatus = ({ userId }: KYCStatusProps) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<KYCStatus>(null);

  useEffect(() => {
    const fetchKYCStatus = async () => {
      const { data, error } = await supabase
        .from('kyc_verifications')
        .select('status')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching KYC status:', error);
        return;
      }

      setStatus(data?.status || null);
    };

    fetchKYCStatus();

    // Subscribe to changes
    const subscription = supabase
      .channel('kyc_status_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'kyc_verifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  if (!status) return null;

  const statusConfig = {
    pending: {
      icon: Clock,
      className: "bg-yellow-50 text-yellow-800 border-yellow-600",
      message: t("kycPending"),
    },
    approved: {
      icon: CheckCircle,
      className: "bg-green-50 text-green-800 border-green-600",
      message: t("kycApproved"),
    },
    rejected: {
      icon: AlertCircle,
      className: "bg-red-50 text-red-800 border-red-600",
      message: t("kycRejected"),
    },
  };

  const config = statusConfig[status];

  return (
    <Alert className={config.className}>
      <config.icon className="h-4 w-4" />
      <AlertDescription>{config.message}</AlertDescription>
    </Alert>
  );
};