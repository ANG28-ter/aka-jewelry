import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, User, Search } from "lucide-react";
import { useWishlistStore } from "../../store/WishlistStore";
import WishlistOverlay from "./WishlistOverlay";
import "../../styles/navbar.css";
import { allProducts } from "../../data/allProducts";

export default function Navbar() {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const [openMenu, setOpenMenu] = useState(false);
  const [openWish, setOpenWish] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);

  // scroll detection
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currY = window.scrollY;
      setHidden(currY > lastY && currY > 50);
      lastY = currY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // badge animation
  useEffect(() => {
    if (wishlist.length > 0) {
      setBadgeAnimate(true);
      setTimeout(() => setBadgeAnimate(false), 600);
    }
  }, [wishlist.length]);

  const results = allProducts.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.collection?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <header
        id="navbar"
        className={`${hidden ? "hide" : ""} ${openMenu ? "active" : ""}`}
      >
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/icons/logo/logo1.png" alt="brand luxury" />
          </Link>
        </div>

        <ul className={`nav-links ${openMenu ? "show" : ""}`}>
          <li>
            <Link to="/Collections">Our Collections</Link>
          </li>
          <li>
            <Link to="/About">About Us</Link>
          </li>
          <li>
            <Link to="/Contact">Contact Us</Link>
          </li>
        </ul>

        <div className="icon-area">
          {/* SEARCH WRAPPER */}
          <div className="search-wrapper">
            <button
              className="search-btn"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} strokeWidth={1.7} />
            </button>

            {showSearch && !openMenu && (
              <div
                className={`nav-search-bar ${isMobile ? "mobile-slide" : ""}`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {/* SEARCH RESULT DROPDOWN */}
            {showSearch && query.trim() !== "" && (
              <div className="search-dropdown">
                {results.length === 0 ? (
                  <p className="no-results">No results found.</p>
                ) : (
                  results.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="search-item"
                      onClick={() => {
                        setShowSearch(false);
                        setQuery("");
                      }}
                    >
                      <img src={item.images[0]} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>Rp {item.price.toLocaleString("id-ID")}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <button>
            <User size={20} strokeWidth={1.7} />
          </button>

          <button className="love-icon" onClick={() => setOpenWish(true)}>
            <Heart size={20} strokeWidth={1.7} />

            {wishlist.length > 0 && (
              <span className={`wish-count ${badgeAnimate ? "ping" : ""}`}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* BURGER MENU */}
          <div
            className={`burger ${openMenu ? "active" : ""}`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <WishlistOverlay open={openWish} onClose={() => setOpenWish(false)} />
    </>
  );
}
