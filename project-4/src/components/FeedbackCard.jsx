import { useMemo } from 'react'

function formatDateTime(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function badgeToneForPriority(priority) {
  if (priority === 'High') return 'badge--danger'
  if (priority === 'Medium') return 'badge--warn'
  return 'badge--ok'
}

export default function FeedbackCard({ feedback }) {
  const safeMailto = useMemo(() => {
    const email = (feedback.email || '').trim()
    return email ? `mailto:${email}` : null
  }, [feedback.email])

  return (
    <article className="ticket">
      <header className="ticket__header">
        <div className="ticket__title">
          <div className="ticket__name">{feedback.fullName}</div>
          <div className="ticket__meta">
            {safeMailto ? (
              <a href={safeMailto} className="link">
                {feedback.email}
              </a>
            ) : (
              <span className="muted">{feedback.email}</span>
            )}
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <time className="muted" dateTime={feedback.createdAt}>
              {formatDateTime(feedback.createdAt)}
            </time>
          </div>
        </div>

        <div className="ticket__badges">
          <span className="badge badge--info">{feedback.category}</span>
          <span className={`badge ${badgeToneForPriority(feedback.priority)}`}>
            {feedback.priority}
          </span>
        </div>
      </header>

      <section className="ticket__body">
        <div className="ticket__section">
          <div className="ticket__sectionLabel">Description</div>
          <p className="ticket__text">{feedback.description}</p>
        </div>

        {feedback.steps?.length ? (
          <div className="ticket__section">
            <div className="ticket__sectionLabel">Steps to reproduce</div>
            <ol className="ticket__list">
              {feedback.steps.map((s, i) => (
                <li key={`${feedback.id}-step-${i}`}>{s}</li>
              ))}
            </ol>
          </div>
        ) : null}

        {feedback.improvements?.length ? (
          <div className="ticket__section">
            <div className="ticket__sectionLabel">Suggested improvements</div>
            <ul className="ticket__list">
              {feedback.improvements.map((s, i) => (
                <li key={`${feedback.id}-imp-${i}`}>{s}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {feedback.additionalNotes ? (
          <div className="ticket__section">
            <div className="ticket__sectionLabel">Additional notes</div>
            <p className="ticket__text">{feedback.additionalNotes}</p>
          </div>
        ) : null}
      </section>
    </article>
  )
}

