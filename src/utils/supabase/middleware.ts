import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const locale =
    response.headers.get('x-middleware-request-x-next-intl-locale') || 'en';

  // Get the current path without the locale prefix
  const pathWithoutLocale = request.nextUrl.pathname
    .split('/')
    .slice(2)
    .join('/');

  // Check if it's a public route (without the locale prefix)
  const isPublicRoute =
    pathWithoutLocale === 'sign-in' ||
    pathWithoutLocale === 'sign-up' ||
    pathWithoutLocale.startsWith('auth/');

  // Skip middleware for auth callback route
  if (pathWithoutLocale === 'about') {
    return response;
  }

  // Redirect user which is not logged in
  if (!user && !isPublicRoute) {
    const url = new URL(`/${locale}/about`, request.url);
    return NextResponse.redirect(url);
  }

  // Redirect logged user from sign in/ sign up pages but keep locale without redirects
  if (user && isPublicRoute) {
    const currentPath = request.nextUrl.pathname;

    if (currentPath === `/${locale}`) {
      return response;
    }

    const url = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(url);
  }

  return response;
}
