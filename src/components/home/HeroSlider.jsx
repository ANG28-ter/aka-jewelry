import { useState, useEffect } from "react";
import "../../styles/home.css"; // styling sementara
import { useNavigate } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    img: "/src/assets/img/hero/jw7.jpeg", // ganti dengan asset lo
    title: "Redefine Your Beauty",
    desc: "Exclusive jewelry crafted for elegance.",
  },
  {
    id: 2,
    img: "/src/assets/img/hero/jw12.jpeg",
    title: "Timeless Luxury",
    desc: "Shine with confidence and class.",
  },
  {
    id: 3,
    img: "/src/assets/img/hero/B2.jpg",
    title: "Wear Your Story",
    desc: "Each piece speaks your personality.",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // =========== SETTING AUTOSLIDE ==============
  const auto = true; // ubah ke false kalau mau manual-only
  const delay = 4000; // slide speed

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, delay);
    return () => clearInterval(timer);
  }, [index]);

  const next = () => setIndex((index + 1) % heroSlides.length);
  const prev = () =>
    setIndex((index - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[index];

  return (
    <section className="hero-slider">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${slide.img})` }}
      />

      <div className="hero-content">
        <h1>{slide.title}</h1>
        <p>{slide.desc}</p>
        <button className="hero-btn" onClick={() => navigate("/Collections")}>
          Explore Collections
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
