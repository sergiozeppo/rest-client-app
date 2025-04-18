'use client';
import s from './SignInForm.module.scss';
import { useTranslations } from 'next-intl';
import { useRef, useState, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from '@/i18n/navigation';
export default function SignInForm() {
  const t = useTranslations('Sign-in');
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      router.push('/about');
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className={s.inputContainer}>
        <label className={s.label} htmlFor="email">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className={s.input}
          placeholder={t('email')}
          required
        />
      </div>
      <div className={s.inputContainer}>
        <label className={s.label} htmlFor="password">
          {t('password')}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={s.input}
          placeholder={t('password')}
          required
        />
      </div>
      <div className={s.authError}>{authError}</div>
      <button type="submit" className={s.submitButton} disabled={isSubmitting}>
        {t('submit')}
      </button>
    </form>
  );
}
