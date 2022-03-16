import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Footer } from "src/modules/Home/Footer/Footer";
import { Navbar } from "src/modules/Home/Navbar/Navbar";
import { Hero } from "src/modules/Home/Hero/Hero";
import { Features } from "src/modules/Home/Features/Features";
import { Testimonials } from "src/modules/Home/Testimonials/Testimonials";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const queryData = router.asPath.split("&");
    if (queryData.includes("type=recovery")) {
      router.push({
        pathname: "/auth/reset-password",
        query: {
          authToken: queryData[0].split("=")[1]
        }
      });
    }
  }, [router]);

  return (
    <div>
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
