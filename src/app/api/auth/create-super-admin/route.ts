import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
/**
 * Secure endpoint to create a super admin user in Supabase Auth.
 * Requires a setup token: set ADMIN_SETUP_TOKEN in environment,
 * and pass Authorization: Bearer <token> header.
 */
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    const expected = process.env.ADMIN_SETUP_TOKEN || '';
    if (!expected || token !== expected) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await request.json().catch(() => null);
    const email = String(payload?.email || '').trim();
    const password = String(payload?.password || '').trim();
    const name = String(payload?.name || 'Super Admin').trim();
    const phone = payload?.phone ? String(payload.phone) : undefined;
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Missing email/password' }, { status: 400 });
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ ok: false, error: 'Supabase server env not configured' }, { status: 500 });
    }
    const supabase = createClient(url, serviceKey);
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone, role: 'super_admin' },
      email_confirm: true,
    });
    if (error) {
      return NextResponse.json({ ok: false, error: String(error.message || error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true, user: data.user });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
