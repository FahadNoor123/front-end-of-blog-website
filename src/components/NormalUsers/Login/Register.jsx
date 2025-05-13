"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

function Register({ setFormAction, setShowAdditionalFields }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const registerUser = async (registerData) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          email: registerData.email,  
          password: registerData.password,  
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message || 'An error occurred while registering. Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: error.message || 'An unexpected error occurred. Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registerData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await registerUser(registerData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">GlobalNews</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community to access exclusive content
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                minLength="6"
              />
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
                  <PropagateLoader color="white" size={8} className="mr-2" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              onClick={() => {
                setFormAction('/api/v1/users/login');
                setShowAdditionalFields(false);
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;