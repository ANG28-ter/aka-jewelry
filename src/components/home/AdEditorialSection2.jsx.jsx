import "../../styles/adEditorial2.css";

export default function AdEditorialSection2() {
  return (
    <section className="ad-editorial-2">
      <div className="ad-grid-2">
        {/* ROW 1 - COL 2 : MODEL PORTRAIT + COPY */}
        <div className="ad-item-2 ad-model-2 with-overlay-2">
          <img
            src="/assets/img/model/model-ring-2.jpg"
            alt="Model wearing rings"
          />
          <div className="ad-overlay-2">
            <p className="ad-eyebrow-2">Take your time</p>
            <h3 className="ad-title-2">
              Schedule your personal appointment today
            </h3>
            <p className="ad-text-2">
              Tanyakan tentang koleksi kami langsung dengan ahli perhiasan.
            </p>
            <a  href="https://api.whatsapp.com/send?phone=000000"
              target="_blank"
              rel="noopener noreferrer">
            <button className="ad-btn-2">Contact us on whatsapp</button>
            </a>
          </div>
        </div>

        {/* ROW 2 - COL 2 : PRODUCT MACRO */}
        <div className="ad-item-2 ad-product-2">
          <video
            src="/assets/video/closeup/ring-exclusive-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="ad-video-2"
          />
        </div>
      </div>
    </section>
  );
}
