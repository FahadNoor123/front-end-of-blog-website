import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative">
        {/* Main Loader Container */}
        <div className="w-32 h-32 bg-[rgb(78,71,229)] rounded-full flex items-center justify-center">
          {/* Inner Circle */}
          <div className="w-24 h-24 bg-white rounded-full"></div>

          {/* Animated Dots */}
          <div className="absolute inset-0 flex items-center justify-center space-x-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-[rgb(78,71,229)] rounded-full"
                style={{
                  animation: 'dotBounce 1.2s infinite',
                  animationDelay: `${index * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mt-6">
          <h2 className="text-[rgb(78,71,229)] text-2xl font-bold">Loading</h2>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes dotBounce {
            0%, 100% {
              transform: translateY(1);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translateY(-16px);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;