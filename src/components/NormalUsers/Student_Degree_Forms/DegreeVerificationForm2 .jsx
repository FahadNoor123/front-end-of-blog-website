"use client";

import React from "react";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

const DegreeVerificationForm2 = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl z-10 sm:w-full">
        {/* Stats Section */}
        <div className="text-center mb-8 p-6 bg-[rgb(79,70,229)] rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-white sm:text-3xl">
            Online Degree Verification
          </h1>
          <p className="text-3xl font-bold text-white mt-4">
            Verified Degrees:{" "}
            <CountUp start={0} end={7300} duration={5} separator="," />
          </p>
          <p className="text-lg text-white mt-4 sm:text-base">
            Our online degree verification system allows any institution, office, or agency to instantly verify the authenticity of a degree certificate.
          </p>
        </div>

        {/* Instructions Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 sm:text-xl">
            How to Fill the Form:
          </h2>
          <ul className="list-decimal list-inside space-y-2 text-blue-700 sm:text-sm">
            <li>Enter your full name as it appears on your degree.</li>
            <li>Provide your WhatsApp number for communication.</li>
            <li>Fill in your current address with complete details.</li>
            <li>Upload a clear scanned copy of your degree in PDF or image format.</li>
          </ul>
        </div>

        {/* Form Section */}
        <form className="space-y-6">
          {/* Student Name */}
          <div>
            <label
              htmlFor="studentName"
              className="block text-lg font-semibold text-[rgb(79,70,229)]"
            >
              Student Name <span className="text-blue-500 text-lg">*</span>
            </label>
            <input
              id="studentName"
              type="text"
              name="studentName"
              placeholder="Enter your full name"
              required
              className="mt-2 block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(79,70,229)] focus:border-[rgb(79,70,229)]"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-lg font-semibold text-[rgb(79,70,229)]"
            >
              WhatsApp Number <span className="text-blue-500 text-lg">*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              name="whatsapp"
              placeholder="Enter your WhatsApp number"
              required
              className="mt-2 block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(79,70,229)] focus:border-[rgb(79,70,229)]"
            />
          </div>

          {/* Current Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-semibold text-[rgb(79,70,229)]"
            >
              Current Address <span className="text-blue-500 text-lg">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your current address"
              required
              className="mt-2 block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(79,70,229)] focus:border-[rgb(79,70,229)]"
              rows="4"
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="degreeFile"
              className="block text-lg font-semibold text-[rgb(79,70,229)]"
            >
              Upload Degree <span className="text-blue-500 text-lg">*</span>
            </label>
            <input
              id="degreeFile"
              type="file"
              name="degreeFile"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="mt-2 block w-full text-blue-700 border border-blue-300 rounded-lg shadow-sm cursor-pointer focus:ring-2 focus:ring-[rgb(79,70,229)] focus:border-[rgb(79,70,229)]"
            />
            <p className="text-sm text-gray-500 mt-2">
              Accepted file types: PDF, JPG, JPEG, PNG
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[rgb(79,70,229)] text-white font-medium py-3 px-10 rounded-lg shadow-lg hover:bg-[rgb(60,52,191)] focus:outline-none focus:ring-2 focus:ring-[rgb(79,70,229)] focus:ring-offset-2"
            >
              Submit for Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DegreeVerificationForm2;
