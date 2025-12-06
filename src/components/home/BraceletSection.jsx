import "../../styles/bracelet.css";
import { Link } from "react-router-dom";

export default function BraceletSection() {
  return (
    <section className="bracelet-editorial">
      <div className="bracelet-grid">
        {/* Bracelet Video Detail */}
        <div className="bracelet-item bracelet-product">
          <video
            src="/assets/video/closeup/bracelet-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="bracelet-video"
          />
        </div>

        {/* Model Portrait + Overlay Copy */}
        <div className="bracelet-item bracelet-model with-overlay">
          <img
            src="/assets/img/product/B/BWM8.jpeg"
            alt="Model wearing bracelet"
          />

          <div className="bracelet-overlay">
            <p className="bracelet-eyebrow">Exclusive Piece</p>
            <h3 className="bracelet-title">Crafted to Embrace You</h3>
            <p className="bracelet-text">
              Temukan koleksi gelang yang dirancang untuk menyatu dengan
              karakter dan keanggunan pribadi kamu.
            </p>
            <Link to="/collections" className="bracelet-btn">
              Explore Collections
            </Link>
          </div>
        </div>

        {/* Model Detail Shot */}
        <div className="bracelet-item bracelet-model">
          <img
            src="/assets/img/product/B/BWM6.jpeg"
            alt="Bracelet detail model shot"
          />
        </div>
        {/* Product Macro Shot */}
        <div className="bracelet-item bracelet-product">
          <img
            src="/assets/img/product/exclusive/B6.jpeg"
            alt="Bracelet macro detail"
          />
        </div>
      </div>
    </section>
  );
}
