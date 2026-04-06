"use client"; // Always use this for interactive components in Next.js App Router
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using lucide-react

const PasswordInput = ({ 
  label = "Password", 
  value, 
  setValue, 
  placeholder = "Enter your password", 
  required = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="!px-6 font-semibold">
        {label} {required && "*"}
      </label>
      
      <div className="relative !mx-6 !my-2">
        <input
          type={showPassword ? "text" : "password"}
          name={inputId}
          id={inputId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="!p-3 pr-12 rounded-lg w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700 transition-all"
          placeholder={placeholder}
          required={required}
        />
        
        <button
          type="button"
          onClick={toggleVisibility}
          className="flex items-center absolute inset-y-0 right-3 px-2 cursor-pointer focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="text-gray-500 h-5 w-5" />
          ) : (
            <Eye className="text-gray-500 h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;