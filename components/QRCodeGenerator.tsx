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
    const sourceCanvas = qrRef.current?.querySelector('canvas');
    if (!sourceCanvas) return;

    // High resolution canvas (2048 x 2048 px)
    const exportSize = 2048;
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = exportSize;
    downloadCanvas.height = exportSize;
    const ctx = downloadCanvas.getContext('2d');

    if (!ctx) return;

    // High quality rendering settings
    ctx.imageSmoothingEnabled = false;

    // 1. Draw pure white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportSize, exportSize);

    // 2. Draw the QR code scaled up to 2048px with quiet margin
    const margin = 120; // safe padding border
    const qrDrawSize = exportSize - margin * 2;
    ctx.drawImage(sourceCanvas, margin, margin, qrDrawSize, qrDrawSize);

    // 3. Draw rounded white rectangle in the center for the logo
    // Aspect ratio 1.64: width 620, height 380, radius 40
    const boxWidth = 640;
    const boxHeight = 390;
    const boxX = (exportSize - boxWidth) / 2;
    const boxY = (exportSize - boxHeight) / 2;
    const radius = 50;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, radius);
    ctx.fill();

    // 4. Draw the logo on top of the rounded box
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.src = '/qr-logo.png';
    logoImg.onload = () => {
      const padding = 30;
      const logoW = boxWidth - padding * 2;
      const logoH = boxHeight - padding * 2;
      const logoX = boxX + padding;
      const logoY = boxY + padding;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

      // Trigger download
      const link = document.createElement('a');
      link.download = `binxz-qr-hd-${Date.now()}.png`;
      link.href = downloadCanvas.toDataURL('image/png', 1.0);
      link.click();
    };
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/[0.03] p-5 rounded-xl border border-white/10">
      <div 
        ref={qrRef} 
        className="relative bg-white p-3 rounded-2xl shadow-lg shadow-black/50 flex items-center justify-center"
      >
        <QRCodeCanvas
          value={url}
          size={512}
          style={{ width: '190px', height: '190px' }}
          level="H"
          marginSize={2}
          imageSettings={{
            src: '/qr-logo.png',
            width: 140,
            height: 85,
            excavate: true,
          }}
        />

        {/* Kotak ber-radius di tengah untuk preview visual yang rapi */}
        <div 
          className="absolute bg-white rounded-xl shadow-md pointer-events-none flex items-center justify-center p-1.5"
          style={{ width: '62px', height: '40px', borderRadius: '8px' }}
        >
          <img src="/qr-logo.png" className="w-full h-full object-contain" alt="QR Center Logo" />
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-white text-base">QR Code Ultra HD Logo Binxz</h4>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          Resolusi Super HD (2048 x 2048 px). Logo di tengah dilengkapi kotak ber-radius (rounded) rapi dengan proporsi asli.
        </p>
        <button
          onClick={downloadQR}
          className="inline-flex items-center gap-2 bg-pink-500/15 border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer"
        >
          <Download size={16} />
          Download QR Ultra HD (2048px)
        </button>
      </div>
    </div>
  );
}
