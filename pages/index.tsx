import type { NextPage } from "next";
import Head from "next/head";
//import Image from "next/image";
import { Footer } from "../src/modules/Home/Footer/Footer";
import { Navbar } from "../src/modules/Home/Navbar/Navbar";
import { Hero } from "../src/modules/Home/Hero/Hero";
import { FeatureSection } from "../src/modules/Home/FeatureSection/FeatureSection";
import { features } from "../src/modules/Home/constants";

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
        {features.map(
          ({ sectionId, title, desc, imgSrc, blueBackground, imageRight }) => (
            <FeatureSection
              key={sectionId}
              sectionId={sectionId}
              title={title}
              desc={desc}
              imgSrc={imgSrc}
              blueBackground={blueBackground}
              imageRight={imageRight}
            />
          )
        )}
        Opinie
      </main>
      <Footer />
    </div>
  );
};

export default Home;
