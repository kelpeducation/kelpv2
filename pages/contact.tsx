import dynamic from 'next/dynamic';

const ContactPage = dynamic(() => import('@/pages/Contact'), { ssr: true });

export default function ContactRoute() {
  return <ContactPage />;
}
