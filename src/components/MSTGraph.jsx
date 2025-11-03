"use client";

export default function MSTGraph({ mst }) {
  if (!mst || mst.length === 0) {
    return (
      <p className="text-gray-600 text-center">
        No similar product pairs found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mst.map((pair, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Similar Product Pair
          </h3>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* LEFT PRODUCT */}
            <div className="p-4 rounded-lg bg-gray-50 border text-center">
              <h4 className="font-semibold text-gray-800">{pair.from.name}</h4>
              <p className="text-yellow-600 text-lg">⭐ {pair.from.rating}</p>
              <p className="text-indigo-600 font-bold text-lg">
                ₹ {pair.from.price}
              </p>
              <p className="text-sm text-gray-500 mt-1">{pair.from.category}</p>
            </div>

            {/* RIGHT PRODUCT */}
            <div className="p-4 rounded-lg bg-gray-50 border text-center">
              <h4 className="font-semibold text-gray-800">{pair.to.name}</h4>
              <p className="text-yellow-600 text-lg">⭐ {pair.to.rating}</p>
              <p className="text-indigo-600 font-bold text-lg">
                ₹ {pair.to.price}
              </p>
              <p className="text-sm text-gray-500 mt-1">{pair.to.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
