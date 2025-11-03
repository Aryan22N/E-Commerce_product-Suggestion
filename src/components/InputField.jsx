"use client";

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-medium text-sm mb-1">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
