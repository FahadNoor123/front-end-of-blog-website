"use client";

export function Input({ value, onChange, placeholder }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border px-3 py-2 rounded-md w-full"
      />
    );
  }
  