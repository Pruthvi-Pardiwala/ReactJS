import StudentCard from './StudentCard';

export default function StudentList({ students, onDelete, onToggleStatus, onToggleDetails }) {
  if (!students?.length) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="fw-semibold">No students yet</div>
          <div className="text-muted">Add a student above to get started.</div>
        </div>
      </div>
    );
  }

  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.length - presentCount;

  return (
    <section className="pb-4">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
        <h2 className="h5 mb-0">Students</h2>
        <div className="text-muted small">
          Total: <span className="fw-semibold">{students.length}</span> · Present:{' '}
          <span className="fw-semibold">{presentCount}</span> · Absent:{' '}
          <span className="fw-semibold">{absentCount}</span>
        </div>
      </div>

      <div className="row g-3">
        {students.map((student) => (
          <div className="col-12" key={student.id}>
            <StudentCard
              student={student}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onToggleDetails={onToggleDetails}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
