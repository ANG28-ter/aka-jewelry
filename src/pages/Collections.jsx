import { Link } from "react-router-dom";
import "../styles/collectionspage.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function CollectionsPage() {
  const collections = [
    {
      key: "basic",
      title: "Basic",
      description: "Everyday essentials to elevate your routine.",
      to: "/Basic",
      image: "/assets/img/grid-collection/basic-grid.jpg",
    },
    {
      key: "exclusive",
      title: "Exclusive",
      description: "Statement pieces with bold character.",
      to: "/Exclusive",
      image: "/assets/img/grid-collection/exclusive-grid.jpg",
    },
    {
      key: "nusantara",
      title: "Nusantara",
      description: "Contemporary silhouettes with cultural roots.",
      to: "/Nusantara",
      image: "/assets/img/grid-collection/nusantara.jpg",
    },
    {
      key: "pearl",
      title: "Pearl",
      description: "Soft luminance and modern elegance.",
      to: "/Pearl",
      image: "/assets/img/grid-collection/pearl-grid-2.jpg",
    },
  ];

  return (
    <main className="collections-page">
      <Navbar />
      {/* HERO */}
      <section className="collections-hero">
        <h1>Our Collections</h1>
        <p>
          Discover premium jewelry curated in four signature styles — a balance
          between form, texture, and light.
        </p>
      </section>

      {/* EDITORIAL BANNER */}
      <section className="collections-editorial-banner">
        <div className="banner-content">
          <h2>Timeless silhouettes, crafted with intention.</h2>
          <p>
            Designed with a philosophy — refined simplicity meets expressive
            detail.
          </p>
        </div>
        <div className="banner-media">
          <img src="/assets/img/hero/jw9.jpg" alt="Editorial" />
        </div>
      </section>

      {/* PRESS BAR */}
      <section className="collections-press">
        <span>Featured In</span>
        <div className="press-logos">
          <p>VOGUE</p>
          <p>ELLE</p>
          <p>NYLON</p>
          <p>Harper’s Bazaar</p>
        </div>
      </section>

      {/* GRID */}
      <section className="collections-grid">
        {collections.map((col, index) => (
          <Link
            key={col.key}
            to={col.to}
            className={`collection-card card-${index}`}
          >
            <div className="collection-img">
              <img src={col.image} alt={col.title} loading="lazy" />
            </div>
            <div className="collection-overlay">
              <h3>{col.title}</h3>
              <p>{col.description}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* FEATURED TRIO */}
      <section className="collections-featured-trio">
        <img src="/assets/img/collections/bracelet-closeup.jpg" />
        <img src="/assets/img/collections/earring-closeup.jpg" />
        <img src="/assets/img/collections/ring-closeup.jpg" />
      </section>

      {/* SUBINFO */}
      <section className="collections-subinfo">
        <div>
          <h3>Materials</h3>
          <p>Premium coatings, hypoallergenic steel, freshwater pearls.</p>
        </div>

        <div>
          <h3>Craft</h3>
          <p>Small-batch handcrafted detailing with modern finishing.</p>
        </div>

        <div>
          <h3>Philosophy</h3>
          <p>
            Designed to illuminate your presence — effortless yet expressive.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
