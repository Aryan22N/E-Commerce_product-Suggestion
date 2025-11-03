"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getRecommendation, searchProducts, getFilteredMST } from "@/lib/api";
import ComboCard from "@/components/ComboCard";
import ProductCard from "@/components/ProductCard";
import MSTGraph from "@/components/MSTGraph";

export default function ResultPage() {
  const params = useSearchParams();

  const budget = params.get("budget");
  const category = params.get("category");
  const rating = params.get("rating");
  const query = params.get("query");

  const [combo, setCombo] = useState(null);
  const [products, setProducts] = useState([]);
  const [mst, setMSTData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);

      try {
        const [comboData, productsData] = await Promise.all([
          getRecommendation({
            budget: Number(budget),
            category,
            min_rating: Number(rating),
            query,
          }),
          searchProducts({
            query,
            category,
            max_price: Number(budget),
            min_rating: Number(rating),
          }),
        ]);

        setCombo(comboData);
        setProducts(productsData.products);

        // ✅ Now fetch MST for ONLY knapsack-selected products
        if (comboData.selected && comboData.selected.length > 0) {
          const mstFiltered = await getFilteredMST(
            comboData.selected.map((p) => p.id)
          );
          setMSTData(mstFiltered.mst);
        } else {
          setMSTData([]);
        }
      } catch (e) {
        console.error("Error fetching results:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [budget, category, rating, query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-lg font-medium text-gray-700">
          Fetching the best recommendations...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 text-center mb-4">
          🚨 Failed to Load Results
        </h1>
        <p className="text-center text-red-500">
          There was an issue fetching the product data. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            🛍️ Your Personalized Recommendations
          </h1>
        </header>

        {combo && (
          <section className="mb-12 p-6 bg-white rounded-xl shadow-2xl border-t-4 border-indigo-600">
            <h2 className="text-2xl font-bold text-gray-600 mb-6">
              ⭐ Best Value Combo
            </h2>
            <ComboCard combo={combo} />
          </section>
        )}

        <section className="mb-12 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-600 mb-6">
            📦 Explore Filtered Products
            <span className="ml-3 text-base font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {products.length} Items
            </span>
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 text-gray-600 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed">
              <p className="text-lg text-gray-900">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </section>

        <section className="mb-12 p-6 bg-white rounded-xl shadow-lg border-b-4 border-teal-500">
          <h2 className="text-2xl text-gray-600 font-bold mb-6">
            🔗 Product Similarity Network (MST)
          </h2>
          <MSTGraph mst={mst} />
        </section>
      </div>
    </div>
  );
}
