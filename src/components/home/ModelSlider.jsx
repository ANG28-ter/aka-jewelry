import { useState, useEffect } from "react";
import "../../styles/model.css";

const modelPhotos = [
  "/assets/img/model/MD15.jpeg",
  "/assets/img/model/MD16.jpeg",
  "/assets/img/model/MD14.jpeg",
];

export default function ModelSlider() {
  const [i, setI] = useState(0);
  const delay = 4000;
  const auto = true;

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setI((prev) => (prev + 1) % modelPhotos.length);
    }, delay);
    return () => clearInterval(timer);
  }, [i]);

  const next = () => setI((i + 1) % modelPhotos.length);
  const prev = () => setI((i - 1 + modelPhotos.length) % modelPhotos.length);

  return (
    <section className="model-section">
      <h2 className="model-title">Jewels of Queens</h2>
      <p className="model-sub">Elegance that speaks without words</p>

      <div className="model-slider premium">
        <div className="model-slider-inner">
          {modelPhotos.map((src, index) => (
            <img
              key={index}
              src={src}
              className={`model-img ${i === index ? "active" : ""}`}
              alt={`model-${index}`}
            />
          ))}
        </div>

        <div className="model-grad-left"></div>
        <div className="model-grad-right"></div>

        <button className="model-arrow left" onClick={prev}>
          ‹
        </button>
        <button className="model-arrow right" onClick={next}>
          ›
        </button>

        <div className="model-dots">
          {modelPhotos.map((_, index) => (
            <span
              key={index}
              onClick={() => setI(index)}
              className={`dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
