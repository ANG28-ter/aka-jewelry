import "../../styles/wishlist.css";
import { useWishlistStore } from "../../store/WishlistStore";
import { X, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export default function WishlistOverlay({ open, onClose }) {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  if (!open) return null;

  return (
    <div className="wish-backdrop" onClick={onClose}>
      <div className="wish-panel premium" onClick={(e) => e.stopPropagation()}>
        <div className="wish-header">
          <h3>Wishlist</h3>
          <button onClick={onClose} className="wish-close glass-btn">
            <X size={22} />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <p className="wish-empty">Belum ada wishlist.</p>
        ) : (
          <div className="wish-list">
            {wishlist.map((item) => (
              <div key={item.id} className="wish-item luxury">
                <Link
                  to={`/product/${item.id}`}
                  className="wish-click-area"
                  onClick={(e) => e.stopPropagation()} // biar tidak menutup panel
                >
                  <div className="wish-img-wrap">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="wish-img"
                    />
                  </div>

                  <div className="wish-info">
                    <h4>{item.name}</h4>
                    <p className="wish-price">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>

                <button
                  className="wish-remove-icon"
                  onClick={() => toggleWishlist(item)}
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
