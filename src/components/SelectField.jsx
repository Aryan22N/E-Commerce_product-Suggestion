"use client";

export default function SelectField({ label, value, onChange, options = [] }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-medium text-sm mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 ease-in-out shadow-sm hover:border-blue-400 cursor-pointer"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
