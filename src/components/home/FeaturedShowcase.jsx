import { Link } from "react-router-dom";
import { productsFeatured } from "../../data/productsFeatured"; // sesuaikan path kalau perlu
import "../../styles/featured.css";

export default function FeaturedShowcase() {
  // simple: ambil 3 produk pertama sebagai featured
  // nanti kalau mau, lu bisa ganti jadi filter by flag `isFeatured`
  const featured = productsFeatured.slice(0, 3);

  return (
    <section className="featured-section">
      <div className="featured-header">
        <p className="featured-eyebrow">Signature Selection</p>
        <h2 className="featured-title">Featured Luxury Pieces</h2>
        <p className="featured-sub">
          Kurasi perhiasan terbaik kami untuk melengkapi momen paling berharga.
        </p>
      </div>

      <div className="featured-grid">
        {featured.map((item) => (
          <article className="featured-card" key={item.id}>
            <div className="featured-media">
              <img src={item.images[0]} alt={item.name} />
              <span className="featured-pill">Featured</span>
            </div>

            <div className="featured-info">
              <h3>{item.name}</h3>
              <p className="featured-price">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
              <p className="featured-text">
                Detail halus, kilau elegan, dan finishing yang dibuat untuk
                bertahan lama.
              </p>

              <Link to={`/product/${item.id}`} className="featured-link">
                View Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
