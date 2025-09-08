import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const transformProduct = (product) => {
  const clothCategories = {
    "electronics": "Beverages",
    "jewelery": "Desserts", 
    "men's clothing": "Main Course",
    "women's clothing": "Appetizers"
  };

  return {
    id: product.id,
    title: product.title,
    price: Math.round(product.price * 1.5), 
    description: product.description,
    category: clothCategories[product.category] || "Main Course",
    image: product.image,
    rating: product.rating
  };
};

export const fetchProducts = async (limit = 20) => {
  try {
    const response = await api.get('/products', {
      params: { limit }
    });
    return response.data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return transformProduct(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    const clothCategories = {
      "electronics": "Beverages",
      "jewelery": "Desserts", 
      "men's clothing": "Main Course",
      "women's clothing": "Appetizers"
    };
    return response.data.map(cat => clothCategories[cat] || cat);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ["Main Course", "Appetizers", "Desserts", "Beverages"];
  }
};
