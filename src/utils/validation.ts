import { z } from 'zod';

export const FormValidation = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  passwordForm: z
    .object({
      password: z
        .string()
        .trim()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .refine(
          (value) => /[a-z]/.test(value),
          'Password must contain at least 1 lowercase letter.'
        )
        .refine(
          (value) => /[A-Z]/.test(value),
          'Password must contain at least 1 uppercase letter.'
        )
        .refine(
          (value) => /[0-9]/.test(value),
          'Password must contain at least 1 number.'
        )
        .refine(
          (value) => /[\W_]/.test(value),
          'Password must contain at least 1 special character.'
        ),
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

export type FormData = z.infer<typeof FormValidation>;
