"use client";

export default function ComboCard({ combo }) {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-green-50">
      <h2 className="text-xl font-bold text-green-700 mb-3">
        ✅ Best Product Combination (Knapsack)
      </h2>

      {combo.selected.length === 0 ? (
        <p>No combination available within this budget.</p>
      ) : (
        <div className="space-y-2">
          {combo.selected.map((p) => (
            <div key={p.id} className="border p-2 rounded bg-white">
              <p className="font-semibold text-gray-600">{p.name}</p>
              <p className="text-sm text-gray-600">
                ₹ {p.price} | ⭐ {p.rating}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 font-medium">
        <p className="text-gray-600">Total Price: ₹ {combo.total_price}</p>
        <p className="text-gray-600">
          Total Value Score: {combo.total_value.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
