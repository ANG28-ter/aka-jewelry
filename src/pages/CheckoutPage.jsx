import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { paymentIcons } from "../utils/paymentIcons";
import "../styles/checkout.css";
import { countryCodes } from "../utils/countryCodes";
import { ChevronDown } from "lucide-react";
import { flagIcons } from "../utils/flagIcons";

export default function CheckoutPage() {
  // DETECT NEGARA DEFAULT DARI BROWSER
  const getDefaultCountry = () => {
    if (typeof window === "undefined") return countryCodes[0];

    const lang = navigator.language || "en-US"; // contoh: "id-ID"
    const region = lang.split("-")[1]; // "ID"

    const found = countryCodes.find((c) => c.code === region);
    return found || countryCodes[0]; // fallback Indonesia
  };

  const defaultCountry = getDefaultCountry();

  const [country, setCountry] = useState(defaultCountry.code);
  const [dial, setDial] = useState(defaultCountry.dial);
  const [phoneLocal, setPhoneLocal] = useState(""); // digits only
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const { state } = useLocation();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const [loading, setLoading] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");

  const [openCategory, setOpenCategory] = useState("bank");

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [orderResult, setOrderResult] = useState(null);

  // Redirect if no product
  if (!state) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <p>Tidak ada produk untuk checkout.</p>
        </div>
      </main>
    );
  }

  const { product, selectedSize, selectedColor, quantity } = state;

  /* ===========================================================
     LOAD PAYMENT METHODS
  =========================================================== */
  useEffect(() => {
    fetch("http://localhost:4000/api/payment-methods")
      .then((res) => res.json())
      .then(setPaymentMethods)
      .catch((err) => console.error("Error payment methods:", err));
  }, []);

  /* ===========================================================
     PAYMENT GROUPING
  =========================================================== */
  const groupedPayments = {
    bank: paymentMethods.filter((m) => m.category === "bank"),
    qris: paymentMethods.filter((m) => m.category === "qris"),
    ewallet: paymentMethods.filter((m) => m.category === "ewallet"),
    card: paymentMethods.filter((m) => m.category === "card"),
    paypal: paymentMethods.filter((m) => m.category === "paypal"),
    crypto: paymentMethods.filter((m) => m.category === "crypto"),
  };

  /* ===========================================================
     HANDLERS
  =========================================================== */
  const toggleCategory = (cat) => {
    setOpenCategory((prev) => (prev === cat ? null : cat));
  };

  const handleCheckout = async () => {
    if (!selectedPaymentId) {
      alert("Pilih metode pembayaran.");
      return;
    }

    if (!email || !name || !phone || !address || !postal) {
      alert("Lengkapi semua data pengiriman.");
      return;
    }

    setLoading(true);
    setOrderResult(null);

    try {
      const res = await fetch("http://localhost:4000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { email },
          shipping: {
            name,
            phone,
            address,
            city: selectedCity,
            province: selectedProvince,
            postal,
          },
          items: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity,
              size: selectedSize,
              color: selectedColor,
            },
          ],
          paymentMethodId: selectedPaymentId,
        }),
      });
      const finalPhone = dial + phoneLocal;
      const data = await res.json();
      if (!res.ok) alert(data.message || "Checkout gagal.");
      else setOrderResult(data);
    } catch {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  // Format sederhana: 4-4-... (biar kebaca enak)
  const formatLocalNumber = (digits) => {
    if (!digits) return "";
    const clean = digits.replace(/\D/g, "");
    if (clean.length <= 4) return clean;
    if (clean.length <= 8) return clean.slice(0, 4) + " " + clean.slice(4);
    return clean.slice(0, 4) + " " + clean.slice(4, 8) + " " + clean.slice(8);
  };

  const handlePhoneChange = (e) => {
    let v = e.target.value.replace(/\D/g, ""); // buang non-digit

    // kalau user ngetik 0 di depan → buang 0 itu
    // jadi 0812 → disimpan "812" → final: +62 812...
    if (v.startsWith("0")) v = v.slice(1);

    setPhoneLocal(v);
  };

  const handleCountrySelect = (code) => {
    const selected = countryCodes.find((c) => c.code === code);
    setCountry(selected.code);
    setDial(selected.dial);
    setIsCountryOpen(false);
  };

  /* ===========================================================
     PAYMENT COMPONENT
  =========================================================== */
  const PaymentGroup = ({ id, label, items }) => {
    if (items.length === 0) return null;
    const isOpen = openCategory === id;

    return (
      <div className="co-pay-group">
        <div className="co-pay-header" onClick={() => toggleCategory(id)}>
          <div className={`co-dot ${isOpen ? "active" : ""}`} />
          <h3 className="co-pay-group-title">{label}</h3>
          <ChevronDown
            size={18}
            className={`co-arrow ${isOpen ? "open" : ""}`}
          />
        </div>

        <div
          className="co-pay-content"
          style={{ maxHeight: isOpen ? items.length * 72 + "px" : "0px" }}
        >
          {items.map((pm) => (
            <button
              key={pm.id}
              className={`co-pay-option ${
                selectedPaymentId === pm.id ? "selected" : ""
              }`}
              onClick={() => setSelectedPaymentId(pm.id)}
            >
              <div className="co-pay-icon-wrap">
                <img src={paymentIcons[pm.id]} alt={pm.label} />
              </div>
              <span>{pm.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  /* ===========================================================
     TOTAL
  =========================================================== */
  const subtotal = product.price * quantity;
  const shippingCost = 15000;
  const total = subtotal + shippingCost;

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* ================= LEFT ================= */}
        <div className="checkout-left">
          <h1 className="checkout-title">Checkout</h1>

          {/* CONTACT */}
          <div className="co-card">
            <h2 className="co-section-title">Kontak</h2>
            <input
              className="co-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* SHIPPING */}
          <div className="co-card">
            <h2 className="co-section-title">Alamat Pengiriman</h2>

            <input
              className="co-input"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div
              className={`co-phone-field ${
                isCountryOpen ? "active" : phoneLocal ? "active" : ""
              }`}
            >
              {/* BUTTON NEGARA */}
              <button
                type="button"
                className="co-phone-country"
                onClick={() => setIsCountryOpen((prev) => !prev)}
              >
                <span className="co-flag">
                  <img src={flagIcons[country]} className="co-flag-svg" />
                </span>

                <span className="co-dial">{dial}</span>
                <ChevronDown
                  className={`co-dd-icon ${isCountryOpen ? "open" : ""}`}
                  size={16}
                />
              </button>

              {/* INPUT NOMOR */}
              <input
                type="tel"
                className="co-phone-input"
                onFocus={() => {
                  setPhoneFocused(true);
                  setIsCountryOpen(false);
                }}
                onBlur={() => setPhoneFocused(false)}
              />

              {/* DROPDOWN NEGARA */}
              {isCountryOpen && (
                <div className="co-country-dropdown">
                  {countryCodes.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className="co-country-item"
                      onClick={() => handleCountrySelect(c.code)}
                    >
                      <img src={flagIcons[c.code]} className="co-flag-svg" />
                      <span className="co-country-name">{c.name}</span>
                      <span className="co-country-dial">{c.dial}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              className="co-input"
              placeholder="Alamat Lengkap"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="co-grid-3">
              <input
                className="co-input"
                placeholder="Provinsi"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              />
              <input
                className="co-input"
                placeholder="Kota"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
              <input
                className="co-input"
                placeholder="Kode Pos"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="co-card">
            <h2 className="co-section-title">Metode Pembayaran</h2>

            <PaymentGroup
              id="bank"
              label="Bank Transfer"
              items={groupedPayments.bank}
            />
            <PaymentGroup id="qris" label="QRIS" items={groupedPayments.qris} />
            <PaymentGroup
              id="ewallet"
              label="E-Wallet"
              items={groupedPayments.ewallet}
            />
            <PaymentGroup
              id="card"
              label="Kartu Kredit / Debit"
              items={groupedPayments.card}
            />
            <PaymentGroup
              id="paypal"
              label="PayPal"
              items={groupedPayments.paypal}
            />
            <PaymentGroup
              id="crypto"
              label="Cryptocurrency"
              items={groupedPayments.crypto}
            />
          </div>

          <button className="co-submit" onClick={handleCheckout}>
            {loading ? "Memproses..." : "Bayar Sekarang"}
          </button>
          <p className="co-legal-text">
            Your information will be saved to a Shop account. By continuing, you
            agree to <span></span>
            <a href="#" className="co-legal-link">
              Shop’s Terms of Service
            </a>{" "}
            and acknowledge the <span></span>
            <a href="#" className="co-legal-link">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="checkout-right">
          <div className="co-summary-card">
            <h2 className="co-section-title">Ringkasan Pesanan</h2>

            <div className="co-product">
              <img src={product.images[0]} className="co-product-img" />

              <div className="co-product-info">
                <p className="co-product-name">{product.name}</p>
                <p className="co-product-sub">
                  {selectedColor} • {selectedSize}
                </p>
                <p className="co-product-qty">Jumlah: {quantity}</p>
              </div>

              <div className="co-product-price">
                Rp {product.price.toLocaleString("id-ID")}
              </div>
            </div>

            <div className="co-line">
              <span>Subtotal</span>
              <span>
                Rp {(product.price * quantity).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="co-line">
              <span>Pengiriman</span>
              <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
            </div>

            <div className="co-total">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
