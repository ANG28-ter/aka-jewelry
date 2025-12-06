import { Link } from "react-router-dom";
import "../styles/basicpage.css";
import { basicCollections } from "../data/basiccollections";

import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function BasicPage() {
  const items = basicCollections;

  return (
    <main className="basic-page">
        <Navbar />
      {/* ===== HERO ===== */}
      <section className="basic-hero">
        <h1>Basic Collection</h1>
        <p>
          Everyday luxury — curated minimalist pieces designed to be worn
          effortlessly.
        </p>
      </section>

      {/* ===== EDITORIAL STRIP ===== */}
      {/* <section className="basic-editorial">
        <img
          src="/src/assets/img/basic/editorial-basic-banner.jpg"
          alt="Basic Editorial"
          loading="lazy"
        />
      </section> */}

      {/* ===== PRODUCT GRID ===== */}
      <section className="basic-grid">
        {items.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} className="basic-card">
            <div className="basic-card-img">
              <img src={item.images[0]} alt={item.name} />
            </div>

            <div className="basic-card-body">
              <h3>{item.name}</h3>
              <span className="price">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ===== MINI INFO ===== */}
      <section className="basic-info">
        <div>
          <h4>Everyday Comfort</h4>
          <p>Ringan dan nyaman dipakai setiap hari.</p>
        </div>

        <div>
          <h4>Premium Material</h4>
          <p>Hypoallergenic & tahan lama.</p>
        </div>

        <div>
          <h4>Timeless Design</h4>
          <p>Siluet bersih dan modern untuk gaya apa pun.</p>
        </div>
      </section>
        <Footer />
    </main>
  );
}
