import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SideCart() {
  const { state, dispatch } = useApp();

  if (!state.isCartOpen) return null;

  const updateQuantity = (productId: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { productId, quantity: newQuantity },
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#2e2e2e] text-white shadow-xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h2 className="text-lg font-playfair font-semibold">Shopping Cart ({state.cart.length})</h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 text-[#b08c57] hover:text-red-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="inline-block bg-[#e8dac3] text-[#2e2e2e] border-2 border-[#b08c57] hover:bg-transparent hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.cart.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex items-start space-x-3 bg-transparent border-b border-[#b08c57] text-[#e8dac3] p-3 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white font-montserrat truncate">{item.product.name}</h3>
                      <p className="text-green-600 font-semibold">${item.product.price}</p>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
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

          {/* Footer */}
          {state.cart.length > 0 && (
            <div className="border-t px-4 pt-4 space-y-4 border-gray-600">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className='text-gray-400 font-montserrat'>Including all taxes</p>
              <Link
                to="/checkout"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="block w-full bg-transparent border border-[#b08c57] text-white text-center py-3 rounded-lg hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors font-medium font-montserrat m-4"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}