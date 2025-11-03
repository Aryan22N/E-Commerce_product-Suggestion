"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [query, setQuery] = useState("");

  const categories = [
    "Electronics",
    "Accessories",
    "Wearables",
    "Footwear",
    "Apparel",
    "Bags",
    "Lifestyle",
    "Home",
    "Outdoor",
    "Stationery",
    "Office",
    "Sports",
    "Fitness",
    "Health",
    "Beauty",
    "Personal Care",
  ];

  const handleSubmit = () => {
    const params = new URLSearchParams({
      budget,
      category,
      rating,
      query,
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-2xl shadow-2xl transition duration-500 ease-in-out transform hover:shadow-3xl">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
        ✨ Product Finder
      </h1>

      <div className="space-y-5 mb-6 text-gray-700 ">
        {/* InputField components likely have internal styling that needs improvement too,
            but assuming they handle margin-bottom, the space-y-5 class helps manage vertical rhythm. */}

        <InputField
          label="Budget (₹)"
          type="number"
          value={budget}
          onChange={setBudget}
          placeholder="Enter your budget"
          // Class suggestion for a typical InputField's input element:
          // "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />

        <SelectField
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories}
          // Class suggestion for a typical SelectField's select element:
          // "w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />

        <SelectField
          label="Minimum Rating"
          value={rating}
          onChange={setRating}
          options={["1", "2", "3", "4", "5"]}
        />

        <InputField
          label="Search Keyword"
          value={query}
          onChange={setQuery}
          placeholder="Laptop, shoes, bag..."
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Get Personalized Recommendations
      </button>
    </div>
  );
}
