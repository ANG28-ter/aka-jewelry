import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer.jsx";

// HOME BLOCKS
import HeroSlider from "../components/home/HeroSlider";
import FeaturedShowcase from "../components/home/FeaturedShowcase";
import ProductGrid from "../components/home/ProductGrid";
import ModelSlider from "../components/home/ModelSlider";
import AdEditorialSection from "../components/home/AdEditorialSection";
import PromoSection from "../components/home/PromoSection";
import AdEditorialSection2 from "../components/home/AdEditorialSection2.jsx";
import CollectionsSection from "../components/home/CollectionsSection";
import MeaningSection from "../components/home/MeaningSection";
// import CraftSection from "../components/home/CraftSection.jsx"
import BraceletSection from "../components/home/BraceletSection.jsx";
import BraceletGrid from "../components/home/BraceletGrid.jsx";
import GuaranteeSection from "../components/home/GuaranteeStrip.jsx";
import EarSection from "../components/home/EarSection";
import Divider from "../components/home/Divider";

import "../styles/home.css";

export default function Home() {
  return (
    <main className="home-wrapper">
      {/* FIXED NAV */}
      <Navbar />

      {/* HERO – Fullscreen top visual */}
      <HeroSlider />

      {/* FEATURED LUXURY PIECES */}
      <FeaturedShowcase />

      <Divider />

      {/* MODEL SHOWCASE */}
      <ModelSlider />

      <AdEditorialSection />

      {/* FEATURED PRODUCTS */}
      <section id="product-preview">
        <ProductGrid />
      </section>

      {/* PROMO BANNER */}
      {/* <PromoSection /> */}

      <AdEditorialSection2 />

      <Divider />

      {/* COLLECTION DISPLAY */}
      <CollectionsSection />

      {/* BRAND PHILOSOPHY */}
      <MeaningSection />

      {/* CRAFTSMANSHIP SHOWCASE */}
      {/* <CraftSection /> */}
      <BraceletSection />

      {/* BRACELET PRODUCTS */}
      <BraceletGrid />
      {/* GUARANTEE STRIP */}
      <GuaranteeSection />

      {/* EXCLUSIVE EAR PIECES */}
      <EarSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
