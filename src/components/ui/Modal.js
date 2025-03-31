"use client"; // Ensures it works in Next.js app router

import { motion } from "framer-motion";
import { X } from "lucide-react"; // Close icon
import { useEffect } from "react";

export function Modal({ isOpen, onClose, children, title = "Modal Title" }) {
  if (!isOpen) return null;

  // Handle Escape Key to Close Modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose} // Close modal when clicking outside
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {/* Modal Content */}
        <div>{children}</div>
      </motion.div>
    </div>
  );
}
