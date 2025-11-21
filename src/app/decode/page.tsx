'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import WorkflowProgress from '@/components/WorkflowProgress';
import { decodeLSB } from '@/lib/steganography';

const DECODING_STEPS = [
  { id: 1, title: "Upload Image", description: "Loading the encoded image file", icon: "📤" },
  { id: 2, title: "Extract", description: "Reading hidden bits from pixels", icon: "🔍" },
  { id: 3, title: "Reveal", description: "Displaying your secret message", icon: "✨" }
];

export default function DecodePage() {
  const [image, setImage] = useState<File | null>(null);
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleDecode = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    setShowWorkflow(true);
    setCurrentStep(0);
    
    try {
      // Step 1: Upload Image
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(1);
      
      // Step 2: Extract
      await new Promise(resolve => setTimeout(resolve, 800));
      const message = await decodeLSB(image);
      setCurrentStep(2);
      
      // Step 3: Reveal
      await new Promise(resolve => setTimeout(resolve, 800));
      setDecodedMessage(message);
      
      // Hide workflow after completion
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowWorkflow(false);
    } catch (error) {
      console.error(error);
      setShowWorkflow(false);
      alert('Failed to decode message.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      
      <WorkflowProgress 
        currentStep={currentStep}
        steps={DECODING_STEPS}
        isVisible={showWorkflow}
      />
      
      <div className="container" style={{ paddingTop: '8rem' }}>
        <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
          Decode Hidden Message
        </h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ImageUpload onImageSelect={(file) => { setImage(file); setDecodedMessage(null); }} label="Upload Image with Hidden Message" />
          
          <button 
            onClick={handleDecode}
            disabled={!image || isProcessing}
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              opacity: (!image || isProcessing) ? 0.5 : 1,
              cursor: (!image || isProcessing) ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? 'Decoding...' : '🔓 Reveal Message'}
          </button>
          
          {decodedMessage !== null && (
            <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem', animation: 'fadeIn 0.5s ease' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Decoded Message:</h3>
              <div style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius)', 
                border: '1px solid var(--primary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                minHeight: '100px'
              }}>
                {decodedMessage || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No hidden message found or message is empty.</span>}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
