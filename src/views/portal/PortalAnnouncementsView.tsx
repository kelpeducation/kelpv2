'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Announcement, toAnnouncement } from '@/lib/portal/types';

const PortalAnnouncementsView = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabaseBrowser
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setAnnouncements(data.map(toAnnouncement));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="px-6 md:px-10 py-10 container-custom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Announcements</h1>
        <p className="text-muted-foreground text-sm">Updates and news from the KELP team.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">No announcements yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="bg-card border border-border border-l-4 border-l-secondary rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <p className="font-semibold text-foreground text-sm">{a.title}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">{a.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalAnnouncementsView;
