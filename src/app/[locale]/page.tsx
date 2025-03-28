import { getTranslations } from 'next-intl/server';
export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return <h2>{t('title')}</h2>;
}
