import type { Metadata } from 'next';
import PortalBookingsView from '@/views/portal/PortalBookingsView';

export const metadata: Metadata = {
  title: 'My Classes | KELP English Learning Program',
  description: 'View and manage your upcoming booked classes.',
};

export default function Page() {
  return <PortalBookingsView />;
}
