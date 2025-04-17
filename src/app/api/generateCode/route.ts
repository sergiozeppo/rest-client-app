import { NextRequest, NextResponse } from 'next/server';
import { HTTPSnippet } from 'httpsnippet';

export async function POST(req: NextRequest) {
  try {
    const { request, client, variant } = await req.json();

    const snippet = new HTTPSnippet(request);
    const code = snippet.convert(client, variant);

    return NextResponse.json({
      code: code || 'Code generation not supported.',
    });
  } catch {
    return NextResponse.json({ error: 'Code generation not supported.' });
  }
}
