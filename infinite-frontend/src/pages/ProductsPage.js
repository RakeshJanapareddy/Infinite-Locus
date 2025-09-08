import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../services/api";
import strings from "../common/strings";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(["All", ...categoriesData]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder={strings.SearchCloth}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="container" style={{ padding: "2rem 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>
            {selectedCategory === "" || selectedCategory === "All"
              ? "All Products"
              : selectedCategory}
          </h2>
          <p style={{ color: "#666" }}>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h2>{strings.NoProducts}</h2>
            <p>{strings.TryAdjust}</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="btn btn-primary"
            >
              {strings.clearFil}
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
