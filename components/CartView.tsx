
import React from 'react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onPlaceOrder: () => void;
  onContinueShopping: () => void;
}

const CartView: React.FC<CartViewProps> = ({
  cartItems,
  cartTotal,
  onUpdateQuantity,
  onPlaceOrder,
  onContinueShopping,
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <button
          onClick={onContinueShopping}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">₹{item.price} each</p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border bg-gray-100 text-lg font-bold">-</button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border bg-gray-100 text-lg font-bold">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total</span>
          <span>₹{cartTotal}</span>
        </div>
        <button
          onClick={onPlaceOrder}
          className="w-full bg-orange-500 text-white font-semibold mt-4 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          Proceed to Address
        </button>
      </div>
    </div>
  );
};

export default CartView;
