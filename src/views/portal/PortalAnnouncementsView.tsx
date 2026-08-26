'use client';

import { useEffect, useState } from 'react';
import { Loader2, Megaphone } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
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
      <PortalPageHeader
        icon={Megaphone}
        title="Announcements"
        description="Updates and news from the KELP team."
        action={
          !loading &&
          announcements.length > 0 && (
            <span className="inline-flex items-center rounded-full bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5">
              {announcements.length} posted
            </span>
          )
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Megaphone size={22} className="text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">No announcements yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-card border border-border border-l-4 border-l-secondary rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Megaphone size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-foreground text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">{a.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalAnnouncementsView;
