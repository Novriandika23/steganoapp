'use client';

import { useState, useCallback } from 'react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  label?: string;
}

export default function ImageUpload({ onImageSelect, label = "Upload Image" }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageSelect(file);
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{label}</h3>
      
      <div 
        onDragEnter={handleDrag} 
        onDragLeave={handleDrag} 
        onDragOver={handleDrag} 
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          padding: '2rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: dragActive ? 'rgba(0, 255, 157, 0.05)' : 'transparent',
          position: 'relative',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <input 
          type="file" 
          id="image-upload" 
          accept="image/*" 
          onChange={handleChange} 
          style={{ display: 'none' }} 
        />
        
        {preview ? (
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }} 
            />
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {fileName}
            </p>
            <label 
              htmlFor="image-upload" 
              className="btn btn-secondary"
              style={{ marginTop: '1rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              Change Image
            </label>
          </div>
        ) : (
          <label htmlFor="image-upload" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📁</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Drag & Drop or Click to Upload</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Supports PNG, JPG, WEBP</p>
          </label>
        )}
      </div>
    </div>
  );
}
