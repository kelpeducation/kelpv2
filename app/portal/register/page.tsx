import type { Metadata } from 'next';
import PortalRegister from '@/views/PortalRegister';

export const metadata: Metadata = {
  title: 'Create Account | KELP English Learning Program',
  description: 'Join the KELP English Learning Program to book classes, meet your teachers, and track announcements.',
};

export default function Page() {
  return <PortalRegister />;
}
