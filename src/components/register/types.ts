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