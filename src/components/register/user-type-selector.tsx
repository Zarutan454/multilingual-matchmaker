import React from "react";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";

interface UserTypeSelectorProps {
  userType: "customer" | "provider";
  setUserType: (type: "customer" | "provider") => void;
}

export function UserTypeSelector({ userType, setUserType }: UserTypeSelectorProps): JSX.Element {
  const { t } = useLanguage();

  return (
    <div className="flex gap-4 margin-bottom-6">
      <Button
        type="button"
        variant={userType === "customer" ? "default" : "outline"}
        className={"flex-1 " + (userType === "customer" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10")}
        onClick={function() { setUserType("customer"); }}
        data-test-id="customer-type-button"
      >
        {t("AUTH.REGISTER.CUSTOMER")}
      </Button>
      <Button
        type="button"
        variant={userType === "provider" ? "default" : "outline"}
        className={"flex-1 " + (userType === "provider" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : "hover:bg-[#9b87f5]/10")}
        onClick={function() { setUserType("provider"); }}
        data-test-id="provider-type-button"
      >
        {t("AUTH.REGISTER.PROVIDER")}
      </Button>
    </div>
  );
}