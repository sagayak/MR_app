
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex items-center p-4 space-x-4">
       <div className="text-4xl bg-gray-100 p-3 rounded-lg">{product.image}</div>
       <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-md font-bold text-gray-900 mt-1">₹{product.price}</p>
       </div>
       <button
        onClick={() => onAddToCart(product)}
        className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
       >
        Add
      </button>
    </div>
  );
};

export default ProductCard;
