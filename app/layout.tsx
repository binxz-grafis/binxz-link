import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BINXZ.GRAFIS - URL Shortener',
  description: 'Custom branded URL shortener and QR generator by Binxz Grafis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090a0f] text-white flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
