import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#e8dac3] ">
      <div className="max-w-7xl mx-3 mt-10 bg-[#f1e8da] text-[#2b2a29] py-10 px-6 rounded-t-2xl border border-white ">
        {/* Top section */}
        <div className='flex flex-col md:flex-row justify-between gap-10 mb-8'>
          <div className="space-y-2 ml-3">
            {/* Left side links */}                                                                                               
            <Link to="/">
              <p className="text-base font-montserrat hover:text-white cursor-pointer transition-colors">Home</p>
            </Link>
            <Link to="/about-us">
              <p className="text-base font-montserrat hover:text-white cursor-pointer transition-colors">About Us</p>
            </Link>
            <Link to="/products">
              <p className="text-base font-montserrat hover:text-white cursor-pointer transition-colors">Products</p>
            </Link>
            <Link to="/shipping">
              <p className="text-base font-montserrat cursor-pointer hover:text-white transition-colors">Shipping & Return</p>
            </Link>
            <Link to="/faq">
              <p className="text-base font-montserrat hover:text-white cursor-pointer transition-colors">FAQ</p>
            </Link>
          </div>

            {/* Right Section */}
          <div className="space-y-2">
            <p className="text-lg font-montserrat font-semibold mb-4">Contact US</p>
            <div className='flex items-center'>
              <Mail className="h-5 w-5 mr-2 text-gray-400" />
              <span className="text-base font-montserrat cursor-pointer hover:text-white transition-colors">
                <a href="mailto:brahmahandicraft@gmail.com">        
                  brahmahandicraft@gmail.com
                </a>
              </span>
            </div>
              
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>  
        </div>
         
        {/* Lower Section */}
        <div className="pt-4 text-left">
          <p className="font-serif text-[#a8875c] text-2xl">Brahma Handicrafts</p>
        </div>
      </div>
    </footer>
  );
}