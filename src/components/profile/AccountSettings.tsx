import { PasswordUpdateForm } from './settings/PasswordUpdateForm';
import { EmailUpdateForm } from './settings/EmailUpdateForm';
import { DeleteAccountDialog } from './settings/DeleteAccountDialog';
import { TwoFactorAuth } from '../auth/TwoFactorAuth';

export const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <PasswordUpdateForm />
      <EmailUpdateForm />
      <TwoFactorAuth />
      <DeleteAccountDialog />
    </div>
  );
};