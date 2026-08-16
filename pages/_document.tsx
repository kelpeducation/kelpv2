import { Html, Head, Main, NextScript } from 'next/document';
import { montserrat } from '@/lib/fonts';

export default function Document() {
  return (
    <Html lang="en" className={montserrat.variable}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
