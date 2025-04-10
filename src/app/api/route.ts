export async function POST(req: Request) {
  try {
    const { url, method, header, body } = await req.json();

    if (!url) {
      return Response.json({ status: 400, error: 'URL is required' });
    }

    const isWithBody = ['POST', 'PUT'].includes(method);
    if (isWithBody && !body) {
      return Response.json({ status: 400, error: 'Body is required' });
    }

    const options: RequestInit = {
      method,
      headers: isWithBody ? { 'Content-Type': header } : undefined,
      body: isWithBody ? body : undefined,
      cache: 'no-store',
    };

    const res = await fetch(url, options);

    const contentType = res.headers.get('content-type') || '';
    let response: object | string = '';

    if (res.ok) {
      if (contentType.includes('application/json')) {
        response = await res.json();
      } else if (contentType.includes('text/')) {
        response = await res.text();
      } else {
        response = 'Unsupported response format';
      }
    }

    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return Response.json({
      status: res.status,
      statusText: res.statusText,
      headers,
      response,
    });
  } catch {
    return Response.json({ status: 500, error: 'Request failed' });
  }
}
