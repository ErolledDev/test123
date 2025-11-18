// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // Replace with your domain
  title: {
    default: 'Next.js GitHub Markdown Blog',
    template: '%s | Next.js GitHub Markdown Blog',
  },
  description: 'A modern blog platform powered by Next.js and GitHub Markdown',
  openGraph: {
    title: 'Next.js GitHub Markdown Blog',
    description: 'A modern blog platform powered by Next.js and GitHub Markdown',
    url: '/',
    siteName: 'Next.js GitHub Markdown Blog',
    images: [
      {
        url: '/images/og-image.jpg', // Add your own OG image
        width: 1200,
        height: 630,
        alt: 'Next.js GitHub Markdown Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js GitHub Markdown Blog',
    description: 'A modern blog platform powered by Next.js and GitHub Markdown',
    images: ['/images/twitter-image.jpg'], // Add your own Twitter card image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}

