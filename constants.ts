
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Mealbox',
    description: '2 Roti + 100ml Curry',
    price: 85,
    image: '🍱',
  },
  {
    id: 2,
    name: 'Mealbox Plus',
    description: '3 Roti + 200ml Curry',
    price: 120,
    image: '🍲',
  },
  {
    id: 3,
    name: 'Roti',
    description: '1 freshly made roti',
    price: 22,
    image: ' रोटी',
  },
  {
    id: 4,
    name: 'Curry',
    description: '100ml curry only',
    price: 30,
    image: '🍛',
  },
];


// FIX: Added MANE_ROTTI_DATA constant, which was used in geminiService.ts but not defined.
export const MANE_ROTTI_DATA = {
  businessName: "Mane Rotti",
  description: "A home-based food business specializing in fresh rotis and curry.",
  currency: "Indian Rupees (₹)",
  menu: [
    { name: "Roti", description: "1 freshly made roti", price: 22 },
    { name: "Curry", description: "100 ml curry only", price: 30 },
  ],
  combos: [
    { name: "Mealbox", description: "2 rotis + 100 ml curry", price: 85 },
    { name: "Mealbox+", description: "3 rotis + 200 ml curry", price: 120 },
  ],
  deliveryDetails: "We currently offer delivery within a 5km radius. Delivery charges may apply.",
  contact: "You can place your order right here in the chat!"
};
