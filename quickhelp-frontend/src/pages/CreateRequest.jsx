import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpService } from '../services/api';
import { PlusCircle, FileText, MapPin, AlertCircle, Send } from 'lucide-react';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'GENERAL',
    urgency: 'MEDIUM',
    latitude: 0,
    longitude: 0,
    locationAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simulate getting location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationAddress: "Current Location"
        });
      }, () => {
        setError("Could not get your location. Please enable location services.");
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.latitude === 0) {
      setError("Please provide your location first.");
      return;
    }
    setLoading(true);
    try {
      await helpService.createRequest(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '700px', padding: '2rem 0' }}>
      <div className="glass animate-fade-in" style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', padding: '0.8rem', borderRadius: '12px' }}>
            <PlusCircle size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Request Help</h2>
            <p style={{ color: 'var(--text-muted)' }}>Tell the community what you need help with.</p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>What do you need help with?</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., Need help carrying groceries"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Category</label>
              <select 
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={{ appearance: 'none' }}
              >
                <option value="GENERAL">General</option>
                <option value="TRANSPORT">Transport</option>
                <option value="SHOPPING">Shopping</option>
                <option value="HOME">Home</option>
                <option value="EMERGENCY">Emergency</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Urgency Level</label>
              <select 
                className="input-field"
                value={formData.urgency}
                onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                style={{ appearance: 'none' }}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Detailed Description</label>
            <textarea 
              className="input-field" 
              style={{ minHeight: '120px', resize: 'vertical' }}
              placeholder="Describe the situation..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Location</label>
            <button 
              type="button" 
              onClick={handleGetLocation}
              style={{ 
                padding: '0.8rem',
                background: 'rgba(30, 41, 59, 0.4)', 
                border: '1px solid var(--border)', 
                borderRadius: '12px',
                color: formData.latitude !== 0 ? 'var(--secondary)' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <MapPin size={18} />
              {formData.latitude !== 0 ? "Location Captured" : "Get Current Location"}
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
            {loading ? 'Posting...' : <><Send size={18} /> Post Help Request</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
