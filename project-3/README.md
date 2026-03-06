## Student Activity Manager

A small React + Vite + Bootstrap app to manage a list of students and their attendance status.

### Screenshot

<img width="815" height="945" alt="localhost_5174_" src="https://github.com/user-attachments/assets/b5fcee52-b52f-4240-8fa3-020d1788e200" />
 
### Tech stack

- **React** (with StrictMode)
- **Vite** for bundling/dev server
- **Bootstrap 5** and **react-bootstrap** for UI

### Features

- Add students with a simple form
- Auto-incrementing **Student ID** starting from 1
- Mark students as **Present** or **Absent**
- Optional detail view per student (shows Student ID)
- Summary counts for total, present, and absent students

### Getting started

1. **Install dependencies**

```bash
npm install
```

2. **Run the dev server**

```bash
npm run dev
```

3. Open the URL shown in the terminal (usually `http://localhost:5173`).

### Available scripts

- **`npm run dev`**: Start Vite dev server
- **`npm run build`**: Build for production
- **`npm run preview`**: Preview the production build locally
- **`npm run lint`**: Run ESLint on the project

### Project structure (src)

- `main.jsx` – App bootstrap and global CSS imports
- `App.jsx` – Main layout and state management
- `App.css` / `index.css` – Global styling and layout
- `components/StudentForm.jsx` – Form to add students
- `components/StudentList.jsx` – Student list and summary
- `components/StudentCard.jsx` – Individual student card (status/actions)


