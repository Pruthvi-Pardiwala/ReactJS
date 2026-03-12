import FeedbackCard from './FeedbackCard.jsx'

export default function FeedbackList({ items }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <h2 className="h2">Feedback dashboard</h2>
          <p className="muted">New submissions appear instantly, like a support ticket queue.</p>
        </div>
        <div className="panel__count">
          <span className="badge badge--neutral">{items.length} total</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="emptyState">
          <div className="emptyState__title">No feedback yet</div>
          <div className="muted">Submit the form to create your first ticket.</div>
        </div>
      ) : (
        <div className="tickets">
          {items.map((f) => (
            <FeedbackCard key={f.id} feedback={f} />
          ))}
        </div>
      )}
    </section>
  )
}

