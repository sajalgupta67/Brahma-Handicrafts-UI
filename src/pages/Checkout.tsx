import React, { useState } from 'react';
import { CreditCard, Lock, MapPin, User, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalTotal = total 
  const [billingOption, setBillingOption] = useState("same");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    alert('Order placed successfully! Thank you for your purchase.');
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#e8dac3] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 font-montserrat mb-6">Add some items to your cart before checkout</p>
          <a href="/products" className="bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8dac3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold font-montserrat text-[#2e2e2e] mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-bold font-playfair text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          placeholder='Email Address'
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-xl font-bold font-playfair text-gray-900 mb-4 mt-5">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country / Region 
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value= 'India'
                        onChange={handleInputChange}
                        disabled
                        className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name (optional)
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 font-montserrat border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                <h2 className="text-xl font-bold font-playfair mb-2">Billing Address</h2>
                <div className="bg-[#d8c5a8] text-sm rounded mb-4 font-montserrat">
                  <label className="flex items-center p-3 border-b border-[#c2aa8c] cursor-pointer">
                    <input
                      type="radio"
                      name="billing"
                      value="same"
                      checked={billingOption === "same"}
                      onChange={() => setBillingOption("same")}
                      className="form-radio accent-black mr-2"
                    />
                    Same as Shipping Address
                  </label>
                  <label className="flex items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="billing"
                      value="different"
                      checked={billingOption === "different"}
                      onChange={() => setBillingOption("different")}
                      className="form-radio accent-black mr-2"
                    />
                    Use a different Billing Address
                  </label>
                </div>

                {/* Conditional Billing Address Form */}
                <div className={`
                  transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden transform
                  ${billingOption === 'different'
                    ? 'max-h-[1000px] opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'}
                `}>
                  {billingOption === "different" && (
                    <div className="p-4 rounded mb-4 ">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country / Region</label>
                        <input required className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent" 
                          value= "India"
                          disabled
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <div className='relative'>
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input required className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input required className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <input required className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                          <input required className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone No. *</label>
                        <div className='relative'>
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input required className="w-full font-montserrat pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08c57] focus:border-transparent" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                
                <button
                  type="submit"
                  className="w-full bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-transparent hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium flex justify-center items-center"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Place Order - ${finalTotal.toFixed(2)}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg font-montserrat shadow-sm p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {state.cart.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                    </div>
                    <p className="font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-2 font-montserrat">
                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                <p>Includes all taxes</p>
              </div>

              <div className="mt-6 p-4 bg-green-50 font-montserrat rounded-lg">
                <p className="text-green-800 text-sm flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}