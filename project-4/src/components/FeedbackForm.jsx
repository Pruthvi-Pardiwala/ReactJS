import { useMemo, useRef, useState } from 'react'
import DynamicList from './DynamicList.jsx'

const CATEGORY_OPTIONS = ['', 'Bug', 'Suggestion', 'Complaint', 'Other']
const PRIORITY_OPTIONS = ['', 'Low', 'Medium', 'High']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

function trimOrEmpty(v) {
  return (v ?? '').toString().trim()
}

function validateAll(values) {
  const next = {
    fullName: '',
    email: '',
    category: '',
    priority: '',
    description: '',
    steps: [],
    improvements: [],
  }

  if (!trimOrEmpty(values.fullName)) next.fullName = 'Full name is required.'

  const email = trimOrEmpty(values.email)
  if (!email) next.email = 'Email is required.'
  else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email (e.g., name@company.com).'

  if (!trimOrEmpty(values.category)) next.category = 'Please select an issue category.'
  if (!trimOrEmpty(values.priority)) next.priority = 'Please select a priority level.'

  const desc = trimOrEmpty(values.description)
  if (!desc) next.description = 'Description is required.'
  else if (desc.length < 20) next.description = 'Description must be at least 20 characters.'

  next.steps = (values.steps || []).map((s) => (!trimOrEmpty(s) ? 'Step cannot be empty.' : ''))
  next.improvements = (values.improvements || []).map((s) =>
    !trimOrEmpty(s) ? 'Suggestion cannot be empty.' : '',
  )

  return next
}

function hasAnyErrors(errors) {
  return Boolean(
    errors.fullName ||
      errors.email ||
      errors.category ||
      errors.priority ||
      errors.description ||
      errors.steps.some(Boolean) ||
      errors.improvements.some(Boolean),
  )
}

