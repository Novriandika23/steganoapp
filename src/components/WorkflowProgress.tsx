'use client';

import { useEffect, useState } from 'react';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface WorkflowProgressProps {
  currentStep: number;
  steps: WorkflowStep[];
  isVisible: boolean;
}

export default function WorkflowProgress({ currentStep, steps, isVisible }: WorkflowProgressProps) {
  const [animatedStep, setAnimatedStep] = useState(0);

  useEffect(() => {
    if (isVisible && currentStep > animatedStep) {
      const timer = setTimeout(() => {
        setAnimatedStep(currentStep);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisible, animatedStep]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800
        }}>
          Processing Your Request
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(138, 43, 226, 0.1))'
                    : isCompleted
                    ? 'rgba(0, 255, 157, 0.05)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: `2px solid ${
                    isActive 
                      ? 'var(--primary)' 
                      : isCompleted 
                      ? 'rgba(0, 255, 157, 0.3)' 
                      : 'rgba(255, 255, 255, 0.1)'
                  }`,
                  borderRadius: '12px',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  opacity: isPending ? 0.4 : 1
                }}
              >
                {/* Step Icon/Number */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: isCompleted 
                    ? 'var(--primary)'
                    : isActive
                    ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                    : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {isCompleted ? (
                    <span style={{ color: '#000' }}>✓</span>
                  ) : isActive ? (
                    <>
                      <span style={{ fontSize: '1.8rem' }}>{step.icon}</span>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.3))',
                        animation: 'shimmer 2s infinite'
                      }} />
                    </>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>{step.id}</span>
                  )}
                </div>

                {/* Step Content */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    marginBottom: '0.5rem',
                    color: isActive ? 'var(--primary)' : isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    margin: 0
                  }}>
                    {step.description}
                  </p>
                </div>

                {/* Status Indicator */}
                {isActive && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    boxShadow: '0 0 20px var(--primary)'
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div style={{
          marginTop: '2rem',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            transition: 'width 0.5s ease',
            boxShadow: '0 0 20px var(--primary)'
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
