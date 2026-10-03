import type { Metadata, Viewport } from 'next';
import { poppins } from '@/lib/fonts';
import Providers from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kelpeducation.rw'),
  title: {
    default: 'KELP Education | Literacy, Learning and Potential in Rwanda',
    template: '%s | KELP Education',
  },
  description:
    'KELP Education provides transformative, sustainable, and equitable literacy, language, teacher training, school consultancy, and adult learning programs in Rwanda.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'education in Rwanda',
    'literacy programs Rwanda',
    'teacher training Rwanda',
    'school consultancy Rwanda',
    'adult learning Rwanda',
    'English language courses Rwanda',
  ],
  authors: [{ name: 'KELP Education' }],
  creator: 'KELP Education',
  publisher: 'KELP Education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: 'https://kelpeducation.rw',
    siteName: 'KELP Education',
    title: 'KELP Education | Literacy, Learning and Potential in Rwanda',
    description:
      'Transformative education programs for literacy, language, schools, teachers, organizations, and adult learners in Rwanda.',
    images: [{ url: '/hero.jpg', width: 1200, height: 630, alt: 'KELP Education learning programs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KELP Education | Literacy, Learning and Potential in Rwanda',
    description: 'Transformative and equitable education programs in Rwanda.',
    images: ['/hero.jpg'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              '@id': 'https://kelpeducation.rw/#organization',
              name: 'KELP Education',
              url: 'https://kelpeducation.rw',
              logo: 'https://kelpeducation.rw/logo-side.png',
              description:
                'Transformative, sustainable, and equitable education for literacy and potential in Rwanda.',
              email: 'kelpeducation@gmail.com',
              telephone: '+250 795 240 664',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Nyanza',
                addressRegion: 'Southern Province',
                addressCountry: 'RW',
              },
              areaServed: { '@type': 'Country', name: 'Rwanda' },
              sameAs: ['https://wa.me/250795240664'],
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
