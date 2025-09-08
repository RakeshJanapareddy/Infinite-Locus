import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          ClothHub
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link">
            <button className="cart-icon">
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
