import { LayoutDashboard, BookOpen, CalendarClock, Megaphone, type LucideIcon } from 'lucide-react';

export interface PortalNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const portalNavItems: PortalNavItem[] = [
  { href: '/portal/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/portal/dashboard/courses', label: 'Courses', icon: BookOpen },
  { href: '/portal/dashboard/bookings', label: 'My Classes', icon: CalendarClock },
  { href: '/portal/dashboard/announcements', label: 'Announcements', icon: Megaphone },
];
