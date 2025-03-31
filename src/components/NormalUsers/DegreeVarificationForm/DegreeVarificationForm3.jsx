"use client"
import React, { useState } from 'react';
import { User, FileText, CreditCard, CheckCircle, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentUploadSection } from './DocumentUploadSection';
import { PaymentSection } from './PaymentSection';

export default function NewDegreeVerificationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    whatsappNumber: '',
    currentAddress: '',
    documents: [],
    paymentCompleted: false
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleDocumentUpload = (documents) => {
    setFormData(prev => ({ ...prev, documents }));
    setCurrentStep(3);
  };

 
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition"
        >
          {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
        </button>

        {/* Form Container */}
        <div className={`rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className="p-2 text-center border-b border-gray-200/10">
            <h1 className="text-3xl font-bold">Degree Verification</h1>
            <p className="mt-1 text-gray-400">Verify your degree in just a few simple steps.</p>
          </div>

          {/* Progress Indicator */}
          <div className="p-0 flex justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${currentStep > step ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h2 className="text-2xl font-bold mt-4">Submission Successful!</h2>
                  <p className="text-gray-400 mt-2">Your degree verification request has been received.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl font-bold">Personal Information</h2>
                      <p className="text-black-400 mt-2 underline decoration-blue-500 decoration-2">Enter your details as they appear on your degree.</p>
                      <div className="mt-6 space-y-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className={`w-full p-3 rounded-lg border ${
                            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="WhatsApp Number"
                          className={`w-full p-3 rounded-lg border ${
                            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Current Address"
                          className={`w-full p-3 rounded-lg border ${
                            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl font-bold">Upload Documents</h2>
                      <p className="text-gray-400 mt-2">Upload a clear scanned copy of your degree.</p>
                      <div className="mt-6">
                        <div
                          className={`p-8 border-2 border-dashed rounded-lg ${
                            isDarkMode ? 'border-gray-600' : 'border-gray-200'
                          }`}
                        >
                         
          <DocumentUploadSection onComplete={handleDocumentUpload} />
                          
                        </div>
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl font-bold">Payment</h2>
                      
                      <div className="mt-6">
                        <div
                          className={`p-6 rounded-lg ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        >
                             
                          <PaymentSection/>
                          <p className="mt-4 text-gray-400">Enter your payment details below.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="p-8 border-t border-gray-200/10 flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={currentStep === 3 ? handleFormSubmit : handleNextStep}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {currentStep === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}