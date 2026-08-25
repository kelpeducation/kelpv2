import { supabasePublic, getSupabaseAdmin } from '@/lib/supabase/server';

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface SubscriberRow {
  id: string;
  email: string;
  subscribed_at: string;
}

const toSubscriber = (row: SubscriberRow): Subscriber => ({
  id: row.id,
  email: row.email,
  subscribedAt: row.subscribed_at,
});

/**
 * Reads every subscriber. Requires the service_role key (bypasses Row Level
 * Security) since the subscribers table intentionally has no public SELECT
 * policy — see supabase/migrations/0002_create_subscribers.sql.
 */
export const readSubscribers = async (): Promise<Subscriber[]> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to read subscribers: ${error.message}`);
  }

  return (data as SubscriberRow[]).map(toSubscriber);
};

/**
 * Adds a new subscriber using the public (RLS-scoped) client — anyone may
 * subscribe, per the "Public can subscribe" policy. Re-subscribing with the
 * same email is treated as success rather than an error.
 */
export const addSubscriber = async (email: string): Promise<{ alreadySubscribed: boolean }> => {
  const { error } = await supabasePublic.from('subscribers').insert({ email });

  if (error) {
    // Postgres unique_violation
    if (error.code === '23505') {
      return { alreadySubscribed: true };
    }
    throw new Error(`Failed to subscribe: ${error.message}`);
  }

  return { alreadySubscribed: false };
};
