"use client";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-gray-600 text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">Category: {product.category}</p>

      <div className="mt-2">
        <p className="text-blue-600 font-semibold">₹ {product.price}</p>
        <p className="text-yellow-600 font-medium">⭐ {product.rating}</p>
      </div>

      <div className="mt-3">
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          ID: {product.id}
        </span>
      </div>
    </div>
  );
}
