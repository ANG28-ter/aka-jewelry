import { Link } from "react-router-dom";
import "../styles/pearlpage.css";
import { pearlCollections } from "../data/pearlcollections";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PearlPage() {
  const items = pearlCollections;

  return (
    <main className="pearl-page">
      <Navbar />
      <section className="pearl-hero">
        <h1>Pearl Collection</h1>
        <p>
          Timeless elegance — soft luminosity, warm gold tones, and refined
          silhouettes.
        </p>
      </section>

      <section className="pearl-grid">
        {items.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} className="pearl-card">
            <div className="pearl-card-img">
              <img src={item.images[0]} alt={item.name} loading="lazy" />
            </div>

            <div className="pearl-card-body">
              <h3>{item.name}</h3>
              <span className="price">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </main>
  );
}
