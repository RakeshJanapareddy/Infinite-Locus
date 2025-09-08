import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/products")}
          className="btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-description">{product.description}</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <span style={{ fontWeight: "600" }}>Category:</span>
            <span
              style={{
                background: "#ff6b35",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.9rem",
              }}
            >
              {product.category}
            </span>
          </div>

          {product.rating && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <span style={{ fontWeight: "600" }}>Rating:</span>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        i < Math.floor(product.rating.rate)
                          ? "#ffc107"
                          : "#ddd",
                      fontSize: "1.2rem",
                    }}
                  ></span>
                ))}
              </div>
              <span style={{ color: "#666" }}>
                ({product.rating.rate}/5 - {product.rating.count} reviews)
              </span>
            </div>
          )}

          <div className="quantity-selector">
            <span style={{ fontWeight: "600" }}>Quantity:</span>
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="quantity-btn"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value) || 1)
              }
              className="quantity-input"
              min="1"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="quantity-btn"
            >
              +
            </button>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              View Cart
            </button>
          </div>

          <div
            style={{
              background: "#f8f9fa",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Delivery Information
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                Free delivery on orders over $25
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Estimated delivery: 30-45 minutes
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Easy returns within 24 hours
              </li>
              <li>Secure payment processing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
