'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Bot,
  CheckCircle2,
  Code2,
  Download,
  FileText,
  Loader2,
  Mail,
  Save,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react';
import type { Enrollment } from '@/lib/enrollments/store';
import type { Subscriber } from '@/lib/newsletter/store';
import JsonFieldEditor from '@/components/cms/JsonFieldEditor';

type CmsSection = 'site-settings' | 'products' | 'chatbot-knowledge' | 'pages-content';
type DataViewId = 'enrollments' | 'subscribers';
type ViewId = CmsSection | DataViewId;

const sections: { id: CmsSection; label: string; help: string; icon: typeof Settings }[] = [
  {
    id: 'site-settings',
    label: 'Site Settings',
    help: 'Top contact info, social links, footer quick links and shared brand values.',
    icon: Settings,
  },
  {
    id: 'products',
    label: 'Market Products',
    help: 'Product categories and product catalog used by market pages and product details.',
    icon: ShoppingBag,
  },
  {
    id: 'chatbot-knowledge',
    label: 'Chatbot Knowledge',
    help: 'Knowledge base and FAQ used by the AI assistant prompt.',
    icon: Bot,
  },
  {
    id: 'pages-content',
    label: 'Pages Content',
    help: 'Editable content blocks for Home, About, Services, and Blog pages.',
    icon: FileText,
  },
];

