import { Html, Head, Main, NextScript } from 'next/document';
import { poppins } from '@/lib/fonts';

export default function Document() {
  return (
    <Html lang="en" className={poppins.variable}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
