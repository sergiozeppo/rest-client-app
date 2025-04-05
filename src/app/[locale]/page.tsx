import { redirect } from '@/i18n/navigation';

export default function Page() {
  redirect({ locale: 'en', href: 'sign-up' });
  return null;
}
