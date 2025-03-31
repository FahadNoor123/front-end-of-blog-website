'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbarsecond = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // State for menu toggle

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const clearAllCookies = () => {
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/');
    });
  };

  const handleLogout = async () => {
    try {
        // Make request to backend to clear cookies
        const response = await fetch("/api/v1/users/logout", {
            method: "POST",
            credentials: "include", // 🔥 Ensures cookies are sent with the request
        });

        if (!response.ok) {
            throw new Error("Failed to log out");
        }

        // Remove local storage items
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isLoggedIn");

        // Update state
        setIsAdmin(false);
        setIsLoggedin(false);

        // Redirect to home page
        router.push("/");

    } catch (error) {
        console.error("Logout failed:", error);
    }
};


  useEffect(() => {
    setIsLoggedin(localStorage.getItem('isLoggedIn') === 'true');
    setIsAdmin(localStorage.getItem('SuperAdmin') === 'true');

    const fetchUser = async () => {
      try {
        const token = getCookie('myAccessToken');
        if (!token) {
          console.warn("No token found, user is not logged in");
          setLoading(false);
          return; // Stop execution if there's no token
        }
        const res = await fetch('/api/v1/users/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo & Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Global News Network</h1>
          <p className="text-gray-600 text-sm sm:text-base">Your source for international perspectives</p>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {isOpen ? "✖" : "☰"} {/* X for open, ☰ for closed */}
        </button>

        {/* Navigation Links */}
        <nav className={`absolute md:relative top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex ${isOpen ? "block" : "hidden"} transition-all`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 p-4 md:p-0">
            <li><Link href="/" className="mr-6 hover:text-blue-300 transition duration-200 text-white">Home</Link></li>
            <li><Link href="/about" className="mr-6 hover:text-blue-300 transition duration-200 text-white">About</Link></li>
            <li><Link href="/contact" className="mr-6 hover:text-blue-300 transition duration-200 text-white">Contact</Link></li>
            {isLoggedin ? (
              <li><button onClick={handleLogout} className="mr-6 hover:text-blue-300 transition duration-200 text-white">Logout</button></li>
            ) : (
              <li><Link href="/login" className="mr-6 hover:text-blue-300 transition duration-200 text-white">Login</Link></li>
            )}
            <li>
              {loading ? (
                <div className="animate-pulse flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
              ) : user ? (
                <Link href="/profile" className="flex items-center space-x-2 hover:text-blue-400">
                  <p className="font-medium cursor-pointer">{user.username}</p>
                  <Image
                    src={user.profileImage || '/default-avatar.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-blue-300 hover:border-blue-500 transition"
                  />
                </Link>
              ) : null}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  );
};

export default Navbarsecond;
