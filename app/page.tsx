'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { Copy, Check, ExternalLink, Link2, Sparkles } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customSuffix, setCustomSuffix] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ slug: string; original_url: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, customSuffix }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal membuat shortlink');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFullShortUrl = () => {
    if (!result) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/${result.slug}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getFullShortUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

      <div>
        <Header />

        <main className="max-w-3xl mx-auto px-6 py-16 text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-semibold mb-6">
            <Sparkles size={14} /> Official Watermark Binxz Grafis
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            SHORTEN{' '}
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-[#a3e635] bg-clip-text text-transparent">
              LINKS
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10 font-light">
            Tempel link Drive atau website, hasilkan URL custom ber-watermark{' '}
            <strong className="text-pink-400 font-semibold">binxz-grafis</strong> dan QR Code dengan logo resmi.
          </p>

          {/* Shorten Input Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/60 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-col gap-4 text-left"
          >
            <div>
              <label className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5 block">
                Link Asli (Tujuan)
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... atau link web"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>

            {/* Custom Suffix Option */}
            <div>
              <label className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5 block">
                Kustom Teks Belakang (Opsional)
              </label>
              <div className="flex items-center bg-black/40 border border-white/15 rounded-xl overflow-hidden focus-within:border-pink-500 transition">
                <span className="bg-white/5 text-pink-400 font-bold px-3 py-3 text-xs sm:text-sm border-r border-white/10 select-none">
                  binxz-grafis-
                </span>
                <input
                  type="text"
                  placeholder="porto-desain (opsional)"
                  value={customSuffix}
                  onChange={(e) => setCustomSuffix(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-500 text-sm focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-500/25 transition duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Membuat Link...' : 'Buat Custom Link'}
            </button>
          </form>

          {/* Result Section */}
          {result && (
            <div className="mt-8 bg-gray-900/60 backdrop-blur-md border border-pink-500/30 p-6 rounded-2xl text-left shadow-xl animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase font-bold text-[#a3e635] tracking-wider flex items-center gap-1.5">
                  <Link2 size={14} /> Link Siap Digunakan
                </span>
                <a
                  href={getFullShortUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
                >
                  Buka Link <ExternalLink size={12} />
                </a>
              </div>

              {/* Short URL Box */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-black/60 border border-white/10 rounded-xl p-3 gap-3 mb-6">
                <code className="text-pink-400 font-semibold text-sm sm:text-base break-all px-2">
                  {getFullShortUrl()}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#a3e635] hover:bg-[#8ece28] text-black font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Tersalin!' : 'Salin'}
                </button>
              </div>

              {/* QR Code Section */}
              <QRCodeGenerator url={getFullShortUrl()} />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-600 border-t border-white/5">
        &copy; {new Date().getFullYear()} BINXZ GRAFIS &bull; Bintang Ramadhano. All rights reserved.
      </footer>
    </div>
  );
}
