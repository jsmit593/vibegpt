'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCheckVibe() {
    setLoading(true)
    const res = await fetch('/api/vibe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: input })
    })

    const data = await res.json()
    setOutput(data.result)
    setLoading(false)
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>✨ VibeGPT ✨</h1>
      <p>Type your idea and check the vibe with AI.</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: '100%', marginTop: '1rem' }}
        placeholder="Your startup idea or thought here..."
      />
      <button
        onClick={handleCheckVibe}
        disabled={loading}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        {loading ? 'Checking...' : 'Check the Vibe'}
      </button>
      {output && (
        <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem' }}>
          <strong>AI says:</strong>
          <p>{output}</p>
        </div>
      )}
    </main>
  )
}
