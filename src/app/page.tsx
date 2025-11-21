import Navbar from '@/components/Navbar';
import Link from 'next/link';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: 'var(--primary)',
        filter: 'blur(150px)',
        opacity: 0.15,
        borderRadius: '50%',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '600px',
        height: '600px',
        background: 'var(--secondary)',
        filter: 'blur(180px)',
        opacity: 0.15,
        borderRadius: '50%',
        zIndex: -1
      }} />

      <Navbar />
      
      <div className="container" style={{ 
        textAlign: 'center', 
        paddingTop: '12rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          marginBottom: '1.5rem', 
          padding: '0.5rem 1rem', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '50px', 
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '0.875rem',
          color: 'var(--primary)'
        }}>
          ✨ Client-Side Secure Encryption
        </div>
        
        <h1 className="text-gradient" style={{ 
          fontSize: 'clamp(3rem, 8vw, 5rem)', 
          lineHeight: 1.1, 
          marginBottom: '1.5rem',
          fontWeight: 800,
          letterSpacing: '-0.03em'
        }}>
          Hide Secrets in<br />Plain Sight
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.25rem', 
          marginBottom: '3rem', 
          maxWidth: '600px', 
          lineHeight: 1.6 
        }}>
          Protect your sensitive data by embedding it within images using advanced LSB steganography. No data ever leaves your browser.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/encode" className="btn btn-primary" style={{ minWidth: '160px' }}>
            Start Encoding
          </Link>
          <Link href="/decode" className="btn btn-secondary" style={{ minWidth: '160px' }}>
            Decode Image
          </Link>
        </div>
      </div>

      <HowItWorks />
    </main>
  );
}
