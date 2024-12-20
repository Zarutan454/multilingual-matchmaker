export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  age?: string;
  country?: string;
  nickname: string;
  userType: "customer" | "provider";
}

export interface RegisterFormFieldsProps {
  form: any;
  userType: "customer" | "provider";
  setUserType: (type: "customer" | "provider") => void;
}

export type RegistrationFormValues = RegisterFormData;