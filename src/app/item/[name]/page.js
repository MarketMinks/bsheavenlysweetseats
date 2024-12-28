import Header from "@/app/components/header";
import Image from "next/image";
import ItemPage from "./itemHero";
import Footer from "@/app/components/footer";
import CartDrawer from "@/app/components/cartSide";

export default function ItemPages({ params }) {
  return (
    <>
      <Header />
      <ItemPage params={params} />
      <Footer />
      <CartDrawer />
    </>
  );
}
