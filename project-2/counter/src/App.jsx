import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='card' id=" container">
      <p>Current Counter</p>
      <h1 className='count-text'>{count}</h1>
      
      <div className="button-group">
        <button className='text6' onClick={() => setCount((prev) => prev - 1)}>
          ▾
        </button>
        <button className='text6' onClick={() => setCount((prev) => prev + 1)}>
          ▴
        </button>
      </div>
    </div>
  )
}

export default App