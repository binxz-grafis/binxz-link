import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    redirect('/');
  }

  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-extrabold text-pink-500 mb-2">404 - Link Tidak Ditemukan</h1>
        <p className="text-gray-400 mb-6">Link kustom ini mungkin sudah kadaluarsa atau salah ketik.</p>
        <a
          href="/"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    );
  }

  redirect(data.original_url);
}
