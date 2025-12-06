import { Link } from "react-router-dom";
import "../styles/nusantarapage.css";
import { nusantaraCollections } from "../data/nusantaracollections";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function NusantaraPage() {
  const items = nusantaraCollections;

  return (
    <main className="nusantara-page">
      <Navbar />
      {/* HERO */}
      <section className="nusantara-hero">
        <h1>Nusantara Collection</h1>
        <p>
          Crafted with cultural soul — modern silhouettes inspired by heritage,
          sculpted in warm gold tones.
        </p>
      </section>

      {/* GRID */}
      <section className="nusantara-grid">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="nusantara-card"
          >
            <div className="nusantara-card-img">
              <img src={item.images[0]} alt={item.name} loading="lazy" />
            </div>

            <div className="nusantara-card-body">
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