export default function FeedbackForm({ onSubmitFeedback }) {

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    category: '',
    priority: '',
    description: '',
    steps: [''],
    improvements: [''],
  })

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    category: false,
    priority: false,
    description: false,
    steps: [],
    improvements: [],
  })

  const [focusedKey, setFocusedKey] = useState(null)

  const errors = useMemo(() => validateAll(values), [values])

  const canSubmit = useMemo(() => {
    if (hasAnyErrors(errors)) return false
    return (
      trimOrEmpty(values.fullName) &&
      trimOrEmpty(values.email) &&
      trimOrEmpty(values.category) &&
      trimOrEmpty(values.priority) &&
      trimOrEmpty(values.description)
    )
  }, [errors, values])

  function setField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function touch(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function touchList(listName, idx) {
    setTouched((prev) => {
      const nextList = [...(prev[listName] || [])]
      nextList[idx] = true
      return { ...prev, [listName]: nextList }
    })
  }

  function shouldShowError(fieldName) {
    return Boolean(touched[fieldName])
  }

  function shouldShowListError(listName, idx) {
    return Boolean((touched[listName] || [])[idx])
  }

  function resetForm() {
    setValues({
      fullName: '',
      email: '',
      category: '',
      priority: '',
      description: '',
      steps: [''],
      improvements: [''],
    })
    setTouched({
      fullName: false,
      email: false,
      category: false,
      priority: false,
      description: false,
      steps: [],
      improvements: [],
    })
    setFocusedKey(null)
  }

  function handleSubmit(e) {
    e.preventDefault()

    setTouched({
      fullName: true,
      email: true,
      category: true,
      priority: true,
      description: true,
      steps: values.steps.map(() => true),
      improvements: values.improvements.map(() => true),
    })

    if (!canSubmit) return


    const steps = (values.steps || []).map(trimOrEmpty).filter(Boolean)
    const improvements = (values.improvements || []).map(trimOrEmpty).filter(Boolean)

    onSubmitFeedback({
      fullName: trimOrEmpty(values.fullName),
      email: trimOrEmpty(values.email),
      category: values.category,
      priority: values.priority,
      description: trimOrEmpty(values.description),
      steps,
      improvements,
    })

    resetForm()
  }

  return (
    <section className="panel panel--sticky">
      <div className="panel__header">
        <div>
          <h1 className="h1">Customer feedback & issue reporting</h1>
          <p className="muted">
            Submit bugs, suggestions, complaints, and improvements. Required fields are validated in
            real time.
          </p>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className={`field ${focusedKey === 'fullName' ? 'field--focused' : ''}`}>
          <label className="label" htmlFor="fullName">
            Full name <span className="req">*</span>
          </label>
          <input
            id="fullName"
            className={`input ${shouldShowError('fullName') && errors.fullName ? 'input--error' : ''}`}
            type="text"
            value={values.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            onBlur={() => touch('fullName')}
            onFocus={() => setFocusedKey('fullName')}
            placeholder="e.g., Alex Johnson"
            autoComplete="name"
            aria-invalid={shouldShowError('fullName') && errors.fullName ? 'true' : 'false'}
          />
          {shouldShowError('fullName') && errors.fullName ? (
            <div className="errorText">{errors.fullName}</div>
          ) : null}
        </div>

        <div className={`field ${focusedKey === 'email' ? 'field--focused' : ''}`}>
          <label className="label" htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input
            id="email"
            className={`input ${shouldShowError('email') && errors.email ? 'input--error' : ''}`}
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => touch('email')}
            onFocus={() => setFocusedKey('email')}
            placeholder="name@company.com"
            autoComplete="email"
            aria-invalid={shouldShowError('email') && errors.email ? 'true' : 'false'}
          />
          {shouldShowError('email') && errors.email ? (
            <div className="errorText">{errors.email}</div>
          ) : null}
        </div>

        <div className="grid2">
          <div className={`field ${focusedKey === 'category' ? 'field--focused' : ''}`}>
            <label className="label" htmlFor="category">
              Issue category <span className="req">*</span>
            </label>
            <select
              id="category"
              className={`input ${shouldShowError('category') && errors.category ? 'input--error' : ''}`}
              value={values.category}
              onChange={(e) => setField('category', e.target.value)}
              onBlur={() => touch('category')}
              onFocus={() => setFocusedKey('category')}
              aria-invalid={shouldShowError('category') && errors.category ? 'true' : 'false'}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c || 'placeholder'} value={c}>
                  {c || 'Select…'}
                </option>
              ))}
            </select>
            {shouldShowError('category') && errors.category ? (
              <div className="errorText">{errors.category}</div>
            ) : null}
          </div>

          <div className={`field ${focusedKey === 'priority' ? 'field--focused' : ''}`}>
            <label className="label" htmlFor="priority">
              Priority <span className="req">*</span>
            </label>
            <select
              id="priority"
              className={`input ${shouldShowError('priority') && errors.priority ? 'input--error' : ''}`}
              value={values.priority}
              onChange={(e) => setField('priority', e.target.value)}
              onBlur={() => touch('priority')}
              onFocus={() => setFocusedKey('priority')}
              aria-invalid={shouldShowError('priority') && errors.priority ? 'true' : 'false'}
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p || 'placeholder'} value={p}>
                  {p || 'Select…'}
                </option>
              ))}
            </select>
            {shouldShowError('priority') && errors.priority ? (
              <div className="errorText">{errors.priority}</div>
            ) : null}
          </div>
        </div>

        <div className={`field ${focusedKey === 'description' ? 'field--focused' : ''}`}>
          <label className="label" htmlFor="description">
            Detailed description <span className="req">*</span>
          </label>
          <textarea
            id="description"
            className={`input input--textarea ${
              shouldShowError('description') && errors.description ? 'input--error' : ''
            }`}
            value={values.description}
            onChange={(e) => setField('description', e.target.value)}
            onBlur={() => touch('description')}
            onFocus={() => setFocusedKey('description')}
            placeholder="What happened? What did you expect? Include any context…"
            rows={5}
            aria-invalid={shouldShowError('description') && errors.description ? 'true' : 'false'}
          />
          <div className="helperRow">
            <span className="muted">{trimOrEmpty(values.description).length}/50</span>
          </div>
          {shouldShowError('description') && errors.description ? (
            <div className="errorText">{errors.description}</div>
          ) : null}
        </div>

        <DynamicList
          label="Steps to reproduce"
          items={values.steps}
          onChange={(next) => setField('steps', next)}
          addLabel="Add step"
          emptyItemPlaceholder="e.g., Click “Checkout”…"
          minItems={1}
          errors={values.steps.map((_, idx) => (shouldShowListError('steps', idx) ? errors.steps[idx] : ''))}
          onBlurItem={(idx) => touchList('steps', idx)}
          onFocusItem={() => setFocusedKey('steps')}
        />

        <DynamicList
          label="Suggested improvements"
          items={values.improvements}
          onChange={(next) => setField('improvements', next)}
          addLabel="Add suggestion"
          emptyItemPlaceholder="e.g., Add a confirmation modal…"
          minItems={1}
          errors={values.improvements.map((_, idx) =>
            shouldShowListError('improvements', idx) ? errors.improvements[idx] : '',
          )}
          onBlurItem={(idx) => touchList('improvements', idx)}
          onFocusItem={() => setFocusedKey('improvements')}
        />

        <div className="actions">
          <button type="submit" className="btn btn--primary" disabled={!canSubmit}>
            Submit feedback
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={resetForm}
            title="Clear all fields"
          >
            Reset
          </button>
        </div>

      </form>
    </section>
  )
}

