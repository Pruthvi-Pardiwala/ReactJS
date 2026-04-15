# Smart Leave Management System

Industry-ready Leave Management web app built with **Vite + React**, **Redux Toolkit**, and **Redux Thunks**.

## Screenshot

Place a screenshot at `docs/screenshot.png`, then it will render here:

![Smart Leave Management Dashboard](docs/screenshot.png)

## Features

- **Apply Leave**: Sick, Casual, Emergency, Vacation, Half-Day
- **View Leave Records**: card layout with status + duration
- **Update Leave Details**: edit type, dates, reason
- **Delete Leave Request**
- **Leave Status Management**: Pending / Approved / Rejected / Cancelled
- **Search & Filter**: by employee name, leave type, status, reason
- **Async flows**: loading + error handling via thunks (demo persistence via `localStorage`)

## Tech Stack

- **Frontend**: React (Vite)
- **State**: Redux Toolkit, React-Redux
- **Async**: Thunks (`createAsyncThunk`)
- **Styling**: Tailwind CSS (custom brand palette)

## Project Structure

```text
src/
  app/
    store.js
  features/
    leaveSlice.js
  components/
    AddLeave.jsx
    LeaveList.jsx
    LeaveCard.jsx
    SearchFilter.jsx
  pages/
    Dashboard.jsx
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Notes

- Data is stored in **browser localStorage** (demo mode).
- IDs are generated using `crypto.randomUUID()` when available (with a fallback).
