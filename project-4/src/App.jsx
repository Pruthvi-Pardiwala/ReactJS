import './App.css'
import { useCallback, useMemo, useState } from 'react'
import FeedbackForm from './components/FeedbackForm.jsx'
import FeedbackList from './components/FeedbackList.jsx'

function App() {
  const [feedbackItems, setFeedbackItems] = useState([])

  const handleSubmitFeedback = useCallback((payload) => {
    const item = {
      id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
      ...payload,
    }
    setFeedbackItems((prev) => [item, ...prev])
  }, [])

  const stats = useMemo(() => {
    const byCategory = feedbackItems.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1
      return acc
    }, {})
    return { byCategory }
  }, [feedbackItems])

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <div className="brand">
            <div className="brand__mark" aria-hidden="true">
              CF
            </div>
            <div className="brand__text">
              <div className="brand__title">Customer Feedback System</div>
              <div className="brand__subtitle muted">Issue reporting • Validation • Dynamic fields</div>
            </div>
          </div>

          <div className="topbar__stats">
            <span className="badge badge--neutral">{feedbackItems.length} tickets</span>
            {Object.entries(stats.byCategory).map(([k, v]) => (
              <span className="badge badge--neutral" key={k}>
                {k}: {v}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="layout">
        <FeedbackForm onSubmitFeedback={handleSubmitFeedback} />
        <FeedbackList items={feedbackItems} />
      </main>

      <footer className="footer muted" />
    </div>
  )
}

export default App
