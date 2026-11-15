'use client';

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  url: string;
}

export default function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    // Export with high quality canvas
    const downloadCanvas = document.createElement('canvas');
    const ctx = downloadCanvas.getContext('2d');
    const exportSize = 1024; // Ultra HD 1024x1024

    downloadCanvas.width = exportSize;
    downloadCanvas.height = exportSize;

    if (ctx) {
      // Smooth rendering
      ctx.imageSmoothingEnabled = false;

      // Draw original QR stretched to 1024x1024
      ctx.drawImage(canvas, 0, 0, exportSize, exportSize);

      // Trigger download
      const link = document.createElement('a');
      link.download = `binxz-qr-hd-${Date.now()}.png`;
      link.href = downloadCanvas.toDataURL('image/png', 1.0);
      link.click();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/[0.03] p-5 rounded-xl border border-white/10">
      <div 
        ref={qrRef} 
        className="relative bg-white p-3 rounded-xl shadow-lg shadow-black/50 flex items-center justify-center"
      >
        <QRCodeCanvas
          value={url}
          size={512} // Render at high 512px natively so it stays crisp
          style={{ width: '180px', height: '180px' }} // Scale visually in CSS
          level="H" // High error correction so logo doesn't break readability
          marginSize={2}
          imageSettings={{
            src: '/qr-logo.png',
            width: 140, // Match 1.64 ratio (140 x 85)
            height: 85,
            excavate: true,
          }}
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-white text-base">QR Code HD Logo Binxz</h4>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          Resolusi Ultra HD (1024x1024) siap cetak dan scan cepat. Logo tidak gepeng karena aspek rasio asli dipertahankan.
        </p>
        <button
          onClick={downloadQR}
          className="inline-flex items-center gap-2 bg-pink-500/15 border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          <Download size={16} />
          Download QR HD (PNG)
        </button>
      </div>
    </div>
  );
}
