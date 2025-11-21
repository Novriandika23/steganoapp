'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import WorkflowProgress from '@/components/WorkflowProgress';
import { encodeLSB } from '@/lib/steganography';

const ENCODING_STEPS = [
  { id: 1, title: "Upload & Type", description: "Preparing your image and secret message", icon: "📤" },
  { id: 2, title: "Process", description: "Converting message to binary and hiding in pixels", icon: "⚙️" },
  { id: 3, title: "Download", description: "Generating your steganographic PNG image", icon: "✅" }
];

export default function EncodePage() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleEncode = async () => {
    if (!image || !message) return;
    
    setIsProcessing(true);
    setShowWorkflow(true);
    setCurrentStep(0);
    
    try {
      // Step 1: Upload & Type
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(1);
      
      // Step 2: Process
      await new Promise(resolve => setTimeout(resolve, 800));
      const blob = await encodeLSB(image, message);
      setCurrentStep(2);
      
      // Step 3: Download
      await new Promise(resolve => setTimeout(resolve, 800));
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      
      // Hide workflow after completion
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowWorkflow(false);
    } catch (error) {
      console.error(error);
      setShowWorkflow(false);
      alert('Failed to encode message. Image might be too small for this text.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      
      <WorkflowProgress 
        currentStep={currentStep}
        steps={ENCODING_STEPS}
        isVisible={showWorkflow}
      />
      
      <div className="container" style={{ paddingTop: '8rem' }}>
        <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
          Encode Secret Message
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <ImageUpload onImageSelect={setImage} label="1. Upload Source Image" />
            
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Enter Secret Message</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your secret message here..."
                style={{
                  width: '100%',
                  height: '150px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '1rem',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
              <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {message.length} characters
              </div>
            </div>
            
            <button 
              onClick={handleEncode}
              disabled={!image || !message || isProcessing}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                opacity: (!image || !message || isProcessing) ? 0.5 : 1,
                cursor: (!image || !message || isProcessing) ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Encoding...' : 'Encode & Download'}
            </button>
          </div>
          
          {/* Right Column: Result */}
          <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>3. Result</h3>
            
            {resultUrl ? (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ marginBottom: '1.5rem', position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                  <img src={resultUrl} alt="Encoded Result" style={{ maxWidth: '100%', maxHeight: '400px', display: 'block', margin: '0 auto' }} />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    background: 'rgba(0,0,0,0.7)', 
                    padding: '0.5rem',
                    fontSize: '0.8rem',
                    color: '#00ff9d'
                  }}>
                    Message Encoded Successfully!
                  </div>
                </div>
                
                <a 
                  href={resultUrl} 
                  download={`stegano_${Date.now()}.png`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Download Image
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  This image now contains your secret message.
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', opacity: 0.3 }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🖼️</div>
                <p>Encoded image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
