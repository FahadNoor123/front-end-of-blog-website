"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CookiePolicy = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 shadow-lg">
        <p className="text-sm text-center md:text-left px-4">
          This website uses cookies for analytics and personalized ads. By continuing, you agree to our{" "}
            {" "}
          <Link href="/privacy-policy" className="underline text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-green-500 px-4 py-2 rounded text-black font-semibold"
        >
          Accept
        </button>
      </div>
    )
  );
};

export default CookiePolicy;
