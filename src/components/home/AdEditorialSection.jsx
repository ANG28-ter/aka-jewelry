import "../../styles/adEditorial.css";
import { useNavigate } from "react-router-dom";

export default function AdEditorialSection() {
  const navigate = useNavigate();
  return (
    <section className="ad-editorial">
      <div className="ad-grid">
        {/* ROW 1 - COL 1 : PRODUCT MACRO */}
        <div className="ad-item ad-product">
          <img
            src="/src/assets/img/product/Exclusive/4.jpeg"
            alt="Signature bracelet detail"
          />
        </div>

        {/* ROW 1 - COL 2 : MODEL PORTRAIT + COPY */}
        <div className="ad-item ad-model with-overlay">
          <img
            src="/src/assets/img/model/MD18.jpeg"
            alt="Model wearing earrings"
          />
          <div className="ad-overlay">
            <p className="ad-eyebrow">Private Appointment</p>
            <h3 className="ad-title">Wear Your Own Story</h3>
            <p className="ad-text">
              Jadwalkan sesi personal untuk menemukan perhiasan yang benar-benar
              menggambarkan diri kamu.
            </p>
            <button className="ad-btn" onClick={() => navigate("/book")}>
              Book Consultation
            </button>
          </div>
        </div>

        {/* ROW 2 - COL 1 : MODEL PORTRAIT (detail) */}
        <div className="ad-item ad-model">
          <img
            src="/src/assets/img/model/model-ring.jpg"
            alt="Model detail shot"
          />
        </div>

        {/* ROW 2 - COL 2 : PRODUCT MACRO */}
        <div className="ad-item ad-product">
          <video
            src="/src/assets/video/closeup/exclusive-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="ad-video"
          />
        </div>
      </div>
    </section>
  );
}
