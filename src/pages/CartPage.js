import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>Shopping Cart</h1>
        <button onClick={handleClearCart} className="btn btn-secondary">
          Clear Cart
        </button>
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">${item.price}</p>

              <div className="cart-item-controls">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="quantity-btn"
                    style={{ width: "30px", height: "30px", fontSize: "1rem" }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      minWidth: "30px",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="quantity-btn"
                    style={{ width: "30px", height: "30px", fontSize: "1rem" }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
                minWidth: "100px",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#ff6b35",
                }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Order Summary</h3>

        <div className="total-row">
          <span>
            Subtotal ({items.reduce((total, item) => total + item.quantity, 0)}{" "}
            items):
          </span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

        <div className="total-row">
          <span>Delivery Fee:</span>
          <span>{getTotalPrice() > 25 ? "Free" : "$5.99"}</span>
        </div>

        <div className="total-row">
          <span>Tax:</span>
          <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
        </div>

        <div className="total-final">
          <span>Total:</span>
          <span>
            $
            {(
              getTotalPrice() +
              (getTotalPrice() > 25 ? 0 : 5.99) +
              getTotalPrice() * 0.08
            ).toFixed(2)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Link to="/products" className="btn btn-outline" style={{ flex: 1 }}>
            Continue Shopping
          </Link>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => {
              alert("Proceed");
            }}
          >
            Proceed to Checkout
          </button>
        </div>

        {getTotalPrice() < 25 && (
          <div
            style={{
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              padding: "1rem",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: "#856404" }}>
              Add ${(25 - getTotalPrice()).toFixed(2)} more to get free
              delivery!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
