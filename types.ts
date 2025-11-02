
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string; // Emoji or character for simplicity
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
    tower: string;
    floor: string;
    flat: string;
}

// FIX: Added Message interface for chatbot components, which was missing and caused errors in several files.
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}
