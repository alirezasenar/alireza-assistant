// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });
    const { answer } = await res.json();
    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: answer }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>دستیار املاک</h1>
      <div style={{
        border: '1px solid #ccc',
        padding: 10,
        height: 300,
        overflowY: 'auto',
        marginBottom: 10
      }}>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role === 'user' ? 'شما' : 'دستیار'}:</strong> {m.content}
          </p>
        ))}
        {loading && <p>در حال پاسخ‌گویی...</p>}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && send()}
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={send} disabled={loading} style={{ marginLeft: 10 }}>
        ارسال
      </button>
    </div>
  );
}
