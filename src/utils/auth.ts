import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// eslint-disable-next-line no-unused-vars
export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  const supabase = createClient();
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return subscription;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
