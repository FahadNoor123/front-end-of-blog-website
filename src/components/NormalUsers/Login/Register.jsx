"use client"
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
          'Content-Type': 'application/json',  // Set Content-Type
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
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/login.jpg')` }}
    >
      <section className="bg-white p-8 md:p-12 rounded-lg shadow-xl w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold" style={{ color: 'rgb(40, 162, 242)' }}>
            Student Registration Portal
          </h1>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <a
              onClick={() => {
                setFormAction('/api/v1/users/login');
                setShowAdditionalFields(false);
              }}
              href="/login"
              className="font-semibold hover:underline"
              style={{ color: 'rgb(40, 162, 242)' }}
            >
              Login here
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-sm ${
              isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-600'
            }`}
            style={{
              backgroundColor: 'rgb(40, 162, 242)',
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <PropagateLoader color="white" size={8} />
                <span className="ml-2">Registering...</span>
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;
