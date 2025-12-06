// src/pages/productdetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { basicCollections } from "../data/basiccollections";
import { exclusiveCollections } from "../data/exclusivecollections";
import { pearlCollections } from "../data/pearlcollections";
import { nusantaraCollections } from "../data/nusantaracollections";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "../styles/productdetail.css";

export default function ProductDetail() {
  const { id } = useParams();

  const allProducts = [
    ...basicCollections,
    ...exclusiveCollections,
    ...pearlCollections,
    ...nusantaraCollections,
  ];

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="pd-page">
        <div className="pd-not-found">Produk tidak ditemukan.</div>
      </main>
    );
  }

  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [engraveText, setEngraveText] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const productCode = product.id.toUpperCase().replace(/-/g, " ");

  const openLightbox = (index) => {
    setLbIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLbIndex((lbIndex + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLbIndex((lbIndex - 1 + product.images.length) % product.images.length);
  };

  const related = allProducts
    .filter(
      (p) =>
        p.type === product.type &&
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 3);

  const colorLabel = {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  };

  const specTemplates = {
    ring: [
      { label: "Tipe Perhiasan", value: "Cincin" },
      { label: "Material", value: "18K Premium Alloy Gold Tone" },
      { label: "Finishing", value: "Mirror Polish" },
      { label: "Berat Estimasi", value: "2.1g – 3.4g (bervariasi ukuran)" },
      { label: "Ukuran Ring", dynamic: "size" },
    ],

    bracelet: [
      { label: "Tipe Perhiasan", value: "Gelang" },
      { label: "Material", value: "18K Premium Alloy Gold Tone" },
      { label: "Finishing", value: "Mirror Polish" },
      { label: "Panjang Chain", dynamic: "size" },
      { label: "Jenis Clasp", value: "Secure Fold Clasp" },
    ],

    necklace: [
      { label: "Tipe Perhiasan", value: "Kalung" },
      { label: "Material", value: "18K Premium Alloy Gold Tone" },
      { label: "Panjang Rantai", dynamic: "size" },
      { label: "Finishing", value: "High Gloss Mirror" },
      { label: "Jenis Chain", value: "Fine Link Chain" },
    ],

    earring: [
      { label: "Tipe Perhiasan", value: "Anting" },
      { label: "Material", value: "18K Premium Alloy Gold Tone" },
      { label: "Berat Per Pasang", value: "1.8g – 2.2g" },
      { label: "Jenis Pengait", value: "Secure Lock System" },
      { label: "Finishing", value: "Polished High Gloss" },
    ],

    set: [
      { label: "Tipe Perhiasan", value: "Set" },
      { label: "Isi Set", value: "Gelang + Cincin + Kalung" },
      { label: "Material", value: "18K Premium Alloy Gold Tone" },
      { label: "Finishing", value: "Mirror Polish" },
      { label: "Ukuran", dynamic: "size" },
    ],
  };

  const sizeGuides = {
    ring: {
      title: "Panduan Ukuran Cincin",
      table: [
        ["US 5", "15.7 mm", "49.3 mm"],
        ["US 6", "16.5 mm", "51.8 mm"],
        ["US 7", "17.3 mm", "54.4 mm"],
        ["US 8", "18.1 mm", "57.1 mm"],
        ["US 9", "18.9 mm", "59.7 mm"],
      ],
      headers: ["US Size", "Diameter", "Circumference"],
      description:
        "Gunakan pita ukur untuk mengukur diameter jari. Cocok untuk semua jenis cincin.",
    },

    bracelet: {
      title: "Panduan Ukuran Gelang",
      table: [
        ["13–14 cm", "16 cm", "Classic Fit"],
        ["14–15 cm", "17 cm", "Classic Fit"],
        ["15–16 cm", "18 cm", "Loose Fit"],
      ],
      headers: ["Lingkar Pergelangan", "Ukuran Gelang", "Fit"],
      description:
        "Tambahkan 1–1.5 cm dari lingkar pergelangan untuk kenyamanan ideal.",
    },

    necklace: {
      title: "Panduan Ukuran Kalung",
      table: [
        ["40 cm", "Collarbones"],
        ["45 cm", "Sedikit di bawah collarbone"],
        ["50 cm", "Dekat dada"],
        ["55 cm", "Dibawah dada"],
      ],
      headers: ["Panjang Rantai", "Posisi"],
      description:
        "Pemilihan panjang rantai menentukan tampilan layer & proporsi fashion.",
    },

    earring: {
      title: "Panduan Ukuran Anting",
      table: [
        ["8 mm", "Mini hoop"],
        ["12 mm", "Small hoop"],
        ["18 mm", "Medium hoop"],
        ["30 mm", "Statement hoop"],
      ],
      headers: ["Diameter", "Kategori"],
      description:
        "Anting dinilai dari diameter & panjang drop. Pilih sesuai proporsi wajah.",
    },

    set: {
      title: "Panduan Ukuran Set Perhiasan",
      table: [
        ["Gelang", "16–18 cm"],
        ["Cincin", "US 5–9"],
        ["Kalung", "40–50 cm"],
      ],
      headers: ["Item", "Ukuran"],
      description:
        "Set meliputi beberapa jenis perhiasan, ukuran mengikuti tiap komponennya.",
    },
  };

  const benefits = [
    {
      icon: "fa-solid fa-shield",
      title: "Certified Store",
      sub: "Keaslian & kualitas emas terjamin.",
    },
    {
      icon: "fa-regular fa-gem",
      title: "Lifetime Service",
      sub: "Perawatan pembersihan & pengecekan berkala.",
    },
    {
      icon: "fa-solid fa-truck",
      title: "Free Shipping",
      sub: "Pengiriman asuransi ke seluruh Indonesia.",
    },
  ];

  return (
    <main className="pd-page">
      <Navbar />
      {/* Breadcrumb sederhana */}
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="pd-breadcrumb-cat">{product.category}</span>
        <span>/</span>
        <span className="current">{product.name}</span>
      </div>

      {/* GRID ATAS: GALLERY + INFO */}
      <section className="pd-main-grid">
        {/* LEFT CARD: GALLERY */}
        <div className="pd-left-card">
          <div className="pd-badges-row">
            <span className="pd-badge primary">
              {product.category.toUpperCase()}
            </span>
            <span className="pd-badge subtle">BEST SELLER</span>
          </div>

          <div
            className="pd-main-img-wrap"
            onClick={() =>
              openLightbox(
                product.images.findIndex((img) => img === mainImage) || 0
              )
            }
          >
            <img src={mainImage} alt={product.name} className="pd-main-img" />
            <span className="pd-zoom-icon">
              <i className="fa-solid fa-magnifying-glass" />
            </span>
          </div>

          <div className="pd-thumbs-row">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`pd-thumb ${mainImage === img ? "active" : ""}`}
                onClick={() => {
                  setMainImage(img);
                  openLightbox(index);
                }}
              >
                <img src={img} alt={`${product.name} thumbnail ${index}`} />
              </button>
            ))}
          </div>

          {/* MINI BENEFIT ROW */}
          <div className="pd-benefits-row">
            {benefits.map((b, i) => (
              <div className="pd-benefit-item" key={i}>
                <i className={b.icon} />
                <div>
                  <p className="pd-benefit-title">{b.title}</p>
                  <p className="pd-benefit-sub">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD: INFO */}
        <div className="pd-right-card">
          <h1 className="pd-title">{product.name}</h1>

          <p className="pd-subtitle">
            18K Recycled Gold · Lab Grown Diamond (simulasi copy)
          </p>

          <div className="pd-rating-row">
            <span className="pd-rating-star">
              <i className="fa-solid fa-star" /> 4.9
            </span>
            <span className="pd-dot">•</span>
            <span className="pd-code">Kode {productCode}</span>
          </div>

          <div className="pd-divider"></div>

          <div className="pd-price-box">
            <p className="pd-price">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="pd-price-note">
              Termasuk kotak eksklusif & kartu keaslian.
            </p>
          </div>

          {/* COLOR OPTIONS */}
          {product.colors.length > 0 && (
            <div className="pd-block">
              <p className="pd-label">Pilihan warna emas</p>
              <div className="pd-color-pill-row">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`pd-color-pill ${
                      selectedColor === c ? "active" : ""
                    }`}
                    onClick={() => setSelectedColor(c)}
                  >
                    <span className="pd-color-dot" data-color={c}></span>
                    {colorLabel[c] || c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIZE */}
          {product.sizes.length > 0 && (
            <div className="pd-block">
              <p className="pd-label">Ukuran</p>
              <div className="pd-size-row">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`pd-size-pill ${
                      selectedSize === s ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="pd-size-help">
                Model menggunakan ukuran {product.sizes[0]} (simulasi).
              </p>
            </div>
          )}

          {/* ENGRAVE OPTIONAL */}
          <div className="pd-block">
            <p className="pd-label">Gravir (opsional)</p>
            <input
              maxLength={20}
              className="pd-input"
              placeholder="Tulis inisial / pesan spesial (maks. 20 karakter)"
              value={engraveText}
              onChange={(e) => setEngraveText(e.target.value)}
            />
          </div>

          {/* QUANTITY */}
          <div className="pd-block pd-qty-row">
            <div>
              <p className="pd-label">Jumlah</p>
              <div className="pd-qty">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <p className="pd-stock">
                Stok tersedia: <span>{product.stock ?? "Ready"}</span>
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pd-actions">
            <button
              className="pd-btn-primary"
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    product,
                    selectedSize,
                    selectedColor,
                    quantity,
                  },
                })
              }
            >
              Checkout Sekarang
            </button>

            <a
              href="https://api.whatsapp.com/send?phone=000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="pd-btn-ghost">Pesan via WhatsApp</button>
            </a>
          </div>

          <p className="pd-note">
            Gelang berlian dengan detail halus yang didesain untuk dipakai
            setiap hari — cukup minimalis untuk daily wear, cukup berkilau untuk
            acara spesial.
          </p>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="pd-tabs-card">
        <div className="pd-tabs-nav">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Deskripsi
          </button>
          <button
            className={activeTab === "spec" ? "active" : ""}
            onClick={() => setActiveTab("spec")}
          >
            Detail & Spesifikasi
          </button>
          <button
            className={activeTab === "care" ? "active" : ""}
            onClick={() => setActiveTab("care")}
          >
            Perawatan
          </button>
          <button
            className={activeTab === "shipping" ? "active" : ""}
            onClick={() => setActiveTab("shipping")}
          >
            Pengiriman & Retur
          </button>
        </div>

        <div className="pd-tabs-body">
          {activeTab === "description" && (
            <div className="pd-tab-panel">
              <h3>Desain {product.name}</h3>
              <p>
                Terinspirasi dari permainan cahaya dan bayangan, {product.name}{" "}
                <span></span>dirancang untuk menghadirkan siluet modern dengan
                kilau lembut yang tidak berlebihan. Proporsinya dibuat seimbang
                sehingga nyaman digunakan sehari-hari maupun pada momen spesial.
              </p>
              <ul>
                <li>Ideal sebagai hadiah anniversary atau momen spesial.</li>
                <li>
                  Nyaman dipakai berlapis dengan aksesori lain tanpa terasa
                  berat.
                </li>
                <li>Finishing mirror–polish untuk refleksi cahaya maksimal.</li>
              </ul>
            </div>
          )}

          {activeTab === "spec" && (
            <div className="pd-tab-panel">
              <h3>Detail dan Spesifikasi</h3>
              <ul className="pd-spec-list">
                <li>
                  <span>Material utama</span>
                  <span>Premium plated alloy (simulasi) / 18K tone</span>
                </li>
                <li>
                  <span>Finishing</span>
                  <span>Mirror polish dengan detail halus</span>
                </li>
                <li>
                  <span>Warna</span>
                  <span>{product.colors.join(", ")}</span>
                </li>
                {selectedSize && (
                  <li>
                    <span>Ukuran pilihan</span>
                    <span>{selectedSize}</span>
                  </li>
                )}
              </ul>

              {/* Size guide contoh */}
              {/* SIZE GUIDE — berdasarkan type */}
              {sizeGuides[product.type] && (
                <div className="pd-size-guide">
                  <h4>{sizeGuides[product.type].title}</h4>
                  <p>{sizeGuides[product.type].description}</p>

                  <table>
                    <thead>
                      <tr>
                        {sizeGuides[product.type].headers.map((head, i) => (
                          <th key={i}>{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuides[product.type].table.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "care" && (
            <div className="pd-tab-panel">
              <h3>Perawatan</h3>
              <p>
                Simpan perhiasan pada kotak tertutup dan terpisah dari aksesori
                lain untuk menghindari goresan. Hindari kontak langsung dengan
                parfum, lotion, atau bahan kimia keras.
              </p>
              <ul>
                <li>Bersihkan dengan kain lembut setelah pemakaian.</li>
                <li>Jauhkan dari air laut / kolam renang.</li>
                <li>
                  Untuk pembersihan menyeluruh, gunakan jasa cleaning
                  profesional.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="pd-tab-panel">
              <h3>Pengiriman & Retur</h3>
              <ul>
                <li>
                  Gratis ongkir ke seluruh Indonesia (syarat & ketentuan).
                </li>
                <li>Pengiriman diasuransikan dengan packing aman.</li>
                <li>
                  Retur hanya berlaku untuk produk yang belum digunakan dan
                  diseal, dalam jangka waktu tertentu.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="pd-related">
          <h2>Dipadukan dengan</h2>
          <div className="pd-related-grid">
            {related.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="pd-related-card"
              >
                <div className="pd-related-img-wrap">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="pd-related-body">
                  <p className="pd-related-name">{item.name}</p>
                  <p className="pd-related-price">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="pd-lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lb-close">&times;</button>
          <button className="lb-prev" onClick={prevImage}>
            &#10094;
          </button>
          <img src={product.images[lbIndex]} alt="zoom" className="lb-image" />
          <button className="lb-next" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      )}
      <Footer />
    </main>
  );
}
