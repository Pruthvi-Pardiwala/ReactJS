import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row, Stack } from 'react-bootstrap'
import RecordForm from './components/RecordForm.jsx'
import RecordList from './components/RecordList.jsx'
import { loadRecords, saveRecords } from './utils/storage.js'
import './App.css'

function App() {
  const [records, setRecords] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false)

  useEffect(() => {
    setRecords(loadRecords())
  }, [])

  useEffect(() => {
    saveRecords(records)
  }, [records])

  const editingRecord = useMemo(() => {
    if (!editingId) return null
    return records.find((r) => r.id === editingId) ?? null
  }, [editingId, records])

  const summary = useMemo(() => {
    const total = records.length
    return { total }
  }, [records])

  function handleUpsert(recordDraft) {
    const now = Date.now()

    if (editingId) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, ...recordDraft, updatedAt: now } : r,
        ),
      )
      setEditingId(null)
      return
    }

    const newRecord = {
      id: crypto.randomUUID(),
      ...recordDraft,
      createdAt: now,
      updatedAt: now,
    }
    setRecords((prev) => [newRecord, ...prev])
  }

  function startEdit(id) {
    setEditingId(id)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  function requestDelete(id) {
    setDeleteConfirmId(id)
  }

  function deleteRecord(id) {
    setRecords((prev) => prev.filter((r) => r.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function clearAllRecords() {
    setRecords([])
    setEditingId(null)
  }

  return (
    <>
      <Container className="py-4">
        <Stack direction="horizontal" gap={2} className="mb-3">
          <div>
            <h1 className="h3 mb-0 app-title">LocalBox Miner</h1>
            <div className="text-muted small">
              Offline CRUD dashboard (React state + localStorage)
            </div>
          </div>
          <div className="ms-auto" />
          <Button
            variant="outline-danger"
            onClick={() => setShowClearAllConfirm(true)}
            disabled={records.length === 0}
          >
            Clear All
          </Button>
        </Stack>

        <Row className="g-3">
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <RecordForm
                  mode={editingId ? 'edit' : 'add'}
                  initialValue={editingRecord}
                  onSubmit={handleUpsert}
                  onCancelEdit={cancelEdit}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Row className="g-3">
              <Col md={6}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="text-muted small">Total Records</div>
                    <div className="fs-3 fw-semibold">{summary.total}</div>
                  </Card.Body>
                </Card>
              </Col>
              {/* <Col md={6}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="text-muted small">Last Added / Updated</div>
                    <div className="fw-semibold text-truncate">
                      {summary.lastAdded ? summary.lastAdded.title : '—'}
                    </div>
                    <div className="text-muted small text-truncate">
                      {summary.lastAdded ? summary.lastAdded.category : 'No data yet'}
                    </div>
                  </Card.Body>
                </Card>
              </Col> */}
              {/* <Col md={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="text-muted small">Stored in Browser</div>
                    <div className="fs-3 fw-semibold">{summary.bytes} B</div>
                    <div className="text-muted small">localStorage</div>
                  </Card.Body>
                </Card>
              </Col> */}

              <Col xs={12}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <RecordList
                      records={records}
                      editingId={editingId}
                      onEdit={startEdit}
                      onDelete={requestDelete}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal
        show={deleteConfirmId !== null}
        onHide={() => setDeleteConfirmId(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete record?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action can’t be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteRecord(deleteConfirmId)
              setDeleteConfirmId(null)
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showClearAllConfirm}
        onHide={() => setShowClearAllConfirm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Clear all records?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will permanently remove all stored records from the dashboard and
          localStorage.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearAllConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              clearAllRecords()
              setShowClearAllConfirm(false)
            }}
          >
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App