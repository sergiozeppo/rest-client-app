'use server';

import { createClient } from '@/utils/supabase/server';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

export default async function signInWithGithub() {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect({
      locale: locale,
      href: data.url,
    });
  }
}
