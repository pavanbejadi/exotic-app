import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuUser,
  LuHeart,
  LuShoppingCart,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "./index.css";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Destructure wishlist from props
  const { searchTerm, setSearchTerm, cartList, wishlist } = props;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-top">
          <Link to="/landing" className="logo-link" onClick={closeMenu}>
            <div className="logo-container">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L4.5 20.29C4.21 21 4.7 21.75 5.43 21.75H18.57C19.3 21.75 19.79 21 19.5 20.29L12 2Z"
                  stroke="#c5a059"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 22V12M12 12C12 12 15 9 18 9M12 12C12 12 9 9 6 9"
                  stroke="#c5a059"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="logo-text">Exotica</span>
            </div>
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <LuX /> : <LuMenu />}
        </div>

        {/* Main Menu (Search + Icons) */}
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="search-wrapper">
            <input
              type="search"
              placeholder="Search for dragon fruit, kale..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          <div className="nav-links-vertical">
            <div className="nav-item-mobile" onClick={closeMenu}>
              <LuUser className="mobile-icon" />
            </div>

            {/* Link to Wishlist Page */}
            <Link
              to="/wishlist"
              className="nav-item-mobile"
              onClick={closeMenu}
            >
              <div className="cart-wrapper">
                <LuHeart className="mobile-icon" />
                {/* Badge for Wishlist items */}
                {wishlist && wishlist.length > 0 && (
                  <span className="badge wishlist-badge">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Link to Cart Page */}
            <Link to="/cart" className="nav-item-mobile" onClick={closeMenu}>
              <div className="cart-wrapper">
                <LuShoppingCart />
                {cartList && cartList.length > 0 && (
                  <span className="badge">
                    {cartList.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              <span className="nav-label">My Cart</span>
            </Link>

            <div
              className="nav-item-mobile logout-mobile"
              onClick={handleSignOut}
            >
              <LuLogOut className="mobile-icon" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
