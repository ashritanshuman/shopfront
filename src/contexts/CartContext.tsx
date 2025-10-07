import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
  };
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, variant?: { color?: string; size?: string }) => void;
  updateQuantity: (id: string, quantity: number, variant?: { color?: string; size?: string }) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.variant) === JSON.stringify(item.variant)
      );

      if (existingIndex > -1) {
        const newItems = [...prev];
        const newQuantity = newItems[existingIndex].quantity + 1;
        if (newQuantity <= item.maxStock) {
          newItems[existingIndex].quantity = newQuantity;
          toast.success('Quantity updated in cart');
          return newItems;
        } else {
          toast.error('Cannot add more items than available in stock');
          return prev;
        }
      }

      toast.success('Added to cart');
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, variant?: { color?: string; size?: string }) => {
    setItems(prev => prev.filter(item => 
      !(item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant))
    ));
    toast.success('Removed from cart');
  };

  const updateQuantity = (id: string, quantity: number, variant?: { color?: string; size?: string }) => {
    if (quantity < 1) return;

    setItems(prev => prev.map(item => {
      if (item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant)) {
        if (quantity <= item.maxStock) {
          return { ...item, quantity };
        } else {
          toast.error('Cannot exceed available stock');
          return item;
        }
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
