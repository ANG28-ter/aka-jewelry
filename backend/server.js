// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ========== PAYMENT METHODS DATA ==========
// Sesuaikan path icon dengan struktur asset lu.
const paymentMethods = [
  // INDONESIA - BANK TRANSFER
  {
    id: "bca_va",
    label: "BCA Virtual Account",
    category: "bank",
    provider: "BCA",
  },
  {
    id: "mandiri_va",
    label: "Mandiri Virtual Account",
    category: "bank",
    provider: "Mandiri",
  },
  {
    id: "bni_va",
    label: "BNI Virtual Account",
    category: "bank",
    provider: "BNI",
  },
  {
    id: "bri_va",
    label: "BRI Virtual Account",
    category: "bank",
    provider: "BRI",
  },

  // INDONESIA - QRIS
  {
    id: "qris_universal",
    label: "QRIS Universal",
    category: "qris",
    provider: "QRIS",
  },

  // INDONESIA - E-WALLET
  {
    id: "gopay",
    label: "GoPay",
    category: "ewallet",
    provider: "GoPay",
  },
  {
    id: "dana",
    label: "DANA",
    category: "ewallet",
    provider: "DANA",
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    category: "ewallet",
    provider: "ShopeePay",
  },

  // INTERNASIONAL - CARD
  {
    id: "card_visa",
    label: "Visa / Mastercard / AMEX",
    category: "card",
    provider: "Card",
  },

  // INTERNASIONAL - PAYPAL
  {
    id: "paypal",
    label: "PayPal",
    category: "paypal",
    provider: "PayPal",
  },

  // INTERNASIONAL - CRYPTO
  {
    id: "crypto_btc",
    label: "Bitcoin (BTC)",
    category: "crypto",
    provider: "Bitcoin",
  },
  {
    id: "crypto_eth",
    label: "Ethereum (ETH)",
    category: "crypto",
    provider: "Ethereum",
  },
  {
    id: "crypto_usdt",
    label: "USDT (TRC20/ERC20)",
    category: "crypto",
    provider: "USDT",
  },
];

// GET payment methods
app.get("/api/payment-methods", (req, res) => {
  res.json(paymentMethods);
});

// POST checkout
app.post("/api/checkout", (req, res) => {
  const { contact, shipping, items, paymentMethodId } = req.body;

  if (
    !contact?.email ||
    !shipping?.name ||
    !paymentMethodId ||
    !items?.length
  ) {
    return res.status(400).json({ message: "Data checkout tidak lengkap." });
  }

  // Hitung total sederhana
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // simulasi ongkir flat
  const shippingCost = 15000;
  const total = subtotal + shippingCost;

  // simulasi ID order
  const orderId = "ORD-" + Date.now();

  // Di dunia nyata: simpan ke database + hubungkan ke Midtrans / Xendit / dll
  return res.json({
    orderId,
    subtotal,
    shippingCost,
    total,
    paymentMethodId,
    paymentInstructions:
      "Pesanan berhasil dibuat. Lanjutkan pembayaran sesuai instruksi metode yang dipilih.",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
