import "../../styles/collections.css";
import { categories } from "../../data/categories";
import { Link } from "react-router-dom";

export default function CollectionsSection() {
  return (
    <section className="collections-section">
      <h2 className="section-title lux-title">Collections</h2>

      <div className="collections-grid">
        {categories.map((cat) => (
          <Link to={cat.link} className="collection-card" key={cat.id}>
            <div
              className="collection-bg"
              style={{ backgroundImage: `url(${cat.image})` }}
            />

            <div className="collection-overlay"></div>

            <div className="collection-info">
              <h3>{cat.name}</h3>
              <span className="collection-sub">Explore Collection →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
