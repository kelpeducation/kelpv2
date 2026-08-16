import dynamic from 'next/dynamic';

const BlogPage = dynamic(() => import('@/pages/Blog'), { ssr: true });

export default function BlogRoute() {
  return <BlogPage />;
}
