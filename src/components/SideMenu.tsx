import React from 'react';
import { X, Home, Package, HelpCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SideMenu() {
  const { state, dispatch } = useApp();
  const { isMenuOpen } = state;

  if (!state.isMenuOpen) return null;

  const menuItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/faq', icon: HelpCircle, label: 'FAQ' },
    { to: '/shipping', icon: Truck, label: 'Shipping & Returns' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} 
        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
      />
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#2e2e2e] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex">
              <span className="ml-2 font-bold text-[#b08c57] text-lg font-maharlika">Brahma Handicrafts</span>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#e8dac3]" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#e8dac3] font-montserrat hover:border hover:border-[#b08c57] hover:text-white transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}