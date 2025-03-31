import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-center">
      {/* Animated Heading */}
      <h1 className="text-8xl font-extrabold mb-6 animate-pulse text-white">
        404
      </h1>
      {/* Subheading */}
      <p className="text-2xl font-medium mb-4 text-white">
        Oops! The page you're looking for isn't here.
      </p>
      {/* Suggestion Message */}
      <p className="text-lg mb-8 text-white/80">
        It might have been removed, or you may have mistyped the URL.
      </p>
      {/* Button */}
      <Link href="/"
       className="px-8 py-3 bg-white text-blue-800 font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200">
          Back to Home
       
      </Link>
    </div>
  );
};

export default NotFound;
