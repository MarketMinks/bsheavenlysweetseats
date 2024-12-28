import CartDrawer from '../components/cartSide';
import Footer from '../components/footer';
import Header from '../components/header';
import About from './about';
export default function Home() {
  return (
    <>
    <Header />
    <About/>
    <Footer/>
    <CartDrawer/>
    </>
  );
}
