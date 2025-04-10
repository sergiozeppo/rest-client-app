'use client';
import s from './SignUpForm.module.scss';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValidation, FormData } from '@/utils/validation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type SignUpFormProps = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: FormData) => Promise<{ error: string } | undefined>;
};

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const t = useTranslations('Sign-up');
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormValidation),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmitForm = async (data: FormData) => {
    setAuthError(null);
    const result = await onSubmit(data);
    if (result?.error) {
      setAuthError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.inputContainer}>
        <label className={s.label} htmlFor="username">
          Username
        </label>
        <input
          {...register('username')}
          className={`${s.input} ${errors.username ? s.inputError : ''}`}
          type="text"
          placeholder="Username"
        />
        <div className={s.errorContainer}>
          {errors.username && (
            <p className={s.error}>{errors.username.message}</p>
          )}
        </div>
      </div>
      <div className={s.inputContainer}>
        <label className={s.label} htmlFor="email">
          Email
        </label>
        <input
          {...register('email')}
          className={`${s.input} ${errors.email ? s.inputError : ''}`}
          type="email"
          placeholder="Email"
        />
        <div className={s.errorContainer}>
          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </div>
      </div>
      <div className={s.inputContainer}>
        <label className={s.label} htmlFor="password">
          {t('password')}
        </label>
        <input
          {...register('passwordForm.password')}
          className={`${s.input} ${errors.passwordForm?.password ? s.inputError : ''}`}
          id="password"
          type="password"
        />
        <div className={s.errorContainer}>
          {errors.passwordForm?.password && (
            <p className={s.error}>{errors.passwordForm?.password.message}</p>
          )}
        </div>
      </div>

      <div className={s.inputContainer}>
        <label className={s.label} htmlFor="confirmPassword">
          {t('confirm-password')}
        </label>
        <input
          {...register('passwordForm.confirmPassword')}
          className={`${s.input} ${errors.passwordForm?.confirmPassword ? s.inputError : ''}`}
          id="confirmPassword"
          type="password"
        />
        <div className={s.errorContainer}>
          {errors.passwordForm?.confirmPassword && (
            <p className={s.error}>
              {errors.passwordForm?.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <button
        className={s.signUpButton}
        type="submit"
        disabled={Object.keys(errors).length > 0 || isSubmitting}
      >
        {t('sign-up')}
      </button>
      {authError && (
        <div className={s.authErrorContainer}>
          <p className={s.error}>{authError}</p>
        </div>
      )}
    </form>
  );
}
