import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PaymentSection({ onPaymentComplete }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger success callback after animation
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Fee Section */}
      

      

      {/* Card Details Form */}
      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Card Number <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              required
              pattern="[0-9]{16}"
              placeholder="1234 5678 9012 3456"
              className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              required
              placeholder="MM/YY"
              pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              CVV <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              required
              pattern="[0-9]{3,4}"
              placeholder="123"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      

    </form>
  );
}