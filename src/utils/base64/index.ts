export function encodeBase64(str: string): string {
  try {
    return btoa(encodeURIComponent(str));
  } catch {
    return '';
  }
}

export function decodeBase64(params: { url?: string }): string {
  try {
    const url1 = params?.url?.split('%')[0] || '';
    return decodeURIComponent(atob(url1 || ''));
  } catch {
    return '';
  }
}
