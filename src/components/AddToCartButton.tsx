'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart, CartItem } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    toast.success('به سبد خرید اضافه شد!');
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${
        added
          ? 'bg-teal text-navy scale-105 shadow-teal/20'
          : 'bg-gold hover:bg-gold-hover text-navy hover:scale-102 hover:shadow-gold/30'
      } ${className}`}
    >
      {added ? (
        <>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>افزوده شد</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span>افزودن به سبد خرید</span>
        </>
      )}
    </button>
  );
}
