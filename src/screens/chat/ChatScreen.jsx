import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { detectFraud } from '../../utils/fraudDetection';
import toast from 'react-hot-toast';

const INITIAL_MESSAGES = [
  { id: 1, from: 'them', text: 'Moni! Is the phone still available?', time: '10:15 AM' },
  { id: 2, from: 'me', text: 'Yes still available! Are you in Lilongwe?', time: '10:16 AM' },
  { id: 3, from: 'them', text: 'Yes, Area 25. Can you do MK 45,000?', time: '10:17 AM' },
  { id: 4, from: 'me', text: "Best I can do is MK 48,000. It's brand new!", time: '10:18 AM' },
];

export default function ChatScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Fraud keyword detection
    const fraud = detectFraud(trimmed);
    if (fraud.isSuspicious) {
      toast.error('⚠️ Warning: ' + fraud.reason, { duration: 4000, style: { background: '#c0392b', color: 'white' } });
    }

    const newMsg = { id: Date.now(), from: 'me', text: trimmed, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setText('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'them', text: 'Let me think about that price 😊', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <div className="screen screen-white page-fade" style={{ height: '100vh' }}>
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 600 }}>John Phiri</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>✓ Verified Seller · Online</p>
        </div>
        <button className="header-action">⋮</button>
      </div>

      {/* Fraud warning */}
      <div className="fraud-warn">
        <span>⚠️</span>
        <p>Never share your password or pay outside the platform. Report suspicious requests immediately.</p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div className={`chat-bubble ${msg.from === 'me' ? 'bubble-me' : 'bubble-them'}`}>{msg.text}</div>
            <span style={{ fontSize: 10, color: 'var(--text3)', margin: '1px 4px' }}>{msg.time}{msg.from === 'me' && ' ✓✓'}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderTop: '0.5px solid var(--gray-border)', background: 'white', flexShrink: 0 }}>
        <button style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', padding: 4 }}>📎</button>
        <input
          style={{ flex: 1, padding: '9px 13px', border: '1.5px solid var(--gray-border)', borderRadius: 20, fontSize: 13, outline: 'none', fontFamily: 'var(--font)' }}
          placeholder="Message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          style={{ background: 'var(--green)', color: 'white', border: 'none', width: 38, height: 38, borderRadius: '50%', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          ➤
        </button>
      </div>
    </div>
  );
}
