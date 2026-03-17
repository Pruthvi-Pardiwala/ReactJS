# Employee Management System (Offline CRUD)

React-based **offline-first** Employee Management System that demonstrates:

- React **state + props** and component communication
- Controlled forms with validation (**email / phone / salary**)
- **React Router** navigation
- **React Bootstrap** UI components
- Full **localStorage** persistence (no backend / no API)

## Features

- **Add employee** (controlled inputs + validation)
- **View employees** in a responsive table (status badge)
- **Edit employee** (form switches to Edit Mode)
- **Delete employee** (confirmation modal)
- **Clear all** records (confirmation modal + clears localStorage)

## Component / Module Overview

All UI components are inside `src/components/`:

- `EmployeeForm`: add/update form, validation, Add vs Edit mode
- `EmployeeList`: table rendering, empty state, delete/clear confirmations
- `EmployeeRow`: per-row rendering + Edit/Delete buttons (argument passing)
- `AppLayout`: navbar + routed layout wrapper

Supporting modules:

- `src/context/EmployeesContext.jsx`: shared app state provider
- `src/hooks/useEmployees.js`: CRUD + localStorage synchronization
- `src/lib/*`: storage helpers, employee model helpers, validation

## LocalStorage

- **Key**: `ems.employees.v1`
- **Format**: JSON array of employee objects

## How to Run

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Required Screenshots (add to `screenshots/`)

- Add Employee Form: <img width="531" height="349" alt="localhost_5173_ (1)" src="https://github.com/user-attachments/assets/e3f2ef9f-0237-4871-83b8-6be370cf6064" />
- Employee List Table: <img width="745" height="351" alt="localhost_5173_ (2)" src="https://github.com/user-attachments/assets/a45ea493-7896-4ef7-8e85-7278ca0ce3c8" />
- Delete Confirmation: <img width="563" height="245" alt="localhost_5173_ (3)" src="https://github.com/user-attachments/assets/65a46730-2da6-4b2d-8067-84a3bac51e76" />


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
