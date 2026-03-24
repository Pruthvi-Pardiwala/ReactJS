import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteBook, getBooks, listBookTypes } from '../lib/booksStorage.js'

const SORT_OPTIONS = [
  { value: 'title_asc', label: 'Title A → Z' },
  { value: 'title_desc', label: 'Title Z → A' },
  { value: 'price_asc', label: 'Price Low → High' },
  { value: 'price_desc', label: 'Price High → Low' },
]

function getSafeUrl(url) {
  const s = String(url ?? '').trim()
  if (!s) return ''
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:'))
    return s
  return ''
}

function formatMoney(n) {
  const v = Number(n)
  if (!Number.isFinite(v)) return '-'
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function ViewBooksPage() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sort, setSort] = useState('title_asc')
  const [tick, setTick] = useState(0)

  const books = useMemo(() => {
    tick
    return getBooks()
  }, [tick])

  const types = useMemo(() => listBookTypes(books), [books])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let rows = books

    if (typeFilter !== 'All') {
      rows = rows.filter((b) => b.type === typeFilter)
    }

    if (q) {
      rows = rows.filter((b) => {
        const hay = `${b.title} ${b.author} ${b.type}`.toLowerCase()
        return hay.includes(q)
      })
    }

    const byTitle = (a, b) => String(a.title).localeCompare(String(b.title))
    const byPrice = (a, b) => Number(a.price) - Number(b.price)

    const sorted = [...rows]
    if (sort === 'title_asc') sorted.sort(byTitle)
    if (sort === 'title_desc') sorted.sort((a, b) => byTitle(b, a))
    if (sort === 'price_asc') sorted.sort(byPrice)
    if (sort === 'price_desc') sorted.sort((a, b) => byPrice(b, a))

    return sorted
  }, [books, query, sort, typeFilter])

  function refresh() {
    setTick((x) => x + 1)
  }

  function handleDelete(book) {
    const ok = window.confirm(`Delete "${book.title}"?`)
    if (!ok) return
    deleteBook(book.id)
    refresh()
  }

  const activeCount = filtered.length
  const totalCount = books.length

  return (
    <div>
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3">
        <div>
          <h2 className="h4 mb-1">View Books</h2>
          <div className="text-body-secondary">
            Search, filter, sort — then edit or delete a book.
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button as={Link} to="/books/new" variant="primary">
            + Add Book
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm mb-3">
        <Card.Body className="p-3 p-md-4">
          <Row className="g-3 align-items-end">
            <Col md={5}>
              <Form.Label className="fw-semibold">Search</Form.Label>
              <InputGroup>
                <Form.Control
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, author, type..."
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuery('')}
                  disabled={!query}
                >
                  Clear
                </Button>
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Filter by Type</Form.Label>
                <Form.Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Sort</Form.Label>
                <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3 d-flex flex-wrap align-items-center gap-2">
            <Badge bg="secondary">
              Showing {activeCount} of {totalCount}
            </Badge>
            {(query || typeFilter !== 'All' || sort !== 'title_asc') && (
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => {
                  setQuery('')
                  setTypeFilter('All')
                  setSort('title_asc')
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 56 }}>#</th>
                  <th style={{ width: 90 }}>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Type</th>
                  <th className="text-end">Price</th>
                  <th>Published</th>
                  <th style={{ width: 210 }} className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-body-secondary">
                      No books found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b, i) => (
                    <tr key={b.id}>
                      <td>{i + 1}</td>
                      <td>
                        {getSafeUrl(b.imageUrl) ? (
                          <a
                            href={getSafeUrl(b.imageUrl)}
                            target="_blank"
                            rel="noreferrer"
                            title="Open image"
                          >
                            <img
                              src={getSafeUrl(b.imageUrl)}
                              alt={b.title}
                              style={{
                                width: 56,
                                height: 56,
                                objectFit: 'cover',
                                borderRadius: 10,
                                border: '1px solid rgba(0,0,0,.08)',
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          </a>
                        ) : (
                          <div
                            className="bg-light d-inline-flex align-items-center justify-content-center"
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: 10,
                              border: '1px solid rgba(0,0,0,.08)',
                              color: '#6c757d',
                              fontSize: 12,
                            }}
                            title="No image"
                          >
                            N/A
                          </div>
                        )}
                      </td>
                      <td className="fw-semibold">{b.title}</td>
                      <td>{b.author}</td>
                      <td>
                        <Badge bg="info" text="dark">
                          {b.type}
                        </Badge>
                      </td>
                      <td className="text-end">{formatMoney(b.price)}</td>
                      <td>{b.publishedDate || '-'}</td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <Button
                            as={Link}
                            to={`/books/${b.id}/edit`}
                            size="sm"
                            variant="outline-primary"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(b)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

