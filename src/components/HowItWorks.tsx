'use client';

export default function HowItWorks() {
  return (
    <section style={{ 
      padding: '8rem 0',
      background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 157, 0.02) 50%, transparent 100%)'
    }}>
      <div className="container">
        <h2 className="text-gradient" style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '1rem',
          fontWeight: 800
        }}>
          How It Works
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '5rem',
          fontSize: '1.1rem'
        }}>
          Simple 3-step process for both encoding and decoding
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          
          {/* Encoding */}
          <ProcessFlow 
            title="Encoding"
            iconType="locked"
            color="var(--primary)"
            steps={[
              { title: "Upload & Type", desc: "Select your image and enter secret message" },
              { title: "Process", desc: "Message converted to binary and hidden in pixels" },
              { title: "Download", desc: "Get your steganographic PNG image" }
            ]}
          />

          {/* Decoding */}
          <ProcessFlow 
            title="Decoding"
            iconType="unlocked"
            color="var(--secondary)"
            steps={[
              { title: "Upload Image", desc: "Select the encoded image file" },
              { title: "Extract", desc: "App reads hidden bits from pixels" },
              { title: "Reveal", desc: "Secret message displayed instantly" }
            ]}
          />

        </div>
      </div>
    </section>
  );
}

// Modern Lock Icon Component
function LockIcon({ type, color }: { type: 'locked' | 'unlocked'; color: string }) {
  if (type === 'locked') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        {/* Lock body */}
        <rect x="5" y="11" width="14" height="10" rx="2" fill="url(#lockGradient)" />
        {/* Lock shackle */}
        <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" 
              stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Keyhole */}
        <circle cx="12" cy="15" r="1.5" fill="#000" opacity="0.3"/>
        <rect x="11.25" y="15.5" width="1.5" height="3" rx="0.75" fill="#000" opacity="0.3"/>
      </svg>
    );
  } else {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="unlockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        {/* Lock body */}
        <rect x="5" y="11" width="14" height="10" rx="2" fill="url(#unlockGradient)" />
        {/* Open shackle */}
        <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V9" 
              stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Keyhole */}
        <circle cx="12" cy="15" r="1.5" fill="#000" opacity="0.3"/>
        <rect x="11.25" y="15.5" width="1.5" height="3" rx="0.75" fill="#000" opacity="0.3"/>
      </svg>
    );
  }
}

function ProcessFlow({ 
  title, 
  iconType, 
  color, 
  steps 
}: { 
  title: string; 
  iconType: 'locked' | 'unlocked'; 
  color: string;
  steps: Array<{ title: string; desc: string }>;
}) {
  return (
    <div>
      <h3 style={{ 
        fontSize: '1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: 'center'
      }}>
        <LockIcon type={iconType} color={color} />
        <span style={{ color }}>{title}</span>
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <div className="glass-panel" style={{
              padding: '2rem',
              height: '100%',
              transition: 'all 0.3s ease',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: color,
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-heading)',
                boxShadow: `0 4px 15px ${color}40`
              }}>
                {index + 1}
              </div>

              {/* Content */}
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600
                }}>
                  {step.title}
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Connector Arrow (desktop only) */}
            {index < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                right: '-2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.5rem',
                color: color,
                opacity: 0.5,
                display: 'none'
              }}
              className="desktop-arrow">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-arrow {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
