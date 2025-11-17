'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedAddons?: string[];
  selectedVariation?: string | null;
  specialInstructions?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      // For items with addons/variations, always add as new item
      // For simple items, check if exact match exists
      const itemKey = `${item.id}-${item.selectedVariation || ''}-${(item.selectedAddons || []).join(',')}-${item.specialInstructions || ''}`;
      const existingItem = prevCart.find((cartItem) => {
        const cartKey = `${cartItem.id}-${cartItem.selectedVariation || ''}-${(cartItem.selectedAddons || []).join(',')}-${cartItem.specialInstructions || ''}`;
        return cartKey === itemKey;
      });
      
      if (existingItem) {
        return prevCart.map((cartItem) => {
          const cartKey = `${cartItem.id}-${cartItem.selectedVariation || ''}-${(cartItem.selectedAddons || []).join(',')}-${cartItem.specialInstructions || ''}`;
          return cartKey === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      if (index < 0 || index >= prevCart.length) return prevCart;
      
      const item = prevCart[index];
      const newQuantity = item.quantity + delta;
      
      if (newQuantity <= 0) {
        return prevCart.filter((_, i) => i !== index);
      }

      return prevCart.map((cartItem, i) =>
        i === index ? { ...cartItem, quantity: newQuantity } : cartItem
      );
    });
  };

  const removeItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

