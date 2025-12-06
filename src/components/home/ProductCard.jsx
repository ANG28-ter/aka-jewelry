import "../../styles/product.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../../store/WishlistStore";
import { useState } from "react";

export default function ProductCard({ product }) {
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWished = useWishlistStore((s) => s.isWished);
  const fav = isWished(product.id);

  const [animating, setAnimating] = useState(false);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);

    setAnimating(true);
    setTimeout(() => setAnimating(false), 450);
  };

  return (
    <div className="product-card">
      {/* Wishlist Icon */}
      <button
        className={`wish-icon ${fav ? "active" : ""} ${
          animating ? "wish-pop" : ""
        }`}
        onClick={handleWishlist}
      >
        <Heart size={18} className="heart-icon" />
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="product-img">
          <img src={product.images[0]} alt={product.name} />
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            laudantium tempora inventore debitis, dignissimos atque!
          </p>
        </div>
      </Link>
    </div>
  );
}
