import React from "react";
import { RegisterFormFieldsProps } from "./types";
import { UserTypeSelector } from "./user-type-selector";
import { RegisterFormField } from "./form-field";

export function RegisterFormFields({ 
  userType, 
  setUserType, 
  form 
}: RegisterFormFieldsProps): JSX.Element {
  return (
    <div className="space-y-6" data-test-id="register-form-fields">
      <UserTypeSelector userType={userType} setUserType={setUserType} />

      <RegisterFormField
        form={form}
        name="email"
        type="email"
        placeholder="email@example.com"
        translationKey="AUTH.REGISTER.EMAIL"
      />

      <RegisterFormField
        form={form}
        name="nickname"
        translationKey="AUTH.REGISTER.NICKNAME"
      />

      <RegisterFormField
        form={form}
        name="password"
        type="password"
        translationKey="AUTH.REGISTER.PASSWORD"
      />

      <RegisterFormField
        form={form}
        name="confirmPassword"
        type="password"
        translationKey="AUTH.REGISTER.CONFIRM_PASSWORD"
      />

      {userType === "provider" && (
        <>
          <RegisterFormField
            form={form}
            name="phoneNumber"
            type="tel"
            translationKey="AUTH.REGISTER.PHONE_NUMBER"
          />

          <RegisterFormField
            form={form}
            name="age"
            type="number"
            min="18"
            translationKey="AUTH.REGISTER.AGE"
          />

          <RegisterFormField
            form={form}
            name="country"
            translationKey="AUTH.REGISTER.COUNTRY"
          />
        </>
      )}
    </div>
  );
}