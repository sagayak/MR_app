
import React from 'react';
import { CartItem, Address } from '../types';

interface OrderConfirmationProps {
  order: { items: CartItem[]; total: number; address: Address } | null;
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onNewOrder }) => {
  if (!order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">No order found.</h2>
        <button onClick={onNewOrder} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg">
          Shop Now
        </button>
      </div>
    );
  }

  const { address } = order;

  return (
    <div className="text-center py-10 animate-fade-in">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">Your fresh meal is being prepared and will be delivered shortly.</p>

      <div className="bg-gray-50 border rounded-lg p-4 text-left my-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <p className="text-gray-700">
            Tower: <span className="font-medium">{address.tower}</span>,
            Floor: <span className="font-medium">{address.floor}</span>,
            Flat: <span className="font-medium">{address.flat}</span>
          </p>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
        </div>
      </div>

      <button
        onClick={onNewOrder}
        className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
      >
        Start New Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
