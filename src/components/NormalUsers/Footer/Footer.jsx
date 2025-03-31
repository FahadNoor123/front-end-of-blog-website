"use client"
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { fetchBlogsData } from "../../../app/utils/fetchBlogs";
import { useState, useEffect } from "react";
import Link from "next/link";


const Footer = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { categories = [] } = await fetchBlogsData();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCategories();
  }, []);
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Global News Network</h3>
            <p className="text-gray-400">
              Bringing you the latest news and updates from around the world. 
              Trusted, accurate, and timely reporting since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
            <li>
            <Link href="/" className="text-gray-400 hover:text-white transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-400 hover:text-white transition">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">
              Contact Us
            </Link>
          </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
               <Link
                            href={`/`}
                            className={`mr-6 hover:text-blue-300 transition duration-200 `}
                          >
                            All
                          </Link>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <a href={`/blog/${cat.slug}`} className="text-gray-400 hover:text-white transition">
                      {cat.name}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No categories available</li>
              )}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Get the latest news delivered to your inbox
            </p>
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l text-gray-900"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">
                Subscribe
              </button>
            </div>
            
            
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Global News Network. All rights reserved.
          </div>
          <div className="flex space-x-6">
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition">
            Cookie Policy
          </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;