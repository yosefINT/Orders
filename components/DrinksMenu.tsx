'use client';

import { useCart } from '@/contexts/CartContext';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
}

interface DrinksMenuProps {
  items: MenuItem[];
  onClose: () => void;
}

export default function DrinksMenu({ items, onClose }: DrinksMenuProps) {
  const { addToCart } = useCart();

  const handleItemClick = (item: MenuItem) => {
    // Add directly to cart - drinks don't need customization
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  return (
    <div 
      dir="rtl" 
      className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">שתייה קרה</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all cursor-pointer border-2 border-gray-200 hover:border-blue-400 flex flex-col items-center justify-center min-h-[120px] text-center"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-lg font-bold text-blue-600 mb-2">
              {item.price.toFixed(2)} ₪
            </p>
            {item.description && (
              <p className="text-xs text-gray-600 mb-2">{item.description}</p>
            )}
            <p className="text-xs text-blue-600 font-medium mt-2">לחץ להוספה</p>
          </div>
        ))}
      </div>
    </div>
  );
}

