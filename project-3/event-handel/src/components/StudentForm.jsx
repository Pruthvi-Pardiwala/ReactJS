import { useId, useMemo, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function StudentForm({ onAdd }) {
  const inputId = useId();
  const [name, setName] = useState('');

  const trimmed = useMemo(() => name.trim(), [name]);
  const canSubmit = trimmed.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd(trimmed);
    setName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label htmlFor={inputId} className="fw-semibold">
        Add student
      </Form.Label>
      <InputGroup>
        <Form.Control
          id={inputId}
          value={name}
          placeholder="Type a student name…"
          onChange={(e) => setName(e.target.value)}
          aria-label="Student name"
        />
        <Button type="submit" variant="primary" disabled={!canSubmit}>
          Add
        </Button>
      </InputGroup>
      <Form.Text className="text-muted">Tip: press Enter to add quickly.</Form.Text>
    </Form>
  );
}
