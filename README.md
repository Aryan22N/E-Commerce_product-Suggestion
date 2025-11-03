---

# ✅ **README.md (Complete & Clean Version)**

```md
# 🛒 AI-Powered Product Recommendation System  
### Built using **Next.js + Flask + DAA Algorithms**

This project is an AI-enhanced product recommendation engine that helps users find the **best combination of products** within their budget and also provides **similar product suggestions** using graph algorithms.

Developed as part of our academic work, it demonstrates practical usage of  
✅ Dynamic Programming  
✅ Greedy Algorithms  
✅ Graph-Theory (Minimum Spanning Tree)  
✅ Real-World Product Filtering & Recommendation Logic

---

## 🚀 Features

### ✅ **1. Smart Product Filtering**

Users can filter products based on:

- Keywords
- Category
- Price range
- Minimum Rating

---

### ✅ **2. Best Product Combo (Knapsack Algorithm)**

Uses **0/1 Knapsack (Dynamic Programming)** to calculate:

- Best combination of items under budget
- Maximum product value based on rating
- Optimized selection for the user

---

### ✅ **3. Similar Product Network (MST Algorithm)**

Uses **Kruskal’s Minimum Spanning Tree** to show:

- Most similar product pairs
- Based on tags, price similarity & category
- Great for cross-recommendations

---

### ✅ **4. Clean & Responsive UI**

Built with:

- Next.js (App Router)
- Tailwind CSS
- Reusable UI components
- Fast and smooth UX

---

## 🧠 **Algorithms Used**

### ✅ **1. Product Filtering**

Filtering by:

- Category
- Tags
- Rating
- Maximum price

### ✅ **2. Knapsack Algorithm (0/1 DP)**

Finds the optimal product combination that fits the budget.

### ✅ **3. Product Similarity (Custom Function)**

Similarity calculated using:

- **Tag matching** (Jaccard index)
- **Category match**
- **Price closeness**

### ✅ **4. Kruskal MST**

Forms the simplest similarity graph connecting similar products.

---

## 📁 Folder Structure

```

project/
│── backend/
│   ├── backend.py
│   ├── products.py
│   ├── requirements.txt
│   └── README.md
│
│── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   └── result/page.js
│   │   ├── components/
│   │   │   ├── InputField.js
│   │   │   ├── SelectField.js
│   │   │   ├── ProductCard.js
│   │   │   ├── ComboCard.js
│   │   │   └── MSTGraph.js
│   │   └── lib/api.js
│   └── package.json
│
└── README.md

```

---

## 🔧 Backend Setup (Flask)

### ✅ 1. Create Virtual Environment

```

python -m venv venv
venv\Scripts\activate   # Windows

```

### ✅ 2. Install Dependencies

```

pip install -r requirements.txt

```

### ✅ 3. Run Server

```

python backend.py

```

Runs at:  
👉 http://localhost:8000

---

## 💻 Frontend Setup (Next.js)

### ✅ 1. Install Dependencies

```

npm install

```

### ✅ 2. Run Frontend

```

npm run dev

```

Runs at:  
👉 http://localhost:3000

---

## 📡 API Endpoints

### ✅ **GET /products**

Fetch all products.

### ✅ **POST /search**

Body:

```json
{
  "query": "bag",
  "category": "Bags",
  "max_price": 2000,
  "min_rating": 4
}
```

### ✅ **POST /recommend**

Runs the knapsack algorithm.

### ✅ **POST /mst_filtered**

Returns MST similarity only for selected products.

---

## 👨‍💻 Team Members

| Name                | 
| ------------------- | 
| **Aryan Nandanwar** |
|  **Pranav Shende**  | 
| **Krishna Jajoo**   | 
 
 
---

## 🤝 Contributions & Suggestions

We are **open for recommendations, improvements, and contributions** from anyone!
If you have ideas to make the project better, feel free to open an issue or contribute. ✨

---
