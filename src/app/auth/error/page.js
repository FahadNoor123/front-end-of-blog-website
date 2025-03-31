"use client"; 
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
      <p className="mt-2 text-gray-600">
        {error ? `Error: ${error}` : "Something went wrong. Please try again."}
      </p>
      <a href="/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back to Login
      </a>
    </div>
  );
}
