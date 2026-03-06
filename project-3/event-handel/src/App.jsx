import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addStudent = (name) => {
    const newStudent = { id: nextId, name, status: 'Absent', showDetails: false };
    setStudents([...students, newStudent]);
    setNextId(nextId + 1);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s
    ));
  };

  const toggleDetails = (id) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, showDetails: !s.showDetails } : s
    ));
  };

  return (
    <div className="app-shell">
      <div className="container">
        <header className="app-header">
          <div>
            <h1 className="app-title">Student Activity Manager</h1>
            <p className="app-subtitle">Add students, mark attendance, and manage the list.</p>
          </div>
        </header>

        <div className="card shadow-sm mb-3">
          <div className="card-body">
            <StudentForm onAdd={addStudent} />
          </div>
        </div>

        <StudentList
          students={students}
          onDelete={deleteStudent}
          onToggleStatus={toggleStatus}
          onToggleDetails={toggleDetails}
        />
      </div>
    </div>
  );
}

export default App;