import React from 'react';

export default function WorkspaceCard() {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="card-container workspace-card-container" 
      style={{ left: '380px', top: '1450px' }}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <span className="card-label">CARD #06 &mdash; WORKSPACE</span>
      <div className="workspace-card">
        <div className="workspace-card-header">
          <div className="workspace-title-wrapper">
            <h2 className="workspace-card-title">Sanjay's Workspace</h2>
            <p className="workspace-card-subtitle">Notion DSA Sheet Embed</p>
          </div>
          <span className="workspace-card-badge">Live</span>
        </div>
        <div className="workspace-iframe-wrapper">
          <iframe 
            src="https://dsa-spreadsheet-sanjaybaskar.notion.site/ebd//9a13a11dd45d82439717013153949f27" 
            width="100%" 
            height="100%" 
            style={{ border: 'none' }}
            allowFullScreen 
            title="Sanjay DSA Sheet"
          />
        </div>
      </div>
    </div>
  );
}
