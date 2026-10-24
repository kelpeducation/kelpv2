'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Download,
  FileText,
  LayoutDashboard,
  Loader2,
  Mail,
  Megaphone,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react';
import type { Enrollment } from '@/lib/enrollments/store';
import type { Subscriber } from '@/lib/newsletter/store';
import JsonFieldEditor from '@/components/cms/JsonFieldEditor';
import CourseManager from '@/components/cms/CourseManager';
import AnnouncementManager from '@/components/cms/AnnouncementManager';
import CmsLoginGate from '@/components/cms/CmsLoginGate';
import CmsSidebar, { type CmsNavGroup } from '@/components/cms/CmsSidebar';

const CMS_SESSION_KEY = 'kelp_cms_admin_key';

type CmsSection = 'site-settings' | 'products' | 'pages-content';
type DataViewId = 'enrollments' | 'subscribers' | 'courses' | 'announcements';
type ViewId = 'dashboard' | CmsSection | DataViewId;

interface NavMeta {
  id: ViewId;
  label: string;
  help: string;
  icon: typeof Settings;
}

const dashboardView: NavMeta = {
  id: 'dashboard',
  label: 'Dashboard',
  help: 'An overview of your website and audience.',
  icon: LayoutDashboard,
};

const sections: (NavMeta & { id: CmsSection })[] = [
  {
    id: 'site-settings',
    label: 'Site Settings',
    help: 'Top contact info, social links, footer quick links and shared brand values.',
    icon: Settings,
  },
  {
    id: 'pages-content',
    label: 'Pages Content',
    help: 'Editable content blocks for Home, About, Services, and Blog pages.',
    icon: FileText,
  },
  {
    id: 'products',
    label: 'Market Products',
    help: 'Product categories and product catalog used by market pages and product details.',
    icon: ShoppingBag,
  },
];

const dataViews: (NavMeta & { id: DataViewId })[] = [
  {
    id: 'courses',
    label: 'Courses & Teachers',
    help: 'Add, edit, or remove the courses and teacher bios students see in the portal.',
    icon: BookOpen,
  },
  {
    id: 'announcements',
    label: 'Announcements',
    help: 'Post updates that every logged-in student sees on their dashboard.',
    icon: Megaphone,
  },
  {
    id: 'enrollments',
    label: 'Course Enrollments',
    help: 'People who joined a program from the Services page (e.g. the English Learning Program).',
    icon: Users,
  },
  {
    id: 'subscribers',
    label: 'Newsletter Subscribers',
    help: 'Emails collected from the "Stay Updated with KELP" newsletter form on the Blog page.',
    icon: Mail,
  },
];

const navGroups: CmsNavGroup[] = [
  { items: [dashboardView] },
  { title: 'Website Content', items: sections },
  { title: 'Learning Portal', items: dataViews.filter((v) => v.id === 'courses' || v.id === 'announcements') },
  { title: 'Audience', items: dataViews.filter((v) => v.id === 'enrollments' || v.id === 'subscribers') },
];

const allViews: NavMeta[] = [dashboardView, ...sections, ...dataViews];

const isCmsSection = (id: ViewId): id is CmsSection => sections.some((s) => s.id === id);

const downloadCsv = (filename: string, rows: string[][]) => {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const csv = rows.map((row) => row.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const isWithinDays = (iso: string, days: number) => Date.now() - new Date(iso).getTime() <= days * 24 * 60 * 60 * 1000;

const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const ErrorBanner = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 whitespace-pre-line">
    <AlertCircle className="h-4 w-4 flex-shrink-0" />
    <span>{message}</span>
  </div>
);

const SearchBox = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div className="relative w-full sm:w-[260px]">
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
  </div>
);

