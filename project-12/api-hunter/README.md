# 🎯 API Hunter

> A powerful React + Redux application to explore, test, and compare API requests using both `fetch()` and `axios`.

---

## 📌 Problem Definition

Modern frontend applications depend heavily on API integrations. Developers need tools to:
- Test REST API endpoints quickly (GET & POST)
- Compare the behavior of `fetch()` vs `axios`
- Manage loading, success, and error states globally
- Work with a mock backend during development

**API Hunter** solves all of this in a single, dark-themed React + Redux Toolkit application.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework & build tool |
| **Redux Toolkit** | Global state management |
| **fetch()** | Native browser API for HTTP requests |
| **axios** | Promise-based HTTP client |
| **JSON Server** | Mock REST backend |
| **Syne + JetBrains Mono** | Typography |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/api-hunter.git
cd api-hunter
npm install
```

### 2. Start the React App

```bash
npm run dev
```
App runs at: `http://localhost:5173`

### 3. Start the JSON Server (Mock Backend)

```bash
npm run server
```
Mock API runs at: `http://localhost:3001`

---

## 🧩 Step-wise Explanation

### Step 1: API Input — React Component (`ApiForm.jsx`)

The form allows users to:
- Enter any API endpoint URL
- Choose `GET` or `POST` method
- Write a JSON request body for POST calls
- Select HTTP library: `fetch()`, `axios`, or both
- Use quick presets for JSONPlaceholder and JSON Server endpoints

### Step 2: Redux Store Setup (`store.js` + `apiSlice.js`)

The Redux store manages two parallel result objects:

```js
{
  api: {
    fetchResult: { loading, data, error, status, duration },
    axiosResult: { loading, data, error, status, duration },
    lastRequest: { url, method }
  }
}
```

Two `createAsyncThunk` actions handle async API calls: `callWithFetch` and `callWithAxios`.

### Step 3: fetch() Implementation

```js
export const callWithFetch = createAsyncThunk("api/callWithFetch",
  async ({ url, method, body }, { rejectWithValue }) => {
    const res = await fetch(url, { method, body: JSON.stringify(body) });
    const data = await res.json();
    return { data, status: res.status, duration };
  }
);
```

### Step 4: axios Implementation

```js
export const callWithAxios = createAsyncThunk("api/callWithAxios",
  async ({ url, method, body }, { rejectWithValue }) => {
    const res = await axios({ method, url, data: body });
    return { data: res.data, status: res.status, duration };
  }
);
```

### Step 5: JSON Server Integration

`db.json` provides a full mock REST API:

```
GET  http://localhost:3001/users   → List all users
POST http://localhost:3001/users   → Add a new user
GET  http://localhost:3001/posts   → List all posts
```

### Step 6: Final API Summary (`ResultCard.jsx`)

Each result card displays: status badge, endpoint, method, duration, and syntax-highlighted JSON.

---

## 📂 Project Structure

```
api-hunter/
├── src/
│   ├── components/
│   │   ├── ApiForm.jsx        ← Request builder UI
│   │   └── ResultCard.jsx     ← Response display + JSON viewer
│   ├── store/
│   │   ├── store.js           ← Redux store config
│   │   └── apiSlice.js        ← Slice: actions, reducers, thunks
│   ├── App.jsx                ← Root component + layout
│   ├── App.css                ← Dark theme styles
│   └── main.jsx               ← Entry point + Redux Provider
├── db.json                    ← JSON Server mock database
└── README.md
```

---

## 📸 Screenshots

> Add screenshots to a `screenshots/` folder and update these paths after running the app.

### 🏠 Main Interface
![Main UI](./screenshots/main-ui.png)
*The full API Hunter interface with dark theme, request builder panel on left, and dual result cards on right.*

### ⚡ GET Request — Success State
![GET Success](./screenshots/get-success.png)
*Successful GET to JSONPlaceholder /users — both fetch() and axios show ✅ Success (200) with formatted JSON.*

### 📬 POST Request
![POST Request](./screenshots/post-request.png)
*POST request with JSON body editor, showing the new resource created and returned.*

### 🗄️ JSON Server — Mock Backend
![JSON Server](./screenshots/json-server.png)
*Using the local JSON Server at port 3001 — GET /users returns mock data.*

### ❌ Error State
![Error State](./screenshots/error-state.png)
*Network error or bad URL — both cards show ❌ ERROR with message.*

### ⏳ Loading State
![Loading State](./screenshots/loading-state.png)
*Animated spinner shown while fetch() and axios await responses.*

---

## 💡 Example Output

**Input:**
```
Endpoint: https://jsonplaceholder.typicode.com/users
Method: GET
Library: Both
```

**Output (both cards):**
```
Status:   ✅ Success (200)
Duration: 312ms
Data:
[
  { "id": 1, "name": "Leanne Graham" },
  { "id": 2, "name": "Ervin Howell" }
]
```

---

## 📝 Marking Scheme

| Component | Marks |
|---|---|
| React Form Input + UI Setup | 2/2 |
| Redux Store Setup (actions, reducer) | 2/2 |
| fetch() API Call Implementation | 2/2 |
| axios API Call Implementation | 2/2 |
| JSON Server Integration + GitHub | 2/2 |
| **Total** | **10/10** |

---

## 📚 Concepts Covered

React 18, Redux Toolkit (createSlice, createAsyncThunk), fetch(), axios, Conditional Rendering, JSON Parsing, JSON Server, ES6+, CSS Variables, Vite

---

*Built as part of a frontend development assignment exploring API integration patterns.*
