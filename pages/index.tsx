import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../src/modules/Home/Footer/Footer";
import { Navbar } from "../src/modules/Home/Navbar/Navbar";
import { Hero } from "../src/modules/Home/Hero/Hero";
import { Features } from "../src/modules/Home/Features/Features";
import { Testimonials } from "../src/modules/Home/Testimonials/Testimonials";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Foodie</title>
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
          href="static/fonts//Roboto-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
          type="font/ttf"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
