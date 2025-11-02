
import React, { useState } from 'react';
import { Address } from '../types';

interface AddressFormProps {
    isSubmitting: boolean;
    onConfirmOrder: (address: Address) => void;
    onBackToCart: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ isSubmitting, onConfirmOrder, onBackToCart }) => {
    const [tower, setTower] = useState('1');
    const [floor, setFloor] = useState('1');
    const [flat, setFlat] = useState('001');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        onConfirmOrder({ tower, floor, flat });
    };

    const generateOptions = (start: number, end: number, padding = 1) => {
        return Array.from({ length: end - start + 1 }, (_, i) => {
            const value = start + i;
            return <option key={value} value={value}>{String(value).padStart(padding, '0')}</option>;
        });
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center mb-4">
                <button onClick={onBackToCart} className="mr-2 p-1" disabled={isSubmitting}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold">Delivery Address</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg border">
                <div>
                    <label htmlFor="tower" className="block text-sm font-medium text-gray-700">Tower</label>
                    <select
                        id="tower"
                        value={tower}
                        onChange={(e) => setTower(e.target.value)}
                        disabled={isSubmitting}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                    >
                        {generateOptions(1, 18)}
                    </select>
                </div>
                <div>
                    <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Floor</label>
                    <select
                        id="floor"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        disabled={isSubmitting}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                    >
                       {generateOptions(1, 14)}
                    </select>
                </div>
                <div>
                    <label htmlFor="flat" className="block text-sm font-medium text-gray-700">Flat Number</label>
                    <select
                        id="flat"
                        value={flat}
                        onChange={(e) => setFlat(e.target.value)}
                        disabled={isSubmitting}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                    >
                        {generateOptions(1, 6, 3)}
                    </select>
                </div>
                 <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white font-semibold mt-4 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
