import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import ProjectStage from './ProjectStage';
import PopularProducts from './PopularProducts';
import WindowExplorer from './WindowExplorer';
import NextSteps from './NextSteps';
import WhyTrust from './WhyTrust';
import ProductSupport from './ProductSupport';
import Inspiration from './Inspiration';
import QuoteForm from './QuoteForm';
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
      <WindowExplorer />
      <NextSteps />
      <WhyTrust />
      <ProductSupport />
      <Inspiration />
      <QuoteForm />
      <Footer />
    </div>
  );
}

function WithNav({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<WithNav><Home /></WithNav>} />
        <Route path="/products" element={<WithNav><ProductList /></WithNav>} />
        <Route path="/products/:id" element={<WithNav><ProductDetail /></WithNav>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
