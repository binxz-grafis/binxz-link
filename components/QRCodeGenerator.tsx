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

    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    const size = canvas.width + 40;

    finalCanvas.width = size;
    finalCanvas.height = size;

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      if (ctx.roundRect) {
        ctx.roundRect(0, 0, size, size, 20);
      } else {
        ctx.rect(0, 0, size, size);
      }
      ctx.fill();
      ctx.drawImage(canvas, 20, 20);

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
          size={200}
          level="H"
          marginSize={1}
          imageSettings={{
            src: '/qr-logo.png',
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
        {/* Bulatan putih bersih di tengah agar logo tidak gepeng */}
        <div className="absolute w-12 h-12 bg-white rounded-full pointer-events-none flex items-center justify-center">
             <img src="/qr-logo.png" className="w-9 h-9 object-contain" alt="QR Logo" />
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-white text-base">QR Code Logo Binxz</h4>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          QR Code HD dengan bulatan putih dan logo Binxz Grafis.
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
