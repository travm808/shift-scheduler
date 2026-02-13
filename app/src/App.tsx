import { useState } from 'react'
import { getAppName } from '@shift-scheduler/lib'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{getAppName()}</h1>
      <p>Welcome to the shift scheduler application!</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default App
