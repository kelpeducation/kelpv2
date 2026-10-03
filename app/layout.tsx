import type { Metadata, Viewport } from 'next';
import { poppins } from '@/lib/fonts';
import Providers from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:8080'),
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
    url: 'http://localhost:8080',
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
              '@id': 'http://localhost:8080/#organization',
              name: 'KELP Education',
              url: 'http://localhost:8080',
              logo: 'http://localhost:8080/logo-side.png',
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
              sameAs: [],
            }),
          }}
        />
        <main className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center px-6 py-16">
          <section className="w-full max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              KELP Education
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">We are temporarily offline</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
              Our website is currently undergoing maintenance. Please check back later.
            </p>
            <p className="mt-10 text-sm text-primary-foreground/60">
              Thank you for your patience.
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
