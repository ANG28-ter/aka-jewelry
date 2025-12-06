import "../../styles/guarantee.css";
import { ShieldCheck, Gem, RefreshCcw, Award } from "lucide-react";

export default function GuaranteeSection() {
  const items = [
    {
      icon: <ShieldCheck size={32} strokeWidth={1.3} />,
      title: "Lifetime Guarantee",
      desc: "Setiap perhiasan dilindungi oleh garansi seumur hidup untuk memastikan kualitas dan ketahanan jangka panjang.",
    },
    {
      icon: <Gem size={32} strokeWidth={1.3} />,
      title: "Certified Materials",
      desc: "Semua material telah melalui proses verifikasi untuk memastikan keaslian, keamanan, dan nilai premium.",
    },
    {
      icon: <RefreshCcw size={32} strokeWidth={1.3} />,
      title: "Easy Returns",
      desc: "Proses pengembalian yang mudah dan transparan untuk menjaga kenyamanan dan rasa aman pelanggan.",
    },
    {
      icon: <Award size={32} strokeWidth={1.3} />,
      title: "Quality Inspection",
      desc: "Setiap produk melalui pemeriksaan ketat sebelum dikirim untuk menjamin standar kualitas tertinggi.",
    },
  ];

  return (
    <section className="guarantee-section">
      <div className="guarantee-container">
        <p className="guarantee-tag">OUR COMMITMENT</p>

        <h2 className="guarantee-title">
          Guaranteed Quality.
          <span>Unmatched Confidence.</span>
        </h2>

        <div className="guarantee-grid">
          {items.map((item, i) => (
            <div key={i} className="guarantee-card fade-trust">
              <div className="guarantee-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
