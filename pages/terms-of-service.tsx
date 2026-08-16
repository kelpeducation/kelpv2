import dynamic from 'next/dynamic';

const TermsPage = dynamic(() => import('@/pages/TermsOfService'), { ssr: true });

export default function TermsRoute() {
  return <TermsPage />;
}
