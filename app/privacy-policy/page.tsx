import type { Metadata } from 'next';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy | KELP Education',
  description: "Read KELP Education's privacy policy to learn how we collect, use, and protect your information.",
};

export default function Page() {
  return <PrivacyPolicy />;
}
