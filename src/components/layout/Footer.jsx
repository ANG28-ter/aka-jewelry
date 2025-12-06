import "../../styles/footer.css";
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* MAIN */}
      <div className="footer-main">
        {/* BRAND */}
        <div className="footer-col brand">
          <h2 className="footer-logo">
            JEWEL<span>RY</span>
          </h2>
          <p className="footer-tagline">
            Crafted to frame the light on your skin — everyday luxury with a
            timeless silhouette.
          </p>

          <div className="footer-socials">
            <a href="#">
              <FiInstagram className="soc" />
            </a>
            <a href="#">
              <FiFacebook className="soc" />
            </a>
            <a href="#">
              <FiYoutube className="soc" />
            </a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="footer-col">
          <h4>Collections</h4>
          <Link to="/Basic">Basic</Link>
          <Link to="/Exclusive">Exclusive</Link>
          <Link to="/Nusantara">Nusantara</Link>
          <Link to="/Pearl">Pearl</Link>
          <Link to="/Collections">All Collections</Link>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Return &amp; Warranty</a>
          <a href="#">Contact Admin</a>
          <a href="mailto:support@jewelry.com">support@jewelry.com</a>
        </div>

        {/* NEWSLETTER / INFO */}
        <div className="footer-col footer-news">
          <h4>Stay in the loop</h4>
          <p>Be the first to know about new drops and limited releases.</p>
          <form
            className="footer-news-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
            />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>© {year} JEWELRY. All rights reserved.</span>
        <span className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </span>
      </div>
    </footer>
  );
}
