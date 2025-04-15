import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = await handleI18nRouting(request);
  const updatedResponse = await updateSession(request, response);
  return updatedResponse;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the ones starting with `/sign-in`, `/sign-up`, or `/auth`
    '/((?!api|_next|_vercel|sign-in|sign-up|auth|.*\\..*).*)',
  ],
};
