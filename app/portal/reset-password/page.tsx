import type { Metadata } from 'next';
import PortalResetPassword from '@/views/PortalResetPassword';

export const metadata: Metadata = {
  title: 'Reset Password | KELP English Learning Program',
  description: 'Choose a new password for your KELP student portal account.',
};

export default function Page() {
  return <PortalResetPassword />;
}
