import React, { useState } from 'react';
import { feedbackService } from '../services/api';
import { Star, X, Send } from 'lucide-react';

const FeedbackModal = ({ requestId, providerId, providerName, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await feedbackService.createFeedback({
        helpRequestId: requestId,
        rating,
        comment
      });
      alert("Thank you for your feedback!");
      onClose();
    } catch (err) {
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
      <div className="glass animate-fade-in" style={{ width: '90%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Rate your Helper</h2>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          How was your experience with <strong>{providerName}</strong>?
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                type="button" 
                onClick={() => setRating(star)}
                style={{ background: 'transparent' }}
              >
                <Star 
                  size={32} 
                  fill={star <= rating ? "var(--warning)" : "transparent"} 
                  color={star <= rating ? "var(--warning)" : "var(--text-muted)"} 
                  style={{ transition: 'all 0.2s' }}
                />
              </button>
            ))}
          </div>

          <textarea 
            className="input-field" 
            style={{ minHeight: '100px' }}
            placeholder="Write a short comment (optional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? 'Submitting...' : <><Send size={18} /> Submit Feedback</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
