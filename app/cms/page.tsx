'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Loader2, Save } from 'lucide-react';

type CmsSection = 'site-settings' | 'products' | 'chatbot-knowledge' | 'pages-content';

const sections: { id: CmsSection; label: string; help: string }[] = [
  {
    id: 'site-settings',
    label: 'Site Settings',
    help: 'Top contact info, social links, footer quick links and shared brand values.',
  },
  {
    id: 'products',
    label: 'Market Products',
    help: 'Product categories and product catalog used by market pages and product details.',
  },
  {
    id: 'chatbot-knowledge',
    label: 'Chatbot Knowledge',
    help: 'Knowledge base and FAQ used by the AI assistant prompt.',
  },
  {
    id: 'pages-content',
    label: 'Pages Content',
    help: 'Editable content blocks for Home, About, Services, and Blog pages.',
  },
];

const CmsPage = () => {
  const [section, setSection] = useState<CmsSection>('site-settings');
  const [cmsKey, setCmsKey] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message: string }>({
    type: 'idle',
    message: '',
  });

  const activeSectionMeta = useMemo(
    () => sections.find((item) => item.id === section),
    [section],
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

      setJsonText(JSON.stringify(payload.data, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading section.';
      setStatus({ type: 'error', message });
      setJsonText('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSection(section);
  }, [section]);

  const handleSave = async () => {
    setStatus({ type: 'idle', message: '' });

    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setStatus({ type: 'error', message: 'Invalid JSON format. Fix syntax before saving.' });
      return;
    }

    if (!cmsKey.trim()) {
      setStatus({ type: 'error', message: 'Provide CMS admin password before saving.' });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/cms/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-cms-key': cmsKey,
        },
        body: JSON.stringify({ data: parsed }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save CMS content.');
      }

      setStatus({
        type: 'success',
        message: `${activeSectionMeta?.label || 'Section'} saved successfully.`,
      });

      setJsonText(JSON.stringify(parsed, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while saving section.';
      setStatus({ type: 'error', message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Website Content Management</CardTitle>
            <CardDescription>
              Edit your website-wide content from one place. Save writes directly to JSON files in
              src/content/cms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-2">
                <Label htmlFor="cms-key">CMS Admin Password</Label>
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
                  <li>Choose a section.</li>
                  <li>Edit JSON.</li>
                  <li>Save changes.</li>
                </ol>
              </div>
            </div>

            <Tabs value={section} onValueChange={(value) => setSection(value as CmsSection)}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {sections.map((item) => (
                  <TabsTrigger key={item.id} value={item.id}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-800">{activeSectionMeta?.label}</p>
              <p className="text-sm text-slate-600">{activeSectionMeta?.help}</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="cms-json">JSON Editor</Label>
              {loading ? (
                <div className="flex h-[500px] items-center justify-center rounded-xl border bg-white">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <textarea
                  id="cms-json"
                  value={jsonText}
                  onChange={(event) => setJsonText(event.target.value)}
                  className="h-[500px] w-full rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-sm text-emerald-200 outline-none focus:ring-2 focus:ring-primary"
                  spellCheck={false}
                />
              )}
            </div>

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

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={loading || saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CmsPage;
