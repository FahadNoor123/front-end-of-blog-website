"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ Correct import for Next.js Image component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Function to get the value of a specific cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Function to clear all cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  // Function to handle logout
  const handleLogout = () => {
    console.log("User logged out");
    // Clear local storage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    
    // Clear all cookies
    clearAllCookies();
    
    // Clear state
    setIsAdmin(false);
    setIsLoggedin(false);

    // Redirect to the home page or login page
    router.push('/');
  };

  useEffect(() => {
    const isLoggedinFromStorage = localStorage.getItem('isLoggedIn') === 'true';
    const isAdminFromStorage = localStorage.getItem('SuperAdmin') === 'true';

    setIsLoggedin(isLoggedinFromStorage);
    setIsAdmin(isAdminFromStorage);


    const fetchUser = async () => {
      try {
          const token = getCookie("myAccessToken"); // Assuming token is stored in localStorage
          if (!token) throw new Error("No token found");

          const res = await fetch("/api/v1/users/profile", {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
              credentials: "include",
          });

          if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

          const data = await res.json();
          console.log("this is user data", data)
          setUser(data.user);
      } catch (error) {
          console.error("Error fetching user data:", error);
      } finally {
          setLoading(false);
      }
  };

  fetchUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  return (
    <nav className="bg-[rgb(79,70,229)] text-white w-full fixed top-0 left-0 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          Education Department 1
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button 
            className="text-white focus:outline-none hover:text-blue-400" 
            onClick={toggleMenu} // Toggle menu on click
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Menu Links for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <div className="relative group">
            <button className="focus:outline-none hover:text-blue-400">Services</button>
            {/* Dropdown Menu */}
            <div className="absolute hidden group-hover:block bg-[rgb(79,70,229)] mt-2 py-2 rounded shadow-md w-48">
              <Link href="/degree_verification_form" className="block px-4 py-2 hover:bg-blue-500">Duplicate Degree</Link>
              <Link href="/degree_verification_form" className="block px-4 py-2 hover:bg-blue-500">Paper Scrutiny</Link>
              <Link href="/degree_verification_form" className="block px-4 py-2 hover:bg-blue-500">Transcript Verification</Link>
              <Link href="/degree_verification_form" className="block px-4 py-2 hover:bg-blue-500">Degree Attestation</Link>
              <Link href="/degree_verification_form" className="block px-4 py-2 hover:bg-blue-500">Equivalency Certificate</Link>
              <Link href="/degree_verification_form" className="block px-4 py-2 hover:bg-blue-500">Migration Certificate</Link>
            </div>
          </div>

          <Link href="/track-application" className="hover:text-blue-400">Track Application</Link>
          <Link href="/contact" className="hover:text-blue-400">Contact Us</Link>

          

          <Link href="/about" className="hover:text-blue-400">About Us</Link>
          



          {isLoggedin ? (
            <button
              onClick={handleLogout}
              className="block text-white hover:text-red-400"
            >
              Log Out
            </button>
          ) : (
            <Link href="/login" className="block text-white hover:text-blue-400">Login</Link>
          )}
     <div className="flex items-center space-x-4">
                {loading ? (
                    // 🔹 Skeleton Loader for better UX
                    <div className="flex items-center space-x-2 animate-pulse">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    </div>
                ) : user ? (
                    <div className="flex items-center space-x-3">
                       <Link href="/profile" className="flex items-center space-x-2 hover:text-blue-400 transition">
                        <p className="font-medium cursor-pointer">{user.username}</p>
                        <Image
                            src={user.profileImage|| "/default-avatar.png"} // 🔹 Fallback Avatar
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-blue-300 hover:border-blue-500 transition"
                        />
                        </Link>
                    </div>
                ) : (
                    <></>
                    
                )}
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-[rgb(79,70,229)] p-4 space-y-2  ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block hover:text-blue-400">Home</Link>
        <Link href="/duplicate-degree" className="block hover:text-blue-400">Duplicate Degree</Link>
        <Link href="/paper-scrutiny" className="block hover:text-blue-400">Paper Scrutiny</Link>
        <Link href="/track-application" className="block hover:text-blue-400">Track Application</Link>
        <Link href="/payment" className="block hover:text-blue-400">Payment</Link>
        <Link href="/contact" className="block hover:text-blue-400">Contact Us</Link>
        <Link href="/faq" className="block hover:text-blue-400">FAQ</Link>
        <Link href="/about" className="block hover:text-blue-400">About Us</Link>
        <Link href="/profile" className="block hover:text-blue-400">Profile</Link>
        {isLoggedin ? (
          <button
            onClick={handleLogout}
            className="block text-white hover:text-red-400"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="block text-white hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;