import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import ProjectStage from './ProjectStage';
import PopularProducts from './PopularProducts';
import Products from './Products';
import Stats from './Stats';
import WhyUs from './WhyUs';
import Brands from './Brands';
import Process from './Process';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import FAQ from './FAQ';
import QuoteForm from './QuoteForm';
import Contact from './Contact';
import Footer from './Footer';
import Admin from './Admin';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

function Home() {
  return (
    <div className="pt-24">
      <Hero />
      <ProjectStage />
      <PopularProducts />
      <Products />
      <Stats />
      <WhyUs />
      <Brands />
      <Process />
      <Testimonials />
      <CallToAction />
      <FAQ />
      <QuoteForm />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;