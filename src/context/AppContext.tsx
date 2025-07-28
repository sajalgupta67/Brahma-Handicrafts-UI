import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, User } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  isAdminAuthenticated: boolean;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isAuthOpen: boolean;
  isDropdownOpen: boolean;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size?: string; color?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ADMIN_AUTH'; payload: boolean }
  | { type: 'TOGGLE_CART' }
  | { type: 'TOGGLE_MENU' }
  | { type: 'TOGGLE_AUTH' }
  | { type: 'TOGGLE_DROPDOWN' }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  isAdminAuthenticated: false,
  isCartOpen: false,
  isMenuOpen: false,
  isAuthOpen: false,
  isDropdownOpen: false
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color } = action.payload;
      const existingItem = state.cart.find(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === product.id && item.size === size && item.color === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { product, quantity: 1, size, color }],
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    
    case 'SET_ADMIN_AUTH':
      return {
        ...state,
        isAdminAuthenticated: action.payload,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        isMenuOpen: false,
      };
    
    case 'TOGGLE_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isCartOpen: false,
      };

    case 'TOGGLE_DROPDOWN':
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
        
      };
    
    case 'TOGGLE_AUTH':
      return {
        ...state,
        isAuthOpen: !state.isAuthOpen,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}