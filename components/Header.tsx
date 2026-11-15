import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1 rounded-md shadow-lg shadow-pink-500/10">
          {/* Logo Binxz */}
          <img 
            src="/logo.png" 
            alt="Binxz Logo" 
            className="h-8 object-contain" 
            style={{ height: '32px', width: 'auto', maxHeight: '32px', objectFit: 'contain' }}
          />
        </div>
        <span className="font-extrabold text-lg tracking-wider text-white">
          BINXZ<span className="text-[#a3e635]">.GRAFIS</span>
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="border border-pink-500/40 text-white px-3.5 py-1 rounded-full bg-pink-500/10 font-medium">
          URL Shortener
        </span>
      </div>
    </header>
  );
}
