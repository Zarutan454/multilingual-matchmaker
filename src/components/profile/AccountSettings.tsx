import { PasswordUpdateForm } from './settings/PasswordUpdateForm';
import { EmailUpdateForm } from './settings/EmailUpdateForm';
import { DeleteAccountDialog } from './settings/DeleteAccountDialog';

export const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <PasswordUpdateForm />
      <EmailUpdateForm />
      <DeleteAccountDialog />
    </div>
  );
};