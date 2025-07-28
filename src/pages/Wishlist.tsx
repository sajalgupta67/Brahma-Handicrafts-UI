import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Wishlist() {
  const { state, dispatch } = useApp();

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  return (
    <div className="min-h-screen bg-[#e8dac3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Heart className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold font-montserrat text-gray-900">
            My Wishlist ({state.wishlist.length})
          </h1>
        </div>

        {state.wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-24 w-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding items to your wishlist by clicking the heart icon on products you love
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.wishlist.map((product) => (
              <div key={product.id} className="bg-[#2e2e2e] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-white font-playfair mb-2 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold font-montserrat text-green-300">₹ {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹ {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1 bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium flex items-center justify-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 text-red-600 rounded-lg hover:text-red-200 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}