import React, { useState, useEffect, useRef } from 'react';
import { messageService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Send, X, MessageSquare } from 'lucide-react';

const ChatBox = ({ requestId, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [requestId]);

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async () => {
    try {
      const data = await messageService.getMessages(requestId);
      setMessages(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const sentMsg = await messageService.sendMessage({
        requestId,
        content: newMessage
      });
      setMessages([...messages, sentMsg]);
      setNewMessage('');
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="glass animate-fade-in" style={{ 
      position: 'fixed', 
      bottom: '2rem', 
      right: '2rem', 
      width: '350px', 
      height: '450px', 
      zIndex: 1000, 
      display: 'flex', 
      flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '1rem', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={18} />
          <span style={{ fontWeight: '600' }}>Chat Support</span>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', color: 'white' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading chat...</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ 
              alignSelf: msg.senderId === user.id ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}>
              <div style={{ 
                padding: '0.6rem 1rem', 
                borderRadius: '12px', 
                background: msg.senderId === user.id ? 'var(--primary)' : 'rgba(148, 163, 184, 0.1)',
                color: msg.senderId === user.id ? 'white' : 'var(--text-main)',
                fontSize: '0.9rem'
              }}>
                {msg.content}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem', textAlign: msg.senderId === user.id ? 'right' : 'left' }}>
                {msg.senderName} • {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ padding: '0.5rem 1rem' }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '0.5rem' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
