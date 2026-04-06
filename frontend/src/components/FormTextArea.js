const ReusableTextarea = ({
  label,
  value,
  setValue,
  placeholder = "Enter text here...",
  rows = 4,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Agar label pass kiya jaye toh hi dikhe */}
      {label && (
        <label htmlFor="desc" className="!px-6 font-semibold">
          {label}
        </label>
      )}
      <div className="relative !mx-6 !my-2">
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          // Tailwind classes for responsiveness and styling
          className="!p-3 rounded-lg w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700 transition-all"
        />
      </div>
    </div>
  );
};

export default ReusableTextarea;
