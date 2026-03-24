import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'book-store:books:v1'

export const BOOK_TYPES = [
  'Fiction',
  'Non-fiction',
  'Biography',
  'Science',
  'History',
  'Fantasy',
  'Self-help',
]

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json)
    return v ?? fallback
  } catch {
    return fallback
  }
}

export function ensureSeedBooks() {
  const existing = getBooks()
  if (existing.length > 0) return

  const now = new Date().toISOString()
  const seeded = [
    {
      id: uuidv4(),
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt, David Thomas',
      type: 'Non-fiction',
      price: 39.99,
      publishedDate: '1999-10-20',
      imageUrl: '',
      createdAt: now,
      updatedAt: now,
    },
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
}

export function getBooks() {
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? safeParse(raw, []) : []
  return Array.isArray(parsed) ? parsed : []
}

function writeBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export function getBookById(id) {
  return getBooks().find((b) => b.id === id) ?? null
}

export function addBook(input) {
  const now = new Date().toISOString()
  const book = {
    id: uuidv4(),
    title: String(input.title ?? '').trim(),
    author: String(input.author ?? '').trim(),
    type: String(input.type ?? '').trim(),
    price: Number(input.price ?? 0),
    publishedDate: String(input.publishedDate ?? '').trim(),
    imageUrl: String(input.imageUrl ?? '').trim(),
    createdAt: now,
    updatedAt: now,
  }
  const next = [book, ...getBooks()]
  writeBooks(next)
  return book
}

export function updateBook(id, input) {
  const now = new Date().toISOString()
  const books = getBooks()
  const idx = books.findIndex((b) => b.id === id)
  if (idx === -1) return null

  const updated = {
    ...books[idx],
    title: String(input.title ?? '').trim(),
    author: String(input.author ?? '').trim(),
    type: String(input.type ?? '').trim(),
    price: Number(input.price ?? 0),
    publishedDate: String(input.publishedDate ?? '').trim(),
    imageUrl: String(input.imageUrl ?? '').trim(),
    updatedAt: now,
  }

  const next = [...books]
  next[idx] = updated
  writeBooks(next)
  return updated
}

export function deleteBook(id) {
  const next = getBooks().filter((b) => b.id !== id)
  writeBooks(next)
  return next
}

export function listBookTypes(books) {
  const s = new Set()
  for (const b of books) {
    if (b?.type) s.add(b.type)
  }
  return Array.from(s).sort((a, b) => a.localeCompare(b))
}

