import React, { useState } from 'react';

const UploadSection = ({ exerciseId, onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('exerciseId', exerciseId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onUpload(data);
      } else {
        console.error('Error uploading video:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <h3>{exerciseId === 1 ? 'Sentadilla' : 'Plank'}</h3>
      <div className="drop-zone">
        <i className="fas fa-cloud-upload-alt upload-icon"></i>
        <p>Arrastra y suelta tu video aquí o haz clic para seleccionar</p>
        <input type="file" className="file-input" accept="video/*" onChange={handleFileChange} hidden />
        {isUploading && (
          <div className="loading-indicator">
            <i className="fas fa-spinner fa-spin"></i> Subiendo...
          </div>
        )}
        <div className="tooltip">
          <i className="fas fa-info-circle"></i>
          <span className="tooltiptext">Sube un video de {exerciseId === 1 ? 'Sentadilla' : 'Plank'} para análisis.</span>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
