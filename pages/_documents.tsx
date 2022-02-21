import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Foodie app" />
        <link
          href="static/fonts/Roboto-Bold.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link
          href="static/fonts/Roboto-Light.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link
          href="static/fonts/Roboto-Medium.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link
          href="static/fonts/Roboto-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
