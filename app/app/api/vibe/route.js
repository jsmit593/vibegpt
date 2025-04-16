export async function POST(req) {
  const { prompt } = await req.json()

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful, funny startup idea vibe checker. Respond with short, honest opinions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })

  const data = await response.json()
  const result = data.choices?.[0]?.message?.content || 'No vibe detected. Try again.'

  return Response.json({ result })
}
