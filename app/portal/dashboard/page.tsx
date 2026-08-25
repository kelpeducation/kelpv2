import type { Metadata } from 'next';
import PortalDashboard from '@/views/PortalDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | KELP English Learning Program',
  description: 'Book classes, view your teachers, and catch up on announcements.',
};

export default function Page() {
  return <PortalDashboard />;
}
