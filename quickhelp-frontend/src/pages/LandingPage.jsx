import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, MapPin, ArrowRight, Users, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '8rem' }}>
      {/* Hero Section */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.3fr', 
        gap: '4rem', 
        padding: '6rem 0', 
        alignItems: 'center' 
      }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ 
            fontSize: '5rem', 
            fontWeight: '800', 
            marginBottom: '1.5rem', 
            lineHeight: '1.05', 
            letterSpacing: '-0.02em',
            color: '#0f172a'
          }}>
            Help Others.<br />
            Get Help.
          </h1>
          <p style={{ 
            fontSize: '1.35rem', 
            color: 'var(--text-muted)', 
            maxWidth: '500px', 
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            QuickHelp connects people who need help with those who want to help.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem' }}>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/dashboard" className="btn-outline">
              See Requests
            </Link>
          </div>

          {/* Features Row */}
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="feature-card">
              <div className="icon-wrapper">
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Community</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real people, real impact</div>
              </div>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Trusted</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified users you can rely on</div>
              </div>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper">
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Quick</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fast help when you need it</div>
              </div>
            </div>
          </div>
        </div>

        <div>
           <img 
            src="/image1.jpeg" 
            alt="QuickHelp Hero" 
            style={{ width: '110%', borderRadius: '24px', display: 'block', boxShadow: '20px 20px 60px rgba(0,0,0,0.1)', marginLeft: '-5%' }} 
           />
        </div>
      </section>

      {/* Features Grid */}
      <section id="how-it-works" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', padding: '4rem 0' }}>
        <div className="info-card">
          <div className="icon-box" style={{ background: 'rgba(29, 78, 216, 0.1)', color: 'var(--primary)' }}>
            <Zap size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Lightning Fast</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Get assistance within minutes from verified providers in your immediate vicinity.
          </p>
        </div>

        <div className="info-card">
          <div className="icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
            <Shield size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Verified & Secure</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Our rating system and verified profiles ensure a safe experience for everyone.
          </p>
        </div>

        <div className="info-card">
          <div className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
            <Heart size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Community Driven</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Built on the principle of neighbors helping neighbors to create a stronger society.
          </p>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section style={{ 
        marginTop: '4rem', 
        padding: '5rem', 
        textAlign: 'center', 
        background: 'var(--bg-soft)',
        borderRadius: '32px',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Ready to make a difference?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>Join 5,000+ users already helping each other every day.</p>
        <Link to="/register" className="btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.1rem' }}>
          Get Started Now
        </Link>
      </section>

      <footer style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
        <p>&copy; 2026 QuickHelp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
