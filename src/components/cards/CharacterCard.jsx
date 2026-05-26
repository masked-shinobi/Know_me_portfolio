import React from 'react';

export default function CharacterCard() {
  return (
    <div className="card-container" style={{ left: '2800px', top: '850px' }}>
      <span className="card-label">CARD #02 &mdash; ME</span>
      <div className="hero-character-wrapper" style={{ cursor: 'pointer' }}>
        <img
          src="/images/Hero-anime.png"
          className="floating-sticker"
          alt="Hero Anime"
          style={{ width: '400px', height: 'auto' }}
        />
      </div>
    </div>
  );
}
