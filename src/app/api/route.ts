export async function POST(req: Request) {
  try {
    const { url, method } = await req.json();

    if (!url) {
      return Response.json({ status: 400, error: 'URL is required' });
    }

    const res = await fetch(url, { method, cache: 'no-store' });

    let response: string | object = {};
    const content = res.headers.get('content-type');
    if (res.ok && content?.includes('application/json')) {
      response = await res.json();
    } else if (res.ok && content?.includes('text/html')) {
      response = await res.text();
    }

    const headers: Record<string, string> = {};

    res.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return Response.json({ status: res.status, headers, response });
  } catch {
    return Response.json({ status: 500, error: 'Request failed' });
  }
}
