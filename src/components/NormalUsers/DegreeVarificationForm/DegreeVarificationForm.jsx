"use client"
import React, { useState } from 'react';
import { Upload, CreditCard, CheckCircle, User, File, DollarSign } from 'lucide-react';
import { PersonalInfoSection } from './PersonalInfoSection';
import { DocumentUploadSection } from './DocumentUploadSection';
import { PaymentSection } from './PaymentSection';
import CountUp from "react-countup";
import { motion, AnimatePresence } from 'framer-motion';

export default function DegreeVerificationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    whatsappNumber: '',
    currentAddress: '',
    documents: [],
    paymentCompleted: false
  });

  const handlePersonalInfoSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleDocumentUpload = (documents) => {
    setFormData(prev => ({ ...prev, documents }));
    setCurrentStep(3);
  };

  const handlePaymentComplete = () => {
    setFormData(prev => ({ ...prev, paymentCompleted: true }));
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
            <h2 className="text-3xl font-bold text-white text-center">Degree Verification Form</h2>
            <p className="text-4xl font-bold text-white mt-6 text-center">
              Verified Degrees:{" "}
              <CountUp start={0} end={7300} duration={5} separator="," />
            </p>
            <p className="text-lg text-white mt-4 text-center sm:text-base">
              Our online degree verification system allows any institution, office, or agency to instantly verify the authenticity of a degree certificate.
            </p>
          </div>

          {/* Instructions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 sm:text-xl">
              How to Fill the Form:
            </h2>
            <ul className="list-decimal list-inside space-y-3 text-gray-700 sm:text-sm">
              <li className="flex items-start">
                <User className="w-5 h-5 mr-2 text-indigo-600" />
                Enter your full name as it appears on your degree.
              </li>
              <li className="flex items-start">
                <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                Provide your WhatsApp number for communication.
              </li>
              <li className="flex items-start">
                <File className="w-5 h-5 mr-2 text-indigo-600" />
                Fill in your current address with complete details.
              </li>
              <li className="flex items-start">
                <Upload className="w-5 h-5 mr-2 text-indigo-600" />
                Upload a clear scanned copy of your degree in PDF or image format.
              </li>
            </ul>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center py-6 bg-indigo-50">
            <div className="flex space-x-8">
              {[
                { step: 1, title: 'Personal Info', icon: User },
                { step: 2, title: 'Documents', icon: File },
                { step: 3, title: 'Payment', icon: DollarSign }
              ].map(({ step, title, icon: Icon }) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    currentStep >= step ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                >
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className="ml-2 font-medium">{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Sections */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <PersonalInfoSection
                    initialData={formData}
                    onSubmit={handlePersonalInfoSubmit}
                  />
                )}
                {currentStep === 2 && (
                  <DocumentUploadSection onComplete={handleDocumentUpload} />
                )}
                {currentStep === 3 && (
                  <PaymentSection onPaymentComplete={handlePaymentComplete} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}