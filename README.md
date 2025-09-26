# Farmisian - Modern E-Commerce Platform

![Farmisian Banner](assets/images/farmisian-banner.jpg)

Farmisian is a modern, responsive e-commerce platform built with React, Node.js, and MongoDB. It offers a seamless shopping experience with interactive product images, special offers, and a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Seeding](#database-seeding)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🛍️ **Product Catalog**: Browse and search through a wide range of farm products
- 🖼️ **Interactive Images**: Hover effects, zoom functionality, and lightbox galleries
- 🎯 **Special Offers**: Dedicated offers page with discount displays
- 📱 **Responsive Design**: Fully responsive layout for all device sizes
- 🔍 **Product Search**: Advanced search and filtering capabilities
- ❤️ **Wishlist**: Save favorite products for later
- 🛒 **Shopping Cart**: Add and manage products in your cart
- 📦 **Product Details**: Comprehensive product information with reviews
- 🎨 **Modern UI**: Clean, attractive interface with smooth animations
- 🚀 **Performance Optimized**: Lazy loading images and efficient data fetching

## Tech Stack

### Frontend
- **React** (v18.2.0) - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Redux** - State management
- **React Router** - Declarative routing
- **Framer Motion** - Animation library
- **Swiper.js** - Modern touch slider
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image management
- **Stripe** - Payment processing

## Screenshots

### Homepage with Offer Slider
![Homepage](assets/images/homepage.png)

### Product Listing
![Product Listing](assets/images/product-listing.png)

### Product Detail with Image Zoom
![Product Detail](assets/images/product-detail.png)

### Special Offers Page
![Offers Page](assets/images/offers-page.png)

### Wishlist with Interactive Images
![Wishlist](assets/images/wishlist.png)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Naman477/e-commerce-Farmisian.git
cd e-commerce-Farmisian
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `Farmisian`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/Farmisian

# Server Port
PORT=5000

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Running the Application

### Development Mode

1. Start MongoDB (if using local installation):
```bash
mongod
```

2. Start the backend server:
```bash
npm run dev:server
```

3. Start the frontend development server:
```bash
npm run dev:client
```

### Production Mode

1. Build the React application:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Project Structure

```
farmisian-modern/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Entry point
│   └── package.json        # Frontend dependencies
├── controllers/            # Request handlers
├── models/                 # Database models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── config/                 # Configuration files
├── data/                   # Seed data
├── public/                 # Public assets
├── .env                    # Environment variables
├── server.js               # Entry point
└── package.json            # Backend dependencies
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Database Seeding

To populate the database with sample data:

1. Make sure MongoDB is running
2. Run the seed script:
```bash
node seed.js
```

This will create:
- Sample products with images
- Dummy user accounts
- Categories and reviews

## Deployment

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or cloud)
- Hosting platform (Heroku, Vercel, Netlify, etc.)

### Steps

1. Build the frontend:
```bash
cd client
npm run build
cd ..
```

2. Set environment variables on your hosting platform

3. Deploy the entire project to your hosting platform

### Heroku Deployment

1. Create a new Heroku app
2. Connect your GitHub repository
3. Set environment variables in Heroku dashboard
4. Add MongoDB addon or use MongoDB Atlas
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/Naman477/e-commerce-Farmisian](https://github.com/Naman477/e-commerce-Farmisian)

---

Made with ❤️ by the Farmisian Team