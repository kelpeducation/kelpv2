'use client';

import { useState } from 'react';
import { AlertCircle, BookOpen, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Course } from '@/lib/portal/types';

interface CourseManagerProps {
  cmsKey: string;
}

const emptyForm = {
  title: '',
  level: '',
  description: '',
  teacherName: '',
  teacherBio: '',
  teacherAvatarInitials: '',
  price: '',
};

type FormState = typeof emptyForm;

const toFormState = (course: Course): FormState => ({
  title: course.title,
  level: course.level,
  description: course.description,
  teacherName: course.teacherName,
  teacherBio: course.teacherBio,
  teacherAvatarInitials: course.teacherAvatarInitials,
  price: String(course.price),
});

const CourseManager = ({ cmsKey }: CourseManagerProps) => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadCourses = async () => {
    if (!cmsKey.trim()) {
      setLoadError('Provide admin password above, then load courses.');
      return;
    }

    setLoading(true);
    setLoadError('');

    try {
      const response = await fetch('/api/portal/courses', {
        cache: 'no-store',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load courses.');
      }

      setCourses(payload.data as Course[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while loading courses.';
      setLoadError(message);
      setCourses(null);
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

  const openEditDialog = (course: Course) => {
    setEditingId(course.id);
    setForm(toFormState(course));
    setFormError('');
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!cmsKey.trim()) {
      setFormError('Provide admin password before saving.');
      return;
    }

    const price = Number(form.price);
    if (
      !form.title.trim() ||
      !form.level.trim() ||
      !form.description.trim() ||
      !form.teacherName.trim() ||
      !form.teacherBio.trim() ||
      !form.teacherAvatarInitials.trim()
    ) {
      setFormError('Please fill in every field.');
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setFormError('Enter a valid price.');
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const url = editingId ? `/api/portal/courses/${editingId}` : '/api/portal/courses';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-cms-key': cmsKey },
        body: JSON.stringify({
          title: form.title.trim(),
          level: form.level.trim(),
          description: form.description.trim(),
          teacherName: form.teacherName.trim(),
          teacherBio: form.teacherBio.trim(),
          teacherAvatarInitials: form.teacherAvatarInitials.trim(),
          price,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to save course.');
      }

      const saved = payload.data as Course;
      setCourses((prev) => {
        if (!prev) return [saved];
        return editingId ? prev.map((c) => (c.id === saved.id ? saved : c)) : [...prev, saved];
      });
      setDialogOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while saving course.';
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
      const response = await fetch(`/api/portal/courses/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { 'x-cms-key': cmsKey },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to delete course.');
      }

      setCourses((prev) => (prev ? prev.filter((c) => c.id !== deleteTarget.id) : prev));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error while deleting course.';
      setLoadError(message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-800">Courses &amp; Teachers</p>
        <p className="text-sm text-slate-600">
          The courses students see in the portal — title, level, description, teacher bio, and price.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={loadCourses} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
          {courses ? 'Refresh Courses' : 'Load Courses'}
        </Button>
        {courses && (
          <Button variant="outline" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        )}
        {courses && <span className="text-sm text-slate-600">{courses.length} courses</span>}
      </div>

      {loadError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 whitespace-pre-line">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      {courses && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
          {courses.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">No courses yet. Add your first one.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.teacherName}</TableCell>
                    <TableCell className="whitespace-nowrap">{course.price.toLocaleString()} RWF</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(course)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteTarget(course)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Course' : 'Add Course'}</DialogTitle>
            <DialogDescription>
              This appears in the student portal exactly as filled in below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Professional English"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="course-level">Level</Label>
                <Input
                  id="course-level"
                  value={form.level}
                  onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))}
                  placeholder="e.g. Intermediate - Advanced"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="What students will learn in this course"
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
              <div className="space-y-1.5">
                <Label htmlFor="course-teacher-name">Teacher Name</Label>
                <Input
                  id="course-teacher-name"
                  value={form.teacherName}
                  onChange={(e) => setForm((prev) => ({ ...prev, teacherName: e.target.value }))}
                  placeholder="e.g. Aline Uwase"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="course-price">Price (RWF / class)</Label>
                <Input
                  id="course-price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="5000"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="course-initials">Initials</Label>
                <Input
                  id="course-initials"
                  value={form.teacherAvatarInitials}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, teacherAvatarInitials: e.target.value.slice(0, 3) }))
                  }
                  placeholder="AU"
                  className="w-20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="course-teacher-bio">Teacher Bio</Label>
              <Textarea
                id="course-teacher-bio"
                value={form.teacherBio}
                onChange={(e) => setForm((prev) => ({ ...prev, teacherBio: e.target.value }))}
                placeholder="A short bio students see before booking"
                rows={3}
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
              {editingId ? 'Save Changes' : 'Add Course'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{deleteTarget?.title}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              This also removes any student bookings for this course. This cannot be undone.
            </AlertDialogDescription>
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

export default CourseManager;
