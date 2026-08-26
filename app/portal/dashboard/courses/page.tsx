import type { Metadata } from 'next';
import PortalCoursesView from '@/views/portal/PortalCoursesView';

export const metadata: Metadata = {
  title: 'Courses | KELP English Learning Program',
  description: 'Browse teachers and book your next English class.',
};

export default function Page() {
  return <PortalCoursesView />;
}
