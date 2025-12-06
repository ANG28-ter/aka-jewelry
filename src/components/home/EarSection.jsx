import "../../styles/ear.css";
import { Link } from "react-router-dom";
import { earrings } from "../../data/earrings";

export default function EarSection() {
  if (!earrings || earrings.length === 0) return null;

  const heroImage = earrings[0];
  const gridItems = earrings.slice(1); // produk untuk magazine (hanya ini yang clickable)

  // editorial images khusus model (tidak menuju link)
  const modelMain = "/assets/img/model/model-earing-1.jpg"; // close-up wajah
  const modelSide = "/assets/img/model/EWM7.jpeg"; // portrait BW / samping

  const productTop = gridItems[0];
  const productBottom = gridItems[1];

  return (
    <section className="ear-editorial-wrapper">
      {/* ========== HERO FULL WIDTH 2 PANEL ========== */}
      <div className="ear-hero-full">
        {/* LEFT: VIDEO */}
        <div className="ear-hero-panel left">
          <video
            src="/assets/video/closeup/model-with-earing.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>

        {/* RIGHT: MODEL IMAGE */}
        <div className="ear-hero-panel right">
          <img src={heroImage.images  } alt={heroImage.name} loading="lazy" />
        </div>
      </div>

      {/* ===== MARGIN BOTTOM ===== */}
      <div className="ear-hero-spacer"></div>

      {/* ========== MAGAZINE PRODUCT GRID ========== */}
      <div className="ear-magazine-grid">
        {/* MODEL BESAR – NON CLICKABLE */}
        <div className="mag-item mag-model-main">
          <img src={modelMain} alt="Editorial model earring" loading="lazy" />
        </div>

        {/* PRODUK ATAS – CLICKABLE */}
        {productTop && (
          <Link
            to={`/product/${productTop.id}`}
            className="mag-item mag-product-top"
          >
            <img src={productTop.images} alt={productTop.name} loading="lazy" />
            <div className="mag-overlay" />
          </Link>
        )}

        {/* PRODUK BAWAH – CLICKABLE */}
        {productBottom && (
          <Link
            to={`/product/${productBottom.id}`}
            className="mag-item mag-product-bottom"
          >
            <img
              src={productBottom.images}
              alt={productBottom.name}
              loading="lazy"
            />
            <div className="mag-overlay" />
          </Link>
        )}

        {/* MODEL PORTRAIT – NON CLICKABLE */}
        <div className="mag-item mag-model-side">
          <img src={modelSide} alt="Editorial model portrait" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
