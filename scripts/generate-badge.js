const sharp = require('sharp');
const fs = require('fs');

async function createBadge() {
  const size = 600;
  const circleRadius = 290;
  
  // White circle with subtle thin outline so it separates cleanly from QR modules
  const circleSvg = Buffer.from(`
    <svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${circleRadius}" fill="#ffffff" />
    </svg>
  `);

  // Target logo width inside circle: 440px so it sits comfortably inside the 580px circle with breathing room
  const logoWidth = 430;
  const resizedLogo = await sharp('D:/BINXZ FILE/cetak/watermark binxz hitam.png')
    .resize({ width: logoWidth, fit: 'contain' })
    .toBuffer();

  const logoMeta = await sharp(resizedLogo).metadata();
  console.log('Resized logo meta:', logoMeta);

  const top = Math.round((size - logoMeta.height) / 2);
  const left = Math.round((size - logoWidth) / 2);

  await sharp(circleSvg)
    .composite([
      { input: resizedLogo, top, left }
    ])
    .png()
    .toFile('public/qr-badge.png');

  console.log('Successfully created public/qr-badge.png');
}

createBadge().catch(console.error);
