"use client"

import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill out all fields.");
      return;
    }
  
    try {
      const response = await fetch("/api/v1/blog/contact/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Contact Us Header */}
      

      {/* Contact Form */}
      <div className="bg-white p-6 sm:p-8 shadow-2xl rounded-lg w-full max-w-4xl mt-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-8 text-center">
        Contact Us
      </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset height to recalculate
                e.target.style.height = `${e.target.scrollHeight}px`; // Set new height
              }}
              className="border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none overflow-hidden resize-y"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>

          {formStatus && (
            <p
              className={`mt-4 text-center text-sm sm:text-base ${
                formStatus.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {formStatus}
            </p>
          )}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 sm:p-8 shadow-2xl rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Our Contact Information
        </h2>

        {/* Email and Phone Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
            <svg
              className="w-8 h-8 text-blue-700 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <div>
              <p className="text-lg font-medium text-gray-700">Email</p>
              <p className="text-gray-600">contact@education.com</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
            <svg
              className="w-8 h-8 text-blue-700 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <div>
              <p className="text-lg font-medium text-gray-700">Phone</p>
              <p className="text-gray-600">+1 (234) 567-890</p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex items-center bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300 mb-8">
          <svg
            className="w-8 h-8 text-blue-700 mr-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <div>
            <p className="text-lg font-medium text-gray-700">Address</p>
            <p className="text-gray-600">
              1234 Education St., Knowledge City, Education Country
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {[
            { name: "Facebook", link: "https://facebook.com", icon: "facebook" },
            { name: "Twitter", link: "https://twitter.com", icon: "twitter" },
            { name: "LinkedIn", link: "https://linkedin.com", icon: "linkedin" },
            { name: "Instagram", link: "https://instagram.com", icon: "instagram" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-500 transition-colors duration-300"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={getSocialIconPath(social.icon)}></path>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get social media icon paths
const getSocialIconPath = (platform) => {
  switch (platform) {
    case "facebook":
      return "M18 2h-12c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-1 13h-3v6h-4v-6h-2v-4h2v-3c0-2.209 1.791-4 4-4 1.309 0 2.415.294 2.812.688.111.098.188.242.188.402v3.312h3l-.563 4h-2.437v6h-3z";
    case "twitter":
      return "M23.4 4.7c-.8.4-1.7.7-2.6.8 1-.6 1.8-1.5 2.1-2.7-.9.5-1.8.9-2.8 1.1-1.7-1.7-4.5-1.7-6.2-.1-1.7 1.7-1.6 4.3.1 6.1-1.6-.1-3.1-.8-4.4-1.8-1.6 1.6-.8 4.1 1.1 5.3-1.2 0-2.4-.4-3.4-1.1 0 2.4 1.8 4.6 4.4 5.1-1.3.4-2.7.4-4.1 0 1.2 3.7 4.9 6.1 8.7 5.5 3.3-.4 5.8-2.9 6.2-6.1.1-1.3 0-2.7-.4-4.1-.3-.1-.6-.2-.9-.3z";
    case "linkedin":
      return "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";
    case "instagram":
      return "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
    default:
      return "";
  }
};

export default ContactUs;