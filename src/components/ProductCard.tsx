import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const shareProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `/product/${product.id}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-[#2e2e2e] text-white rounded-t-[135px] rounded-b-xl overflow-hidden text-center pb-4 hover:shadow-lg transition-shadow duration-300">
        <div className="relative rounded-t-[120px] mt-4 mx-5 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover h-[200px] w-full group-hover:scale-105 transition-transform duration-300"
          />
                    
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white font-playfair mb-1 group-hover:text-[#b08c57] transition-colors">
            {product.name}
          </h3>
          <p className="text-white-900 font-montserrat text-sm mb-2 line-clamp-2">{product.description}</p>
                      
          <div className="flex flex-col items-center justify-between">
            <div className="flex items-center space-x-2 font-montserrat">
              <span className="text-lg font-bold text-green-300">₹ {product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-red-300 line-through">
                  ₹ {product.originalPrice}
                </span>
              )}
            </div>
            
            <div className=''>
              <div className="flex flex-row space-y-3 gap-4 justify-between items-center">
                <button
                  onClick={shareProduct}
                  className="p-1 bg-transparent hover:text-[#e8dac3] transition-colors"
                >
                  <Share2 className="h-5 w-5 text-[#b08c57]" />
                </button>
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium"
                >
                  Add To Cart 
                </button>
                <button
                  onClick={toggleWishlist}
                  className="p-2 bg-transparent transition-colors"
                >
                  <Heart
                    className={`h-5 w-5  ${
                      isInWishlist ? 'text-red-500 fill-current' : 'text-[#b08c57]'
                    } `}
                  />
                </button>
              </div>  
            </div>

            
          </div>
        </div>
      </div>
    </Link>
  );
}