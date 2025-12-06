import { Routes, Route } from "react-router-dom";

// ==== Pages ====
import Home from "./pages/Home";
import Basic from "./pages/Basic";
import Exclusive from "./pages/Exclusive";
import Nusantara from "./pages/Nusantara";
import Pearl from "./pages/Pearl";
import Collections from "./pages/Collections";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import BookAppointment from "./pages/BookAppointment";
export default function App() {
  return (
    <Routes>
      {/* PAGE UTAMA */}
      <Route path="/" element={<Home />} />

      {/* CATEGORY PAGES */}
      <Route path="/Basic" element={<Basic />} />
      <Route path="/Exclusive" element={<Exclusive />} />
      <Route path="/Nusantara" element={<Nusantara />} />
      <Route path="/Pearl" element={<Pearl />} />
      <Route path="/Collections" element={<Collections />} />

      {/* PRODUCT DETAIL */}
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* CHECKOUT PAGE */}
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* BOOK */}
      <Route path="/book" element={<BookAppointment/>} />
    </Routes>
  );
}
