import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import strings from '../common/strings';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts(6);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>{strings.ClothsOrder}</h1>
          <p>{strings.OrderFromArea}</p>
          <Link to="/products" className="btn btn-primary">
            Order Now
          </Link>
        </div>
      </section>
      <section className="container" style={{ padding: '4rem 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: '700' }}>
         {strings.FeaturedClothes} 
        </h2>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
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
                  <Link 
                    to={`/product/${product.id}`}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </section>
      <section style={{ background: 'white', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Fast Delivery</h3>
              <p style={{ color: '#666' }}>Get your food delivered in 30 minutes or less</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Fresh Food</h3>
              <p style={{ color: '#666' }}>Only the freshest ingredients from local suppliers</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Easy Payment</h3>
              <p style={{ color: '#666' }}>Secure payment options for your convenience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
