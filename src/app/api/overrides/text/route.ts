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
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ ok: false, error: 'Supabase server env not configured' }, { status: 500 });
    }
    const supabase = createClient(url, serviceKey);
    const { error } = await supabase
      .from('content_overrides')
      .upsert({ path, locale, content, created_by }, { onConflict: 'path,locale' });
    if (error) {
      return NextResponse.json({ ok: false, error: String(error.message || error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');
    if (!locale) {
      return NextResponse.json({ ok: false, error: 'Missing locale' }, { status: 400 });
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ ok: false, error: 'Supabase server env not configured' }, { status: 500 });
    }
    const supabase = createClient(url, serviceKey);
    const { data, error } = await supabase
      .from('content_overrides')
      .select('path, locale, content')
      .eq('locale', locale);
    if (error) {
      return NextResponse.json({ ok: false, error: String(error.message || error) }, { status: 500 });
    }
    const root: any = {};
    const setNested = (obj: any, path: string[], val: any) => {
      let cur = obj;
      for (let i = 0; i < path.length - 1; i++) {
        const k = path[i];
        if (typeof cur[k] !== 'object' || cur[k] === null || Array.isArray(cur[k])) {
          cur[k] = {};
        }
        cur = cur[k];
      }
      cur[path[path.length - 1]] = val;
      return obj;
    };
    for (const row of (data || []) as any[]) {
      setNested(root, String(row.path).split('.'), String(row.content));
    }
    return NextResponse.json({ ok: true, data: root });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
