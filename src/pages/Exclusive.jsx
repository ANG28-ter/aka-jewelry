import { Link } from "react-router-dom";
import "../styles/exclusivepage.css";
import { exclusiveCollections } from "../data/exclusivecollections";

import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function ExclusivePage() {
  const items = exclusiveCollections;

  return (
    <main className="exclusive-page">
      <Navbar />
      {/* ===== HERO ===== */}
      <section className="exclusive-hero">
        <h1>Exclusive Collection</h1>
        <p>
          Crafted with refined precision — bold silhouettes, premium stones, and
          luxurious finishes designed to command attention.
        </p>
      </section>

      {/* ===== EDITORIAL BANNER ===== */}
      {/* <section className="exclusive-editorial">
        <img
          src="/src/assets/img/model/exclusive-banner.jpg"
          alt="Exclusive Editorial"
          loading="lazy"
        />
      </section> */}

      {/* ===== PRODUCT GRID ===== */}
      <section className="exclusive-grid">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="exclusive-card"
          >
            <div className="exclusive-card-img">
              <img src={item.images[0]} alt={item.name} loading="lazy" />
            </div>

            <div className="exclusive-card-body">
              <h3>{item.name}</h3>
              <span className="price">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ===== BOTTOM TEXT ===== */}
      <section className="exclusive-info">
        <h2>Luxury, Redefined.</h2>
        <p>
          Every piece in the Exclusive Collection is crafted in limited batches
          — blending timeless artistry with bold modern aesthetics.
        </p>
      </section>
      <Footer />
    </main>
  );
}
