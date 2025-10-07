# ShopHub - Modern E-Commerce Frontend

A production-quality React e-commerce single-page application built with Vite, TypeScript, Tailwind CSS, and modern web technologies.

## 🎯 Project Overview

ShopHub is a fully functional e-commerce frontend that emulates the user experience of major marketplaces like Amazon, Flipkart, and Myntra. It features a complete shopping experience with product browsing, cart management, wishlist, checkout flow, and user authentication—all working with localStorage (no backend required).

## ✨ Key Features

### Shopping Experience
- **Product Catalog** - Browse 20+ sample products with filters (category, price, rating) and sorting options
- **Product Detail Pages** - Image galleries, variant selection (color/size), stock management, and detailed specifications
- **Smart Cart** - Persistent shopping cart with quantity controls, stock validation, and automatic price calculations
- **Wishlist** - Save favorite products for later
- **Advanced Search** - Real-time search with query highlighting
- **Checkout Flow** - Complete mock checkout with form validation and order confirmation

### User Features
- **Authentication Simulation** - Sign up/sign in with localStorage-based session management
- **Order History** - View past orders with complete details
- **User Account** - Profile management and quick access to orders/wishlist

### Design & UX
- **Light/Dark Theme** - Seamless theme switching with localStorage persistence
- **Fully Responsive** - Adaptive layouts for mobile, tablet, and desktop
- **Accessible** - WCAG-compliant with keyboard navigation, ARIA labels, and semantic HTML
- **Performance Optimized** - Lazy loading, smooth animations, and optimized images

## 🛠 Tech Stack

- **React 18+** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **React Router v6** - Client-side routing
- **React Context API** - State management
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # Reusable React components
│   ├── ui/          # shadcn/ui components
│   ├── Header.tsx   # Navigation header
│   ├── Footer.tsx   # Site footer
│   └── ProductCard.tsx
├── contexts/        # React Context providers
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── ThemeContext.tsx
│   └── WishlistContext.tsx
├── data/            # Sample product data
│   └── products.json
├── pages/           # Route pages
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Auth.tsx
│   ├── Wishlist.tsx
│   ├── Orders.tsx
│   └── Account.tsx
└── App.tsx          # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_DIRECTORY>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

The project uses a comprehensive design system defined in `src/index.css` and `tailwind.config.ts`:

### Color Tokens
- **Primary** - Deep indigo for trust and professionalism
- **Accent** - Vibrant coral for CTAs and highlights
- **Success/Warning/Destructive** - Semantic colors for feedback
- **Muted** - Subtle grays for secondary content

### Theme Support
Toggle between light and dark modes. Theme preference is saved in localStorage.

### Component Variants
All UI components support multiple variants through the design system:
- Buttons: default, accent, outline, ghost, destructive
- Cards with hover effects
- Gradients for hero sections

## 📦 Sample Data

Product data is stored in `src/data/products.json`. The file contains 20 sample products with:

- Product details (title, price, description)
- Images from Unsplash
- Categories and subcategories
- Ratings and reviews
- Stock information
- Variants (colors, sizes)
- Specifications

### Modifying Sample Data

Edit `src/data/products.json` to:
- Add/remove products
- Change prices and discounts
- Update categories
- Modify product specifications

## 🔐 Authentication

The app uses a simulated authentication system with localStorage:

### How it Works
1. User data is stored in `localStorage` under the key `users`
2. Active session is stored under `user`
3. Sign up creates a new user entry
4. Sign in validates credentials against stored users

### Testing Auth
Create a test account:
- Name: Test User
- Email: test@example.com
- Password: test123

## 🛒 Shopping Cart & Orders

### Cart Management
- Cart state managed via React Context
- Persisted in localStorage
- Automatic stock validation
- Real-time price calculations

### Order Flow
1. Add items to cart
2. Proceed to checkout (requires authentication)
3. Fill shipping information with validation
4. Place order (mock)
5. Order saved to localStorage
6. View in Order History

## 🎯 Features Implementation Details

### Search
Real-time search filters products by:
- Title
- Description
- Category

### Filters
- Category checkbox filters
- Price range slider
- Minimum rating selector
- Sort by: Featured, Price (asc/desc), Rating, Newest

### Product Variants
- Color and size selection
- Stock-aware variant switching
- Out-of-stock variants disabled
- Variant info persisted in cart

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals
- Alt text on all images
- Color contrast compliance (WCAG AA)
- Skip-to-content link

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Features:
- Mobile-first approach
- Hamburger menu on mobile
- Adaptive grid layouts
- Touch-friendly tap targets

## 🧪 Testing

The project structure supports testing with Jest and React Testing Library.

### Running Tests
```bash
npm test
```

### Test Coverage Areas
- Cart operations (add, remove, update quantity)
- Theme toggle
- Product card rendering
- Form validation

## 🔧 Configuration

### Environment Setup
No environment variables required for basic functionality. All features work with localStorage.

### Customization

**Colors**: Edit `src/index.css` color tokens
**Fonts**: Modify `tailwind.config.ts` fontFamily
**Breakpoints**: Adjust in `tailwind.config.ts`

## 🚀 Deployment

### Deploy on Lovable
Click the "Publish" button in the Lovable editor.

### Deploy Elsewhere
The built files in `dist/` can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🔮 Future Enhancements

Potential additions (not currently implemented):
- Connect to real backend API
- Payment gateway integration
- Product reviews and ratings system
- Product comparison feature
- Live chat support
- Email notifications
- PWA capabilities
- Multi-language support

## 📝 API Integration Guide

To connect this frontend to a real backend:

1. Create an `src/services/api.ts` file
2. Replace localStorage calls in contexts with API calls
3. Update auth flow to use JWT tokens
4. Modify cart/wishlist to sync with server
5. Update order submission to POST to backend

Example API service structure:
```typescript
// src/services/api.ts
const API_BASE = 'https://your-api.com';

export const api = {
  products: {
    getAll: () => fetch(`${API_BASE}/products`),
    getById: (id: string) => fetch(`${API_BASE}/products/${id}`),
  },
  auth: {
    login: (email: string, password: string) => 
      fetch(`${API_BASE}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) }),
  },
  // ... more endpoints
};
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ using React, Vite, and Tailwind CSS
