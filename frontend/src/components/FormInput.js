import React from 'react';

const FormInput = ({ 
  label, 
  value, 
  setValue, 
  type = "text", 
  placeholder = "", 
  required = false 
}) => {
  // Generate a unique ID based on the label to link label and input
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col w-full">
      <label 
        htmlFor={inputId} 
        className="!px-6 font-semibold"
      >
        {label} {required && "*"}
      </label>
      
      <div className="relative !mx-6 !my-2">
        <input
          type={type}
          name={inputId}
          id={inputId}
          className="!p-3 rounded-lg w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;