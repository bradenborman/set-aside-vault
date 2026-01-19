import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setError('Failed to connect to backend: ' + err.message))
  }, [])

  return (
    <div className="App">
      <h1>Set-Aside-Vault</h1>
      <h2>Image Gallery Application</h2>
      
      <div className="status">
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p style={{ color: 'green' }}>{message}</p>
        )}
      </div>
      
      <p>Deployment test successful! 🚀</p>
    </div>
  )
}

export default App
