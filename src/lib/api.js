export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// ✅ Get sorted products
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

// ✅ Search products
export async function searchProducts(data) {
  const res = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ✅ Get Knapsack Recommendation
export async function getRecommendation(data) {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ✅ (OLD) Get full MST (not used anymore)
export async function getMST() {
  const res = await fetch(`${API_BASE}/mst`);
  return res.json();
}

// ✅ NEW — Get MST for selected Knapsack products
export async function getFilteredMST(productIds) {
  const res = await fetch(`${API_BASE}/mst_filtered`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_ids: productIds,
    }),
  });
  return res.json();
}
