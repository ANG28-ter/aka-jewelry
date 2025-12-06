import "../../styles/craft.css";

export default function CraftSection() {
  const steps = [
    {
      num: "01",
      title: "Concept & Vision",
      desc: "Setiap desain dimulai dari riset mendalam, menggali identitas visual dan karakter yang ingin diwujudkan dalam sebuah perhiasan.",
    },
    {
      num: "02",
      title: "Precision Crafting",
      desc: "Proses pengerjaan dilakukan dengan teknik presisi tinggi, mengutamakan detail yang halus dan proporsi yang sempurna.",
    },
    {
      num: "03",
      title: "Material Selection",
      desc: "Kami memilih logam dan batu berkualitas tinggi untuk memastikan kilau, daya tahan, dan nilai jangka panjang.",
    },
    {
      num: "04",
      title: "Final Polishing",
      desc: "Setiap piece melalui tahap finishing dan inspeksi manual untuk memastikan hasil akhir yang flawless dan siap dipakai.",
    },
  ];

  return (
    <section className="craft-section">
      <div className="craft-container">
        <p className="craft-tag">THE MAKING</p>

        <h2 className="craft-title">
          Crafted With Precision.
          <span>Perfected by Hand.</span>
        </h2>

        <p className="craft-sub">
          Proses pembuatan perhiasan kami menggabungkan seni tradisional dengan
          teknologi modern untuk hasil yang tak lekang oleh waktu.
        </p>

        <div className="craft-grid">
          {steps.map((item, i) => (
            <div key={i} className="craft-card fade-step">
              <div className="craft-num">{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
