import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
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

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;