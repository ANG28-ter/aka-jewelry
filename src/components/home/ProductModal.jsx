import { useEffect, useState } from "react";
import "../../styles/modal.css";

export default function ProductModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length ? product.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length ? product.colors[0] : ""
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // prevent modal click from closing when clicking inside content
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={stopPropagation}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-body">
          <div className="modal-left">
            <div className="main-image">
              <img
                src={product.images[activeImg]}
                alt={`${product.name} - ${activeImg}`}
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="thumbs">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    className={`thumb ${i === activeImg ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt={`${product.name}-thumb-${i}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-right">
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-price">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="field">
                <label>Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="field">
                <label>Color</label>
                <div className="color-pills">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`color-pill ${
                        selectedColor === c ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor(c)}
                      aria-label={`color-${c}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="modal-desc">{product.description || ""}</p>

            <div className="modal-actions">
              <button
                className="btn primary"
                onClick={() => {
                  // placeholder: nanti hubungkan add-to-cart
                  alert(
                    `Add to cart: ${product.name} — ${selectedSize} / ${selectedColor}`
                  );
                }}
              >
                Add to cart
              </button>

              <button
                className="btn outline"
                onClick={() => {
                  // placeholder: nanti hubungkan wishlist hook
                  alert(`Added to wishlist: ${product.name}`);
                }}
              >
                ♥ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
