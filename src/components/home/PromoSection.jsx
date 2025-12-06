import "../../styles/promo.css";
import { Link } from "react-router-dom";

export default function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-box">

        <h3>New Release ✦ Winter Signature Collection</h3>
        <p>Koleksi baru dengan desain lebih refined, lebih elegan, lebih kamu.</p>

        <Link to="/Collections" className="promo-btn">
          Explore Now →
        </Link>

      </div>
    </section>
  );
}
