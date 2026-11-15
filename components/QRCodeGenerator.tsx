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

    // Create a new canvas to add a white border and nice background
    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    const size = canvas.width + 40;

    finalCanvas.width = size;
    finalCanvas.height = size;

    if (ctx) {
      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.roundRect ? ctx.roundRect(0, 0, size, size, 20) : ctx.rect(0, 0, size, size);
      ctx.fill();

      // Draw original QR code centered
      ctx.drawImage(canvas, 20, 20);

      // Download
      const link = document.createElement('a');
      link.download = `binxz-qr-${Date.now()}.png`;
      link.href = finalCanvas.toDataURL('image/png');
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
          size={140}
          level="H"
          marginSize={1}
          imageSettings={{
            src: '/logo.png',
            x: undefined,
            y: undefined,
            height: 36,
            width: 36,
            excavate: true,
          }}
        />
        {/* White circle background behind center logo to match design */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-white pointer-events-none" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-white text-base">QR Code Watermark Binxz</h4>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          QR Code dengan logo Binxz Grafis di tengah. Tetap responsif dan cepat discan.
        </p>
        <button
          onClick={downloadQR}
          className="inline-flex items-center gap-2 bg-pink-500/15 border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          <Download size={16} />
          Download PNG
        </button>
      </div>
    </div>
  );
}
