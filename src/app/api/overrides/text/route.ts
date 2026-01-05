import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, locale, content, created_by } = body || {};
    if (!path || !locale || typeof content !== 'string') {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE;
    if (!url || !serviceKey) {
      return NextResponse.json({ ok: false, error: 'Supabase server env not configured' }, { status: 500 });
    }
    const supabase = createClient(url, serviceKey);
    const { error } = await supabase
      .from('content_overrides')
      .upsert({ path, locale, content, created_by });
    if (error) {
      return NextResponse.json({ ok: false, error: String(error.message || error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
