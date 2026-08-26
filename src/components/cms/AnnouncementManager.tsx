'use client';

import { useState } from 'react';
import { AlertCircle, Loader2, Megaphone, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import type { Announcement } from '@/lib/portal/types';

interface AnnouncementManagerProps {
  cmsKey: string;
}

const emptyForm = { title: '', body: '' };
type FormState = typeof emptyForm;

const AnnouncementManager = ({ cmsKey }: AnnouncementManagerProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadAnnouncements = async () => {
    if (!cmsKey.trim()) {
      setLoadError('Provide admin password above, then load announcements.');
      return;
    }

    setLoading(true);
    setLoadError('');

    try {
      const response = await fetch('/api/portal/announcements', {
        cache: 'no-store',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load announcements.');
      }

      setAnnouncements(payload.data as Announcement[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading announcements.';
      setLoadError(message);
      setAnnouncements(null);
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setDialogOpen(true);
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setForm({ title: announcement.title, body: announcement.body });
    setFormError('');
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!cmsKey.trim()) {
      setFormError('Provide admin password before saving.');
      return;
    }
    if (!form.title.trim() || !form.body.trim()) {
      setFormError('Please fill in both the title and the message.');
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const url = editingId ? `/api/portal/announcements/${editingId}` : '/api/portal/announcements';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-cms-key': cmsKey },
        body: JSON.stringify({ title: form.title.trim(), body: form.body.trim() }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save announcement.');
      }

      const saved = payload.data as Announcement;
      setAnnouncements((prev) => {
        if (!prev) return [saved];
        return editingId ? prev.map((a) => (a.id === saved.id ? saved : a)) : [saved, ...prev];
      });
      setDialogOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while saving announcement.';
      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (!cmsKey.trim()) {
      setLoadError('Provide admin password before deleting.');
      setDeleteTarget(null);
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/portal/announcements/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to delete announcement.');
      }

      setAnnouncements((prev) => (prev ? prev.filter((a) => a.id !== deleteTarget.id) : prev));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while deleting announcement.';
      setLoadError(message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-800">Announcements</p>
        <p className="text-sm text-slate-600">Updates every logged-in student sees on their dashboard.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={loadAnnouncements} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Megaphone className="h-4 w-4" />}
          {announcements ? 'Refresh Announcements' : 'Load Announcements'}
        </Button>
        {announcements && (
          <Button variant="outline" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Add Announcement
          </Button>
        )}
        {announcements && <span className="text-sm text-slate-600">{announcements.length} posted</span>}
      </div>

      {loadError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 whitespace-pre-line">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      {announcements && (
        <div className="space-y-3">
          {announcements.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
              No announcements yet. Post your first one.
            </p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{announcement.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{announcement.body}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(announcement.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(announcement)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteTarget(announcement)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
            <DialogDescription>Every logged-in student sees this on their dashboard.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="announcement-title">Title</Label>
              <Input
                id="announcement-title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. New Public Speaking course now open"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="announcement-body">Message</Label>
              <Textarea
                id="announcement-body"
                value={form.body}
                onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
                placeholder="What do you want students to know?"
                rows={4}
              />
            </div>

            {formError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editingId ? 'Save Changes' : 'Post Announcement'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{deleteTarget?.title}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AnnouncementManager;
