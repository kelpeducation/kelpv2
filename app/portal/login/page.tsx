import type { Metadata } from 'next';
import PortalLogin from '@/views/PortalLogin';

export const metadata: Metadata = {
  title: 'Log In | KELP English Learning Program',
  description: 'Log in to the KELP English Learning Program to book classes and view announcements.',
};

export default function Page() {
  return <PortalLogin />;
}
