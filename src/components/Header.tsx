import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, User, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import UserDropdown from './UserDropdown';
import { useAuth } from '../../lib/AuthContext';
import AuthModal from './AuthModal'

export default function Header() {
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserIconClick = () => {
    // Only toggle if not already open
    if (!state.isAuthOpen && !state.user) {
      dispatch({ type: 'TOGGLE_AUTH' });
    } else if (state.user) {
      dispatch({ type: 'TOGGLE_DROPDOWN' });
    }

  };

  return (
    <>
      <header className="bg-[#323232] shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Mobile menu button */}
            <button
              className="p-2 rounded-md text-[#fdf8f5] hover:text-black hover:bg-[#4d4c4c] transition-colors mr-4"
              onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Brand Name */}
            <Link to="/" className="flex-1 text-center">
              <span className="text-3xl font-bold font-maharlika text-[#b08c57]">Brahma Handicrafts</span>
            </Link>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Search Bar */}
              <div className="flex items-center">
                <div className={`transition-all duration-300 overflow-hidden ${
                  isSearchExpanded ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#4d4c4c] w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onBlur={() => {
                      setTimeout(() => setIsSearchExpanded(false), 150);
                    }}
                    autoFocus={isSearchExpanded}
                  />
                </div>
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="p-2 text-[#fdf8f5] hover:text-black hover:bg-[#4d4c4c] rounded-lg transition-colors ml-2"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
              
              <button
                onClick={handleUserIconClick}
                className="p-2 text-[#fdf8f5] hover:text-black hover:bg-[#4d4c4c] rounded-lg transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
              
              
              <Link
                to="/wishlist"
                className="p-2 text-[#fdf8f5] hover:text-black hover:bg-[#4d4c4c] rounded-lg transition-colors relative"
              >
                <Heart className="h-6 w-6" />
                {state.wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="p-2 text-[#fdf8f5] hover:text-black hover:bg-[#4d4c4c] rounded-lg transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b08c57] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}