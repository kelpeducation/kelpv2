import type { Metadata } from 'next';
import PortalAnnouncementsView from '@/views/portal/PortalAnnouncementsView';

export const metadata: Metadata = {
  title: 'Announcements | KELP English Learning Program',
  description: 'Updates and news from the KELP team.',
};

export default function Page() {
  return <PortalAnnouncementsView />;
}
