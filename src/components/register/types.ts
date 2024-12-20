import { UseFormReturn } from "react-hook-form";

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  age: string;
  country: string;
  nickname: string;
}

export interface RegisterFormFieldsProps {
  userType: "customer" | "provider";
  setUserType: (type: "customer" | "provider") => void;
  form: UseFormReturn<RegisterFormData>;
}

export interface RegistrationFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  age: string;
  country: string;
  nickname: string;
  userType: "customer" | "provider";
}