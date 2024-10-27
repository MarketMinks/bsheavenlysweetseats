import Image from "next/image";
import DescriptionTab from "./components/description";
import Header from "./components/header";
import HeroPage from "./components/hero";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
    <Header />
    <HeroPage />
    <DescriptionTab />
    <Footer />
    </>
  );
}
