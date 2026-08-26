import type { Metadata } from 'next';
import PortalForgotPassword from '@/views/PortalForgotPassword';

export const metadata: Metadata = {
  title: 'Forgot Password | KELP English Learning Program',
  description: 'Reset your KELP student portal password.',
};

export default function Page() {
  return <PortalForgotPassword />;
}
