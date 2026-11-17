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

    // Format slug directly from customSuffix or random
    let slug = customSuffix ? customSuffix.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '') : '';
    if (!slug) {
      slug = generateRandomSuffix();
    }

    let finalSlug = slug;
    let counter = 1;

    // Check availability and auto-increment if exists (e.g. porto, porto-2, porto-3)
    while (true) {
      const { data: existing } = await supabase
        .from('links')
        .select('slug, original_url')
        .eq('slug', finalSlug)
        .maybeSingle();

      if (!existing) {
        // Slug is available!
        break;
      }

      // If the same link already has this slug, reuse it
      if (existing.original_url === url) {
        return NextResponse.json({
          success: true,
          slug: existing.slug,
          original_url: existing.original_url,
        });
      }

      // Otherwise increment suffix
      counter++;
      finalSlug = `${slug}-${counter}`;
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('links')
      .insert([{ slug: finalSlug, original_url: url }])
      .select()
      .single();

    if (error) {
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
