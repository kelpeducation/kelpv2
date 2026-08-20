import type { Metadata, Viewport } from 'next';
import { poppins } from '@/lib/fonts';
import Providers from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'KELP - Kennis Education for Literacy and Potential | Transformative Education',
  description:
    "KELP provides transformative, sustainable, and equitable education programs for parents, schools, organizations, and adult learners. Unlock your academic and personal potential.",
  alternates: {
    canonical: 'https://www.kelpeducation.com',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
