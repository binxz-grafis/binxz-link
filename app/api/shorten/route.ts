import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Generate a random 5-character alphanumeric slug
function generateRandomSuffix(length = 5) {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const { url, customSuffix } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL wajib diisi' }, { status: 400 });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Format URL tidak valid' }, { status: 400 });
    }

    // Format slug with mandatory watermark prefix: binxz-grafis-
    let slugSuffix = customSuffix ? customSuffix.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '') : '';
    if (!slugSuffix) {
      slugSuffix = generateRandomSuffix();
    }

    const slug = `binxz-grafis-${slugSuffix}`;

    // Insert into Supabase
    const { data, error } = await supabase
      .from('links')
      .insert([{ slug, original_url: url }])
      .select()
      .single();

    if (error) {
      // If slug collision, return error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Nama custom link sudah digunakan, silakan gunakan yang lain' },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      slug: data.slug,
      original_url: data.original_url,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Terjadi kesalahan server' }, { status: 500 });
  }
}
