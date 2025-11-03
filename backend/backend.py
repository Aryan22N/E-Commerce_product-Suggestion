from flask import Flask, jsonify, request
from flask_cors import CORS
import math

from products import PRODUCTS

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------
# Filtering (Binary-search-friendly sorted list)
# -------------------------------------------------------
def filter_products(products, category=None, max_price=None, min_rating=None, query=None):
    out = []
    q = query.lower().strip() if query else None

    for p in products:
        if category and p["category"].lower() != category.lower():
            continue
        if max_price and p["price"] > max_price:
            continue
        if min_rating and p["rating"] < min_rating:
            continue
        if q and q not in p["name"].lower() and q not in " ".join(p["tags"]).lower():
            continue

        out.append(p)

    return out

# -------------------------------------------------------
# 0/1 Knapsack (Dynamic Programming)
# -------------------------------------------------------
def knapsack_best_combo(products, budget):
    n = len(products)
    if n == 0:
        return {"selected": [], "total_price": 0, "total_value": 0}

    dp = [0] * (budget + 1)
    parent = [[False]*(budget+1) for _ in range(n)]

    values = [int(p["rating"] * 100) for p in products]
    weights = [p["price"] for p in products]

    for i in range(n):
        for w in range(budget, weights[i] - 1, -1):
            if dp[w - weights[i]] + values[i] > dp[w]:
                dp[w] = dp[w - weights[i]] + values[i]
                parent[i][w] = True

    selected = []
    w = budget

    for i in range(n-1, -1, -1):
        if w >= weights[i] and parent[i][w]:
            selected.append(products[i])
            w -= weights[i]

    selected.reverse()

    return {
        "selected": selected,
        "total_price": sum(p["price"] for p in selected),
        "total_value": sum(p["rating"] for p in selected)
    }

# -------------------------------------------------------
# Similarity (Jaccard + Category + Price closeness)
# -------------------------------------------------------
def similarity_weight(a, b):
    tagsA = set(a["tags"])
    tagsB = set(b["tags"])

    if tagsA.union(tagsB):
        j = len(tagsA.intersection(tagsB)) / len(tagsA.union(tagsB))
    else:
        j = 0

    category_match = 1 if a["category"] == b["category"] else 0
    price_diff = abs(a["price"] - b["price"]) / max(a["price"], b["price"], 1)

    similarity = 0.6*j + 0.3*category_match + 0.1*(1 - price_diff)
    return 1 - similarity  # lower = more similar

# -------------------------------------------------------
# Kruskal MST (Greedy)
# -------------------------------------------------------
class UnionFind:
    def __init__(self, n):
        self.p = list(range(n))

    def find(self, x):
        while self.p[x] != x:
            x = self.p[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.p[rb] = ra
            return True
        return False

def kruskal_mst(products):
    edges = []
    n = len(products)

    for i in range(n):
        for j in range(i+1, n):
            w = similarity_weight(products[i], products[j])
            edges.append((w, products[i]["id"], products[j]["id"]))

    # sort by weight
    edges.sort()
    uf = UnionFind(n)
    mst = []

    index_map = {p["id"]: idx for idx, p in enumerate(products)}

    for w, u_id, v_id in edges:
        if uf.union(index_map[u_id], index_map[v_id]):
            mst.append((u_id, v_id, round(w, 4)))
        if len(mst) == n - 1:
            break

    return mst

# -------------------------------------------------------
# API ROUTES
# -------------------------------------------------------

@app.route("/health")
def health():
    return jsonify({"status": "ok", "products_count": len(PRODUCTS)})

@app.route("/products", methods=["GET"])
def get_products():
    return jsonify({"products": PRODUCTS})

@app.route("/search", methods=["POST"])
def search():
    data = request.json
    min_rating = data.get("min_rating")

    # ✅ Force rating between 1 and 5
    if min_rating is not None:
        min_rating = max(1.0, min(5.0, float(min_rating)))

    res = filter_products(
        PRODUCTS,
        category=data.get("category"),
        max_price=data.get("max_price"),
        min_rating=min_rating,
        query=data.get("query")
    )
    return jsonify({"products": res})


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    category = data.get("category")
    min_rating = data.get("min_rating")
    budget = data.get("budget")
    query = data.get("query")

    # ✅ Force rating between 1 and 5
    if min_rating is not None:
        min_rating = max(1.0, min(5.0, float(min_rating)))

    prods = filter_products(
        PRODUCTS,
        category=category,
        max_price=None,
        min_rating=min_rating,
        query=query
    )

    result = knapsack_best_combo(prods, budget)
    return jsonify(result)


# -------------------------------------------------------
# ✅ NEW: MST for *only selected knapsack products*
# -------------------------------------------------------
@app.route("/mst_filtered", methods=["POST"])
def mst_filtered():
    data = request.json
    ids = data.get("product_ids", [])

    selected_products = [p for p in PRODUCTS if p["id"] in ids]

    mst_edges = kruskal_mst(selected_products)

    id_to_product = {p["id"]: p for p in selected_products}

    formatted = [
        {
            "from": id_to_product[u],
            "to": id_to_product[v]
        }
        for u, v, w in mst_edges
    ]

    return jsonify({"mst": formatted})




# -------------------------------------------------------
# Run server
# -------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)


