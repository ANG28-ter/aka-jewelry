import "../../styles/meaning.css";

export default function MeaningSection() {
  const points = [
    {
      title: "Timeless Elegance",
      desc: "Perhiasan yang dirancang untuk bertahan melampaui tren dan generasi.",
    },
    {
      title: "Authentic Craftsmanship",
      desc: "Setiap detail diproses dengan ketelitian dan presisi tinggi.",
    },
    {
      title: "Premium Materials",
      desc: "Kami hanya menggunakan material berkualitas untuk kilau yang nyata.",
    },
    {
      title: "Personal Expression",
      desc: "Perhiasan bukan sekadar aksesori — ini adalah identitas dan cerita.",
    },
  ];

  return (
    <section className="meaning-section">
      <div className="meaning-container">

        <p className="meaning-tag">OUR PHILOSOPHY</p>

        <h2 className="meaning-title">
          Designed to Shine.
          <span>Made to Last.</span>
        </h2>

        <p className="meaning-sub">
          Kami percaya bahwa keindahan sejati hadir dari detail dan ketulusan proses.
        </p>

        <div className="meaning-grid">
          {points.map((item, i) => (
            <div key={i} className="meaning-card fade-up">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