const dataViews: { id: DataViewId; label: string; help: string; icon: typeof Users }[] = [
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

const isCmsSection = (id: ViewId): id is CmsSection =>
  id !== 'enrollments' && id !== 'subscribers';

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

const CmsPage = () => {
  const [view, setView] = useState<ViewId>('site-settings');
  const [cmsKey, setCmsKey] = useState('');
  const [formData, setFormData] = useState<unknown>(null);
  const [loadedSnapshot, setLoadedSnapshot] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message: string }>({
    type: 'idle',
    message: '',
  });

  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [enrollmentsError, setEnrollmentsError] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  const [subscribersError, setSubscribersError] = useState('');

  const activeSectionMeta = useMemo(
    () => sections.find((item) => item.id === view),
    [view],
  );

  const loadSection = async (targetSection: CmsSection) => {
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

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
      setStatus({ type: 'error', message });
      setFormData(null);
      setLoadedSnapshot(null);
    } finally {
      setLoading(false);
    }
  };

  const isDirty = formData !== null && loadedSnapshot !== null && JSON.stringify(formData) !== loadedSnapshot;

  useEffect(() => {
    if (isCmsSection(view)) {
      setShowRaw(false);
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
    if (!isCmsSection(view) || formData === null) return;

    setStatus({ type: 'idle', message: '' });

    if (!cmsKey.trim()) {
      setStatus({ type: 'error', message: 'Provide admin password before saving.' });
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

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save CMS content.');
      }

      setStatus({
        type: 'success',
        message: `${activeSectionMeta?.label || 'Section'} saved successfully.`,
      });
      setLoadedSnapshot(JSON.stringify(formData));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while saving section.';
      setStatus({ type: 'error', message });
    } finally {
      setSaving(false);
    }
  };

  const loadEnrollments = async () => {
    if (!cmsKey.trim()) {
      setEnrollmentsError('Provide admin password above, then load the roster.');
      return;
    }

    setEnrollmentsLoading(true);
    setEnrollmentsError('');

    try {
      const response = await fetch('/api/enrollments', {
        cache: 'no-store',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load enrollments.');
      }

      setEnrollments(payload.data as Enrollment[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading enrollments.';
      setEnrollmentsError(message);
      setEnrollments(null);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  const loadSubscribers = async () => {
    if (!cmsKey.trim()) {
      setSubscribersError('Provide admin password above, then load subscribers.');
      return;
    }

    setSubscribersLoading(true);
    setSubscribersError('');

    try {
      const response = await fetch('/api/newsletter', {
        cache: 'no-store',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load subscribers.');
      }

      setSubscribers(payload.data as Subscriber[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading subscribers.';
      setSubscribersError(message);
      setSubscribers(null);
    } finally {
      setSubscribersLoading(false);
    }
  };

  const courseOptions = useMemo(() => {
    if (!enrollments) return [];
    return Array.from(new Set(enrollments.map((e) => e.course))).sort();
  }, [enrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!enrollments) return [];
    if (courseFilter === 'all') return enrollments;
    return enrollments.filter((e) => e.course === courseFilter);
  }, [enrollments, courseFilter]);

  const sortedSubscribers = useMemo(() => {
    if (!subscribers) return [];
    return subscribers.slice().sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));
  }, [subscribers]);

  const allTabs = [...sections, ...dataViews];

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
    const rows = [
      ['Email', 'Subscribed'],
      ...sortedSubscribers.map((s) => [s.email, s.subscribedAt]),
    ];
    downloadCsv('kelp-newsletter-subscribers.csv', rows);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Website Content Management</CardTitle>
            <CardDescription>
              Edit your website-wide content, and view course enrollments and newsletter subscribers, from one place.
              No technical knowledge needed — just fill in the fields below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-2">
                <Label htmlFor="cms-key">Admin Password</Label>
                <Input
                  id="cms-key"
                  type="password"
                  value={cmsKey}
                  onChange={(event) => setCmsKey(event.target.value)}
                  placeholder="Set CMS_ADMIN_PASSWORD in .env.local"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-800">How to use</p>
                <ol className="mt-2 list-decimal pl-4 text-sm text-slate-600 space-y-1">
                  <li>Choose a section, or the Enrollments / Subscribers tab.</li>
                  <li>Click a section title to expand it, then edit the fields.</li>
                  <li>Save changes, or refresh / export.</li>
                </ol>
              </div>
            </div>

            <Tabs value={view} onValueChange={(value) => setView(value as ViewId)}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {allTabs.map((item) => (
                  <TabsTrigger key={item.id} value={item.id}>
                    {'icon' in item && <item.icon size={14} className="mr-1.5" />}
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {view === 'enrollments' ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-800">Course Enrollments</p>
                  <p className="text-sm text-slate-600">
                    People who joined a program from the Services page (e.g. the English Learning Program).
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={loadEnrollments} disabled={enrollmentsLoading}>
                      {enrollmentsLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                      {enrollments ? 'Refresh Roster' : 'Load Roster'}
                    </Button>
                    {enrollments && (
                      <Button variant="outline" onClick={exportEnrollmentsCsv}>
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

                  {enrollments && courseOptions.length > 0 && (
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                      <SelectTrigger className="w-full sm:w-[260px]">
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

                {enrollmentsError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 whitespace-pre-line">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{enrollmentsError}</span>
                  </div>
                )}

                {enrollments && (
                  <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
                    {filteredEnrollments.length === 0 ? (
                      <p className="p-6 text-center text-sm text-slate-500">
                        No one has joined this program yet.
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
                          {filteredEnrollments
                            .slice()
                            .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
                            .map((enrollment) => (
                              <TableRow key={enrollment.id}>
                                <TableCell className="font-medium">{enrollment.name}</TableCell>
                                <TableCell>{enrollment.course}</TableCell>
                                <TableCell>{enrollment.email}</TableCell>
                                <TableCell>{enrollment.phone}</TableCell>
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
            ) : view === 'subscribers' ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-800">Newsletter Subscribers</p>
                  <p className="text-sm text-slate-600">
                    Emails collected from the "Stay Updated with KELP" newsletter form on the Blog page.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={loadSubscribers} disabled={subscribersLoading}>
                    {subscribersLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    {subscribers ? 'Refresh List' : 'Load Subscribers'}
                  </Button>
                  {subscribers && (
                    <Button variant="outline" onClick={exportSubscribersCsv}>
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  )}
                  {subscribers && (
                    <span className="text-sm text-slate-600">{subscribers.length} subscribers</span>
                  )}
                </div>

                {subscribersError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 whitespace-pre-line">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{subscribersError}</span>
                  </div>
                )}

                {subscribers && (
                  <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
                    {sortedSubscribers.length === 0 ? (
                      <p className="p-6 text-center text-sm text-slate-500">No subscribers yet.</p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Subscribed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedSubscribers.map((subscriber) => (
                            <TableRow key={subscriber.id}>
                              <TableCell className="font-medium">{subscriber.email}</TableCell>
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
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">{activeSectionMeta?.label}</p>
                      {isDirty && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Unsaved changes
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{activeSectionMeta?.help}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRaw((s) => !s)}
                    className="flex-shrink-0"
                  >
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
                    <div className="flex h-[200px] items-center justify-center rounded-xl border bg-white text-sm text-slate-500">
                      Could not load this section.
                    </div>
                  ) : showRaw ? (
                    <pre className="h-[500px] w-full overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-emerald-200">
                      {JSON.stringify(formData, null, 2)}
                    </pre>
                  ) : (
                    <div className="max-h-[600px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5">
                      <JsonFieldEditor value={formData} onChange={setFormData} />
                    </div>
                  )}
                </div>

                <div className="sticky bottom-0 -mx-6 -mb-6 border-t border-slate-200 bg-white/95 backdrop-blur px-6 py-4 space-y-3">
                  {status.type !== 'idle' && (
                    <div
                      className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                        status.type === 'success'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <span>{status.message}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3">
                    {isDirty && (
                      <span className="text-xs text-amber-700 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        You have unsaved changes
                      </span>
                    )}
                    <Button onClick={handleSave} disabled={loading || saving || formData === null}>
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CmsPage;
