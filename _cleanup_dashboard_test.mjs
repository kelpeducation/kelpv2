import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const envContent = readFileSync('e:/kelp-main/kelpeducation-main/.env.local', 'utf-8');
const getVar = (name) => {
  const match = envContent.match(new RegExp(`${name}=(.+)`));
  return match ? match[1].trim() : '';
};

const admin = createClient(getVar('NEXT_PUBLIC_SUPABASE_URL'), getVar('SUPABASE_SERVICE_ROLE_KEY'));

const { data, error } = await admin.auth.admin.listUsers({ perPage: 200 });
if (error) {
  console.log('LIST ERROR:', error.message);
  process.exit(1);
}
const target = data.users.find((u) => u.email === 'cdp.dashboard.preview@example.com');
if (!target) {
  console.log('Test user already gone.');
  process.exit(0);
}
const { error: delError } = await admin.auth.admin.deleteUser(target.id);
console.log(delError ? 'DELETE ERROR: ' + delError.message : 'Deleted test user.');
