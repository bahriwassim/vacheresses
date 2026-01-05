import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const path = String(form.get('path') || '');
    const mediaType = String(form.get('mediaType') || '');
    const file = form.get('file') as File | null;

    if (!path || !file || (mediaType !== 'image' && mediaType !== 'video')) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE;
    const mediaBucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || 'site-media';
    if (!url || !serviceKey) {
      return NextResponse.json({ ok: false, error: 'Supabase server env not configured' }, { status: 500 });
    }
    const supabase = createClient(url, serviceKey);

    const ext = (file.name.split('.').pop() || (mediaType === 'image' ? 'jpg' : 'mp4')).toLowerCase();
    const folder = mediaType === 'image' ? 'images' : 'videos';
    const key = `${folder}/${path}-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage.from(mediaBucket).upload(key, file, {
      upsert: true,
      contentType: file.type || (mediaType === 'image' ? 'image/jpeg' : 'video/mp4'),
    });
    if (upErr) {
      return NextResponse.json({ ok: false, error: String(upErr.message || upErr) }, { status: 500 });
    }
    const { data: pub } = supabase.storage.from(mediaBucket).getPublicUrl(key);
    const publicUrl = pub.publicUrl;

    const { error } = await supabase
      .from('media_overrides')
      .upsert({ path, media_type: mediaType, url: publicUrl });
    if (error) {
      return NextResponse.json({ ok: false, error: String(error.message || error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: publicUrl });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

