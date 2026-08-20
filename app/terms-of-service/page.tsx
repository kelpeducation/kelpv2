import type { Metadata } from 'next';
import TermsOfService from '@/pages/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service | KELP Education',
  description: "Review the terms of service governing your use of KELP Education's website and programs.",
};

export default function Page() {
  return <TermsOfService />;
}
