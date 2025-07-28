import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Heart, Share2 } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const bannerProducts = products.slice(0, 4);
  const { dispatch, state } = useApp();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#e8dac3] pt-5">
        <div className="max-w-7xl mx-4 pt-10 relative rounded-t-lg  bg-gradient-to-b from-[#867f74] to-[#8c8579]">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="rounded-lg"
          >
            {bannerProducts.map((product, idx) => {
              const isInWishlist = state.wishlist.some(item => item.id === product.id);

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
                  navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
                  alert('Product link copied to clipboard!');
                }
              };

              return (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-100 h-80 rounded-lg"
                    />
                    <div className="flex flex-col items-start">
                      <div className="border-l-2 border-[#caa062] pl-4">
                        <p className="font-maharlika font-semibold text-lg text-white">
                          {product.name}
                        </p>
                      </div>
                      <span className="text-[#caa062] font-montserrat mt-2">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                        <button
                          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product } })}
                          disabled={!product.inStock}
                          className="px-6 py-3 bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors rounded-full font-Montserrat font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add to Cart
                        </button>

                        <button
                          onClick={toggleWishlist}
                          className="p-2 bg-transparent transition-colors"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              isInWishlist ? 'text-red-500 fill-current' : 'text-[#b08c57]'
                            }`}
                          />
                        </button>

                        <button
                          onClick={shareProduct}
                          className="p-2 bg-transparent hover:text-[#e8dac3] transition-colors"
                        >
                          <Share2 className="h-5 w-5 text-[#b08c57]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button className="swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 text-[#b08c57] w-8 h-8 flex items-center justify-center"></button>
          <button className="swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 text-[#b08c57] w-8 h-8 flex items-center justify-center"></button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#e8dac3]">
        <div className="max-w-7xl mx-4 bg-gradient-to-b from-[#8c8579] to-[#e8dac3] pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-7">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
                        
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">Easy 2-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#e8dac3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-[#2e2e2e] mb-4">Featured Products</h2>
            <p className="text-black max-w-2xl mx-auto">
              Discover our handpicked selection of premium products designed to elevate your Home
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center font-montserrat bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] px-6 py-3 rounded-lg hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors font-medium"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        <hr className='mt-20 border-t-1 border-gray-500 w-3/4 mx-auto'></hr>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#e8dac3] text-[#2e2e2e] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-playfair mb-4">Stay Updated</h2>
          <p className="text-black mb-8 max-w-2xl mx-auto font-montserrat">
            Subscribe to our newsletter and be the first to know about new handicrafts, exclusive collections, and artisan stories
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 bg-[#f1e8da] focus:ring-[#b08c57] focus:outline-none"
            />
            <button className="bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}