import React, { useState, useEffect } from 'react';
import { helpService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, CheckCircle2, User, MessageCircle, Star } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import FeedbackModal from '../components/FeedbackModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeRequests, setActiveRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'my'
  const [selectedChat, setSelectedChat] = useState(null);
  const [feedbackTarget, setFeedbackTarget] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [active, my] = await Promise.all([
        helpService.getAllRequests(),
        helpService.getMyRequests()
      ]);
      setActiveRequests(active);
      setMyRequests(my);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await helpService.acceptRequest(id);
      fetchData();
    } catch (err) {
      alert("Failed to accept request");
    }
  };

  const handleComplete = async (id) => {
    try {
      await helpService.completeRequest(id);
      fetchData();
    } catch (err) {
      alert("Failed to complete request");
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return 'var(--text-muted)';
    }
  };

  const RequestCard = ({ request, isOwner }) => (
    <div className="glass animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: request.status === 'ACCEPTED' ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            {request.status === 'ACCEPTED' && (
              <span style={{ fontSize: '0.6rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '20px', background: 'var(--primary)', color: 'white' }}>ACCEPTED</span>
            )}
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '20px', background: 'rgba(148, 163, 184, 0.1)', color: 'var(--text-muted)' }}>{request.category}</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '20px', background: `${getUrgencyColor(request.urgency)}20`, color: getUrgencyColor(request.urgency) }}>{request.urgency}</span>
          </div>
          <h3 style={{ fontSize: '1.25rem' }}>{request.title}</h3>
        </div>
        <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
          <MapPin size={14} />
          <span>{request.latitude?.toFixed(2)}, {request.longitude?.toFixed(2)}</span>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{request.description}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={14} />
          </div>
          <span style={{ fontSize: '0.85rem' }}>{request.creator?.fullName || 'Anonymous'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>
          <Clock size={14} />
          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        {request.status === 'OPEN' && !isOwner && (
          <button onClick={() => handleAccept(request.id)} className="btn-primary" style={{ flex: 1 }}>Accept</button>
        )}
        
        {request.status === 'ACCEPTED' && (isOwner || request.helper?.id === user?.id) && (
          <button onClick={() => setSelectedChat(request.id)} className="glass" style={{ flex: 1, padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
            <MessageCircle size={18} /> Chat
          </button>
        )}

        {request.status === 'ACCEPTED' && request.helper?.id === user?.id && (
          <button onClick={() => handleComplete(request.id)} style={{ flex: 1.5, background: 'var(--success)', borderRadius: '12px', color: 'white', fontWeight: '600' }}>Complete</button>
        )}
        
        {request.status === 'COMPLETED' && isOwner && (
           <button onClick={() => setFeedbackTarget(request)} className="glass" style={{ flex: 1, color: 'var(--warning)', borderColor: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
             <Star size={18} fill="var(--warning)" /> Rate Helper
           </button>
        )}

        {request.status === 'COMPLETED' && !isOwner && (
          <div style={{ flex: 1, textAlign: 'center', padding: '0.6rem', background: 'rgba(148, 163, 184, 0.1)', color: 'var(--text-muted)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={18} /> Done
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Hello, {user?.fullName}</p>
        </div>
        <div className="glass" style={{ display: 'flex', padding: '0.3rem', borderRadius: '14px' }}>
          <button onClick={() => setActiveTab('browse')} style={{ padding: '0.6rem 1.5rem', borderRadius: '11px', background: activeTab === 'browse' ? 'var(--primary)' : 'transparent', color: activeTab === 'browse' ? 'white' : 'var(--text-muted)', fontWeight: '600' }}>Browse</button>
          <button onClick={() => setActiveTab('my')} style={{ padding: '0.6rem 1.5rem', borderRadius: '11px', background: activeTab === 'my' ? 'var(--primary)' : 'transparent', color: activeTab === 'my' ? 'white' : 'var(--text-muted)', fontWeight: '600' }}>My Requests</button>
        </div>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {activeTab === 'browse' ? (
            activeRequests.map(req => <RequestCard key={req.id} request={req} isOwner={req.creator?.id === user?.id} />)
          ) : (
            myRequests.map(req => <RequestCard key={req.id} request={req} isOwner={req.creator?.id === user?.id} />)
          )}
        </div>
      )}

      {selectedChat && (
        <ChatBox requestId={selectedChat} onClose={() => setSelectedChat(null)} />
      )}

      {feedbackTarget && (
        <FeedbackModal 
          requestId={feedbackTarget.id} 
          providerId={feedbackTarget.helper?.id} 
          providerName={feedbackTarget.helper?.fullName} 
          onClose={() => setFeedbackTarget(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
