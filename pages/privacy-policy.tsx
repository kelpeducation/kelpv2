import dynamic from 'next/dynamic';

const PrivacyPage = dynamic(() => import('@/pages/PrivacyPolicy'), { ssr: true });

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
