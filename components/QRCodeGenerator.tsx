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

    // QR canvas size
    const size = canvas.width;
    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    
    // Set size to match original QR
    finalCanvas.width = size;
    finalCanvas.height = size;

    if (ctx) {
      // White Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      
      // Draw original QR code
      ctx.drawImage(canvas, 0, 0);

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
          size={200}
          level="H"
          marginSize={1}
          imageSettings={{
            src: '/qr-logo.png', // Logo hitam
            height: 48,
            width: 48,
            excavate: true,
          }}
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-white text-base">QR Code Logo Binxz</h4>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          QR Code HD dengan logo Binxz Grafis hitam di tengah.
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
