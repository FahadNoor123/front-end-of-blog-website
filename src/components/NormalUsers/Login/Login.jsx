"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log("Google Token:", token);

    try {
      const response = await fetch("/api/v1/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Authority", data.user.role);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have successfully logged in with Google.",
          timer: 1500,
          showConfirmButton: false,
        });

        localStorage.setItem("isLoggedIn", "true");

        if (data.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
        } else if (data.user.role === "superadmin") {
          localStorage.setItem("isSuperAdmin", "true");
        }

        router.push("/");
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

    const loginData = Object.fromEntries(new FormData(event.target).entries());

    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          timer: 1500,
          showConfirmButton: false,
        });

        if (data.user.role === "admin") {
          localStorage.setItem('admin', 'true');
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedin(true);
          setIsSuperAdmin(true);
        } else if (data.user.role === "superadmin") {
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

        router.replace('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error || 'An error occurred. Please try again.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to login. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">GlobalNews</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleOAuthProvider clientId="309281561172-svn2sie2ia0m9vbdffqjqd07k10g1p01.apps.googleusercontent.com">
              <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={handleGoogleFailure} 
                theme="filled_blue"
                size="large"
                shape="rectangular"
                text="continue_with"
              />
            </GoogleOAuthProvider>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}