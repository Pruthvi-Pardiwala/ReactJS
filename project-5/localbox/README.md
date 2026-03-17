## LocalBox Miner (React + Vite + React-Bootstrap)

LocalBox Miner is a **React-based offline data management dashboard** that teaches:
- **React state + props**
- **CRUD operations**
- **Event handling** (`onChange`, `onSubmit`, `onClick`)
- **Conditional rendering**
- **localStorage persistence** (no backend / no API)

All data is stored in the browser’s **localStorage** and the UI updates instantly via React state.

## Features
- **Add records** with controlled form inputs + validation feedback
- **Edit records** (switches the form into Edit Mode)
- **Delete records** with confirmation modal
- **Clear all records** with confirmation modal
- **Dashboard summary**: total records, last added/updated, storage size (bytes)

## Component modules
- **`src/components/RecordForm.jsx`**
  - Controlled inputs (`onChange`)
  - Add / Edit modes
  - Basic validation + error UI
  - `onSubmit` upsert handler
- **`src/components/RecordList.jsx`**
  - Conditional empty state (“No Records Found”)
  - Table layout and list rendering
- **`src/components/RecordRow.jsx`**
  - Row rendering with **Edit/Delete** buttons
  - Demonstrates **argument passing** to handlers (`onEdit(id)`, `onDelete(id)`)
- **`src/utils/storage.js`**
  - `loadRecords()` reads from localStorage on mount
  - `saveRecords(records)` persists changes

## LocalStorage
- **Key**: `localbox.records`
- **Format**: JSON array of record objects

## Tech stack
- React + Vite
- React-Bootstrap + Bootstrap
- localStorage (browser)

## How to run
```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Required screenshots (add to `./screenshots/`)
- `screenshots/add-record-form.png`
- `screenshots/record-list.png`
- `screenshots/edit-mode.png`
- `screenshots/delete-confirmation.png`
- `screenshots/localstorage-devtools.png` (optional)

## Notes / constraints
- **No backend** and **no external API**
- Data resets **only** when you click **Clear All**
