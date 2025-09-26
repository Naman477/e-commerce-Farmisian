export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl?: string;
  rating: number;
  reviews: number;
  reviewDetails?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  categories: string[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface CartState {
  cartItems: CartItem[];
  wishlistItems: CartItem[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}