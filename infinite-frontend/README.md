# FoodieHub - Food Delivery App

A modern React-based food delivery application with a clean, responsive design inspired by popular food delivery platforms.

## Features

- **Landing Page**: Hero section with featured products and call-to-action
- **Product Listing**: Grid view with search and category filtering
- **Product Details**: Detailed product view with quantity selection and add to cart
- **Shopping Cart**: Full cart functionality with add/remove items and quantity management
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Context API** - State management for cart
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with flexbox and grid
- **Fake Store API** - Product data source

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd food-delivery-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.js       # Navigation header
├── context/            # React Context for state management
│   └── CartContext.js  # Cart state and actions
├── pages/              # Page components
│   ├── HomePage.js     # Landing page
│   ├── ProductsPage.js # Product listing page
│   ├── ProductDetailPage.js # Product detail page
│   └── CartPage.js     # Shopping cart page
├── services/           # API services
│   └── api.js          # Fake Store API integration
├── App.js              # Main app component with routing
├── App.css             # Main styles
├── index.js            # App entry point
└── index.css           # Global styles
```

## Features Overview

### Landing Page
- Hero section with compelling call-to-action
- Featured products showcase
- Service highlights (fast delivery, fresh food, easy payment)

### Product Listing
- Grid layout with product cards
- Search functionality
- Category filtering
- Responsive design

### Product Details
- Large product image
- Detailed product information
- Quantity selector
- Add to cart functionality
- Delivery information

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Order summary with totals
- Free delivery threshold indicator

## API Integration

The app uses the Fake Store API (https://fakestoreapi.com) for product data. The API service transforms the data to match a food delivery context:

- Electronics → Beverages
- Jewelry → Desserts
- Men's Clothing → Main Course
- Women's Clothing → Appetizers

## Styling

The app uses modern CSS with:
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- Responsive design principles
- Smooth transitions and hover effects
- Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Demo

The app includes a complete food delivery experience with:
- Browse products by category
- Search for specific items
- View detailed product information
- Add items to cart with quantity selection
- Manage cart items (add/remove/update quantities)
- View order summary with pricing

Perfect for demonstrating modern React development practices and responsive web design!
