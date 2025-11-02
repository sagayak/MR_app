
import React, { useState, useMemo } from 'react';
import { Product, CartItem, Address } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import AddressForm from './components/AddressForm';
import OrderConfirmation from './components/OrderConfirmation';

type View = 'products' | 'cart' | 'address' | 'confirmation';

const App: React.FC = () => {
  const [view, setView] = useState<View>('products');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [confirmedOrder, setConfirmedOrder] = useState<{ items: CartItem[]; total: number; address: Address } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleProceedToAddress = () => {
    setView('address');
  };

  const handleConfirmOrder = async (address: Address) => {
    setIsSubmitting(true);
    const orderPayload = { items: [...cart], total: cartTotal, address };

    try {
      const response = await fetch('/api/submitOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setConfirmedOrder(orderPayload);
      setCart([]);
      setView('confirmation');
    } catch (error) {
      console.error('Order submission error:', error);
      alert('There was a problem submitting your order. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleStartNewOrder = () => {
    setConfirmedOrder(null);
    setView('products');
  };

  const renderContent = () => {
    switch (view) {
      case 'cart':
        return (
          <CartView
            cartItems={cart}
            cartTotal={cartTotal}
            onUpdateQuantity={handleUpdateQuantity}
            onPlaceOrder={handleProceedToAddress}
            onContinueShopping={() => setView('products')}
          />
        );
      case 'address':
        return (
            <AddressForm
                isSubmitting={isSubmitting}
                onConfirmOrder={handleConfirmOrder}
                onBackToCart={() => setView('cart')}
            />
        );
      case 'confirmation':
        return (
          <OrderConfirmation 
            order={confirmedOrder} 
            onNewOrder={handleStartNewOrder} 
          />
        );
      case 'products':
      default:
        return <ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      <div className="container mx-auto max-w-lg min-h-screen bg-white shadow-lg">
        <Header cartCount={cartCount} onCartClick={() => setView('cart')} onViewProductsClick={() => setView('products')} />
        <main className="p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