const CmsPage = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState<ViewId>('dashboard');
  const [pendingView, setPendingView] = useState<ViewId | 'logout' | null>(null);
  const [cmsKey, setCmsKey] = useState('');
  const [formData, setFormData] = useState<unknown>(null);
  const [loadedSnapshot, setLoadedSnapshot] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');

  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [enrollmentsError, setEnrollmentsError] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [enrollmentSearch, setEnrollmentSearch] = useState('');

  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  const [subscribersError, setSubscribersError] = useState('');
  const [subscriberSearch, setSubscriberSearch] = useState('');

  useEffect(() => {
    // Local development skips the login screen; the API skips the check too.
    if (process.env.NODE_ENV === 'development') {
      setCmsKey('local-dev');
      setAuthenticated(true);
      setAuthChecked(true);
      return;
    }

    const stored = window.sessionStorage.getItem(CMS_SESSION_KEY);
    if (stored) {
      setCmsKey(stored);
      setAuthenticated(true);
    }
    setAuthChecked(true);
  }, []);

  const handleLoginSuccess = (key: string) => {
    window.sessionStorage.setItem(CMS_SESSION_KEY, key);
    setCmsKey(key);
    setAuthenticated(true);
  };

  const logout = () => {
    window.sessionStorage.removeItem(CMS_SESSION_KEY);
    setCmsKey('');
    setAuthenticated(false);
    setEnrollments(null);
    setSubscribers(null);
    setFormData(null);
    setLoadedSnapshot(null);
    setView('dashboard');
  };

  const handleUnauthorized = useCallback(() => {
    window.sessionStorage.removeItem(CMS_SESSION_KEY);
    setCmsKey('');
    setAuthenticated(false);
    toast.error('Your session expired. Please log in again.');
  }, []);

  const activeMeta = useMemo(() => allViews.find((item) => item.id === view), [view]);

  const isDirty = formData !== null && loadedSnapshot !== null && JSON.stringify(formData) !== loadedSnapshot;

  // Navigation goes through here so unsaved edits are never silently discarded.
  const requestView = (target: ViewId | 'logout') => {
    if (target === view) return;
    if (isDirty) {
      setPendingView(target);
      return;
    }
    if (target === 'logout') logout();
    else setView(target);
  };

  const confirmPendingView = () => {
    if (!pendingView) return;
    setLoadedSnapshot(null);
    setFormData(null);
    if (pendingView === 'logout') logout();
    else setView(pendingView);
    setPendingView(null);
  };

  const loadSection = async (targetSection: CmsSection) => {
    setLoading(true);
    setLoadError('');

    try {
      const response = await fetch(`/api/cms/${targetSection}`, { cache: 'no-store' });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load CMS section.');
      }

      setFormData(payload.data);
      setLoadedSnapshot(JSON.stringify(payload.data));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading section.';
      setLoadError(message);
      setFormData(null);
      setLoadedSnapshot(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isCmsSection(view)) {
      setShowRaw(false);
      setLastSavedAt(null);
      void loadSection(view);
    }
  }, [view]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const handleSave = async () => {
    if (!isCmsSection(view) || formData === null || saving) return;

    if (!cmsKey.trim()) {
      toast.error('Provide admin password before saving.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/cms/${view}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-cms-key': cmsKey,
        },
        body: JSON.stringify({ data: formData }),
      });

      const payload = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save CMS content.');
      }

      setLoadedSnapshot(JSON.stringify(formData));
      setLastSavedAt(new Date());
      toast.success(`${activeMeta?.label || 'Section'} saved`, {
        description: 'Your changes are now live on the website.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while saving section.';
      toast.error('Could not save changes', { description: message });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (loadedSnapshot === null) return;
    setFormData(JSON.parse(loadedSnapshot));
    toast('Changes discarded');
  };

  // Ctrl/Cmd + S saves the current section from anywhere on the page.
  const saveRef = useRef(handleSave);
  saveRef.current = handleSave;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        void saveRef.current();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const loadEnrollments = useCallback(async () => {
    if (!cmsKey.trim()) return;

    setEnrollmentsLoading(true);
    setEnrollmentsError('');

    try {
      const response = await fetch('/api/enrollments', {
        cache: 'no-store',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json().catch(() => null);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(payload?.error || 'Could not load enrollments. The database (Supabase) may not be connected.');
      }

      setEnrollments(payload.data as Enrollment[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading enrollments.';
      setEnrollmentsError(message);
      setEnrollments(null);
    } finally {
      setEnrollmentsLoading(false);
    }
  }, [cmsKey, handleUnauthorized]);

  const loadSubscribers = useCallback(async () => {
    if (!cmsKey.trim()) return;

    setSubscribersLoading(true);
    setSubscribersError('');

    try {
      const response = await fetch('/api/newsletter', {
        cache: 'no-store',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json().catch(() => null);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(payload?.error || 'Could not load subscribers. The database (Supabase) may not be connected.');
      }

      setSubscribers(payload.data as Subscriber[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading subscribers.';
      setSubscribersError(message);
      setSubscribers(null);
    } finally {
      setSubscribersLoading(false);
    }
  }, [cmsKey, handleUnauthorized]);

  // Load audience data as soon as the admin is in, so the dashboard and tables are ready.
  useEffect(() => {
    if (authenticated && cmsKey) {
      void loadEnrollments();
      void loadSubscribers();
    }
  }, [authenticated, cmsKey, loadEnrollments, loadSubscribers]);

  const courseOptions = useMemo(() => {
    if (!enrollments) return [];
    return Array.from(new Set(enrollments.map((e) => e.course))).sort();
  }, [enrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!enrollments) return [];
    const query = enrollmentSearch.trim().toLowerCase();
    return enrollments
      .filter((e) => courseFilter === 'all' || e.course === courseFilter)
      .filter(
        (e) =>
          !query ||
          [e.name, e.email, e.phone, e.course].some((field) => field?.toLowerCase().includes(query)),
      )
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  }, [enrollments, courseFilter, enrollmentSearch]);

  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return [];
    const query = subscriberSearch.trim().toLowerCase();
    return subscribers
      .filter((s) => !query || s.email.toLowerCase().includes(query))
      .sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));
  }, [subscribers, subscriberSearch]);

  const exportEnrollmentsCsv = () => {
    if (!enrollments) return;
    const rows = [
      ['Name', 'Program', 'Email', 'Phone', 'Joined'],
      ...filteredEnrollments.map((e) => [e.name, e.course, e.email, e.phone, e.submittedAt]),
    ];
    downloadCsv('kelp-course-enrollments.csv', rows);
  };

  const exportSubscribersCsv = () => {
    if (!subscribers) return;
    const rows = [['Email', 'Subscribed'], ...filteredSubscribers.map((s) => [s.email, s.subscribedAt])];
    downloadCsv('kelp-newsletter-subscribers.csv', rows);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authenticated) {
    return <CmsLoginGate onSuccess={handleLoginSuccess} />;
  }

  const stats = [
    {
      label: 'Enrollments',
      value: enrollments?.length,
      hint: enrollments ? `${enrollments.filter((e) => isWithinDays(e.submittedAt, 7)).length} this week` : '',
      icon: Users,
      target: 'enrollments' as ViewId,
    },
    {
      label: 'Newsletter subscribers',
      value: subscribers?.length,
      hint: subscribers ? `${subscribers.filter((s) => isWithinDays(s.subscribedAt, 7)).length} this week` : '',
      icon: Mail,
      target: 'subscribers' as ViewId,
    },
    {
      label: 'Active programs',
      value: enrollments ? courseOptions.length : undefined,
      hint: 'with at least one enrollment',
      icon: BookOpen,
      target: 'courses' as ViewId,
    },
  ];

  const recentEnrollments = (enrollments ?? [])
    .slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => requestView(stat.target)}
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <stat.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900 tabular-nums">
              {stat.value === undefined ? <Loader2 className="h-6 w-6 animate-spin text-slate-300" /> : stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{stat.hint}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-slate-800">Latest enrollments</p>
            <Button variant="ghost" size="sm" onClick={() => requestView('enrollments')}>
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          {enrollmentsError ? (
            <ErrorBanner message={enrollmentsError} />
          ) : !enrollments ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : recentEnrollments.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No enrollments yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentEnrollments.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">{e.name}</p>
                    <p className="truncate text-xs text-slate-500">{e.course}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-slate-400">
                    {new Date(e.submittedAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <p className="mb-4 font-semibold text-slate-800">Quick edit</p>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => requestView(section.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 text-left transition hover:border-primary/30 hover:bg-primary/5"
              >
                <span className="rounded-lg bg-slate-100 p-2 text-slate-600">
                  <section.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-slate-800">{section.label}</span>
                  <span className="block truncate text-xs text-slate-500">{section.help}</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnrollments = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={loadEnrollments} disabled={enrollmentsLoading}>
            {enrollmentsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
          {enrollments && (
            <Button variant="outline" onClick={exportEnrollmentsCsv} disabled={filteredEnrollments.length === 0}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
          {enrollments && (
            <span className="text-sm text-slate-600">
              {filteredEnrollments.length} of {enrollments.length} people
            </span>
          )}
        </div>

        {enrollments && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <SearchBox value={enrollmentSearch} onChange={setEnrollmentSearch} placeholder="Search name, email, phone…" />
            {courseOptions.length > 0 && (
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Filter by program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All programs</SelectItem>
                  {courseOptions.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      {enrollmentsError && <ErrorBanner message={enrollmentsError} />}

      {!enrollments && enrollmentsLoading && (
        <div className="flex h-48 items-center justify-center rounded-xl border bg-white">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {enrollments && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
          {filteredEnrollments.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              {enrollments.length === 0 ? 'No one has joined a program yet.' : 'No enrollments match your search.'}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">{enrollment.name}</TableCell>
                    <TableCell>{enrollment.course}</TableCell>
                    <TableCell>
                      <a href={`mailto:${enrollment.email}`} className="text-primary hover:underline">
                        {enrollment.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href={`tel:${enrollment.phone}`} className="hover:underline">
                        {enrollment.phone}
                      </a>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-slate-500">
                      {new Date(enrollment.submittedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );

  const renderSubscribers = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={loadSubscribers} disabled={subscribersLoading}>
            {subscribersLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
          {subscribers && (
            <Button variant="outline" onClick={exportSubscribersCsv} disabled={filteredSubscribers.length === 0}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
          {subscribers && (
            <span className="text-sm text-slate-600">
              {filteredSubscribers.length} of {subscribers.length} subscribers
            </span>
          )}
        </div>
        {subscribers && (
          <SearchBox value={subscriberSearch} onChange={setSubscriberSearch} placeholder="Search email…" />
        )}
      </div>

      {subscribersError && <ErrorBanner message={subscribersError} />}

      {!subscribers && subscribersLoading && (
        <div className="flex h-48 items-center justify-center rounded-xl border bg-white">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {subscribers && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
          {filteredSubscribers.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              {subscribers.length === 0 ? 'No subscribers yet.' : 'No subscribers match your search.'}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      <a href={`mailto:${subscriber.email}`} className="text-primary hover:underline">
                        {subscriber.email}
                      </a>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-slate-500">
                      {new Date(subscriber.subscribedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );

  const renderSectionEditor = () => (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isDirty ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Unsaved changes
            </span>
          ) : lastSavedAt ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Saved at {formatTime(lastSavedAt)}
            </span>
          ) : (
            formData !== null && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Up to date
              </span>
            )
          )}
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowRaw((s) => !s)} disabled={formData === null}>
          <Code2 className="h-4 w-4" />
          {showRaw ? 'Show Form' : 'View Raw JSON'}
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex h-[500px] items-center justify-center rounded-xl border bg-white">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : formData === null ? (
          <div className="flex h-[200px] flex-col items-center justify-center gap-3 rounded-xl border bg-white text-sm text-slate-500">
            <span>{loadError || 'Could not load this section.'}</span>
            {isCmsSection(view) && (
              <Button variant="outline" size="sm" onClick={() => void loadSection(view)}>
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
            )}
          </div>
        ) : showRaw ? (
          <pre className="h-[500px] w-full overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-emerald-200">
            {JSON.stringify(formData, null, 2)}
          </pre>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <JsonFieldEditor value={formData} onChange={setFormData} cmsKey={cmsKey} />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 -mx-6 -mb-6 flex flex-wrap items-center justify-between gap-3 rounded-b-lg border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <span className="hidden text-xs text-slate-400 sm:inline">
          Tip: press <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono">Ctrl</kbd> +{' '}
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono">S</kbd> to save
        </span>
        <div className="flex flex-1 items-center justify-end gap-3">
          <Button variant="outline" onClick={handleDiscard} disabled={!isDirty || saving}>
            <RotateCcw className="h-4 w-4" />
            Discard
          </Button>
          <Button onClick={handleSave} disabled={loading || saving || formData === null || !isDirty}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </>
  );

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return renderDashboard();
      case 'courses':
        return <CourseManager cmsKey={cmsKey} />;
      case 'announcements':
        return <AnnouncementManager cmsKey={cmsKey} />;
      case 'enrollments':
        return renderEnrollments();
      case 'subscribers':
        return renderSubscribers();
      default:
        return renderSectionEditor();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <CmsSidebar
        groups={navGroups}
        activeId={view}
        dirty={isDirty}
        onSelect={(id) => requestView(id as ViewId)}
        onLogout={() => requestView('logout')}
      />

      <main className="md:pl-64 py-6 lg:py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <Card>
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                {view === 'dashboard' ? 'Welcome back' : 'Content Management'}
              </p>
              <CardTitle className="text-3xl font-bold text-primary">{activeMeta?.label}</CardTitle>
              <CardDescription>{activeMeta?.help}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={view} onValueChange={(value) => requestView(value as ViewId)} className="md:hidden">
                <TabsList className="w-full justify-start overflow-x-auto">
                  {allViews.map((item) => (
                    <TabsTrigger key={item.id} value={item.id}>
                      <item.icon size={14} className="mr-1.5" />
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {renderView()}
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog open={pendingView !== null} onOpenChange={(open) => !open && setPendingView(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes in {activeMeta?.label}. If you leave now, those changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPendingView} className="bg-destructive hover:bg-destructive/90">
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CmsPage;
