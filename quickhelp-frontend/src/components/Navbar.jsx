import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, LayoutDashboard, PlusCircle, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="container" style={{ 
      padding: '1.5rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      position: 'sticky', 
      top: '0', 
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #f1f5f9'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '800', fontSize: '1.5rem', color: '#0f172a', letterSpacing: '-0.03em' }}>
        <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
          <Zap size={22} fill="white" color="white" />
        </div>
        QuickHelp
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1rem' }}>Dashboard</Link>
            <Link to="/create-request" style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1rem' }}>Get Help</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem' }}>
              <span style={{ fontWeight: '600', fontSize: '1rem' }}>{user.fullName}</span>
              <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/" style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Home</Link>
            <Link to="/dashboard" style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Requests</Link>
            <a href="#how-it-works" style={{ fontWeight: '500', color: 'var(--text-muted)' }}>How it works</a>
            <Link to="/register" className="btn-primary">Join Now</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
