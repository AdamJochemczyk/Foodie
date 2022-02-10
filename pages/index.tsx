import type { NextPage } from "next";
import Head from "next/head";
//import Image from "next/image";
import { Footer } from "../src/common/Footer/Footer";
import { Navbar } from "../src/common/Navbar/Navbar";
// import styles from "../src/modules/Home/Home.module.css";

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
      <Navbar></Navbar>
      <main></main>
      <Footer />
    </div>
  );
};

export default Home;
