// pages/login.js
"use client"; // Enabling client-side hooks like useRouter

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import NotFound from "@/app/not-found";


export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
// Handle Google Login Success
const handleGoogleSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential; // Google Token
  console.log("Google Token:", token);

  try {
    const response = await fetch("/api/v1/users/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }), // ✅ Fixed: Correct token usage
      credentials: "include",
    });

    const data = await response.json();
console.log("Authority",data.user.role)
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in with Google.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Store login state
      localStorage.setItem("isLoggedIn", "true");

      if (data.user.role==="admin") {
        localStorage.setItem("isAdmin", "true");
     
      } else if (data.user.role==="superadmin") {
        localStorage.setItem("isSperAdmin", "true");
      }

      // router.push("/");
      // window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: data.error?.message || "An error occurred. Please try again.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to login. Please try again later.",
    });
  }
};

// Handle Google Login Failure
const handleGoogleFailure = () => {
  Swal.fire({
    icon: "error",
    title: "Google Login Failed",
    text: "Could not sign in with Google. Please try again.",
  });
};



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Convert form data into an object
    const loginData = Object.fromEntries(new FormData(event.target).entries());

    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login message
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          timer: 1500,
          showConfirmButton: false,
        });

        // Set localStorage and state based on the user's role
        if (data.user.role==="admin") {
          localStorage.setItem('admin', 'true');
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedin(true);
          setIsSuperAdmin(true);
        } else if (data.user.role==="superadmin") {
          localStorage.setItem('SuperAdmin', 'true');
          localStorage.setItem('admin', 'true');
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedin(true);
          setIsAdmin(true);
        } else {
          localStorage.setItem('isAdmin', 'false');
          localStorage.setItem('SuperAdmin', 'false');
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedin(true);
          setIsAdmin(false);
        }

        router.push('/'); // Navigate to the home page
        window.location.reload(); // Refresh the page
      } else {
        // Handle login failure
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error || 'An error occurred. Please try again.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      // Handle fetch or server error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to login. Please try again later.',
      });
    } finally {
      // Always reset the loading state
      setIsLoading(false);
    }
  };




  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/login.jpg')] bg-cover bg-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden" style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)' }}>
        <div className="py-6 px-8">
          <h2 className="text-2xl font-bold text-center mb-4" style={{ color: '#333', fontWeight: 700, fontSize: '30px' }}>
            Login
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input type="email" name="email" id="email" required placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input type="password" name="password" id="password" required placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <a href="#" className="text-sm text-blue-500 hover:underline" style={{ fontWeight: 500 }}>Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none"
              disabled={isLoading}
              style={{ transition: 'background-color 0.3s ease', fontWeight: 600 }}
            >
            
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            
            <div> {/* Extra div added here */}
            <GoogleOAuthProvider clientId="309281561172-svn2sie2ia0m9vbdffqjqd07k10g1p01.apps.googleusercontent.com">  
  <div className="flex items-center justify-center ">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="py-6 px-8">

        <GoogleLogin 
          onSuccess={handleGoogleSuccess} 
          onError={handleGoogleFailure} 
        />
      </div>
    </div>
  </div>
</GoogleOAuthProvider>
    </div>
          </form>
          <p className="text-center text-sm mt-4" style={{ color: '#555', fontWeight: 500 }}>
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline" style={{ fontWeight: 600 }}>
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
