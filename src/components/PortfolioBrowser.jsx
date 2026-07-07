import { useState } from 'react';
import './PortfolioBrowser.css';

const MENU_ITEMS = ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'];
const BASE_URL = '/portfoliobackup/index.html';

/* ─── Browser globe icon (replaces IE "e" logo) ─── */
export function GlobeIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe sphere */}
      <circle cx="16" cy="16" r="14" fill="#2B82D6" />
      <circle cx="16" cy="16" r="14" fill="url(#globeShine)" />
      {/* Continents / land masses — simplified shape */}
      <path d="M9 9c2 1 5 0 7 2 2 2 1 5 2 7s4 3 4 5-2 3-5 3c-3 0-5-1-7-3s-3-4-3-7 0-5 2-7z" fill="#6BBF5E" opacity="0.7" />
      <path d="M21 8c1 1 1 3 0 4s-2 1-3 2-1 2 0 3c1 1 2 1 1 3" stroke="#6BBF5E" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M8 20c2 1 4 0 5 2" stroke="#6BBF5E" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Longitude lines */}
      <ellipse cx="16" cy="16" rx="14" ry="14" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
      <ellipse cx="16" cy="16" rx="9" ry="14" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
      <ellipse cx="16" cy="16" rx="2" ry="14" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
      {/* Latitude lines */}
      <ellipse cx="16" cy="10" rx="13" ry="3" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
      <ellipse cx="16" cy="22" rx="13" ry="3" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
      {/* Highlight reflection */}
      <path d="M9 7A10 10 0 0 1 22 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" fill="none" />
      <defs>
        <radialGradient id="globeShine" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function PortfolioBrowser({ onClose, onMinimize, onMaximize, maximized, windowProps }) {
  const [url, setUrl] = useState(BASE_URL);
  const [inputVal, setInputVal] = useState(BASE_URL);

  const navigate = (to) => {
    setUrl(to);
    setInputVal(to);
  };

  const handleAddressKey = (e) => {
    if (e.key === 'Enter') {
      navigate(e.target.value.trim() || BASE_URL);
    }
  };

  const handleTitleMouseDown = (e) => {
    if (e.target.closest('.xpw-title-buttons')) return;
    if (maximized && onMaximize) onMaximize();
    windowProps?.onDragStart?.(e);
  };

  return (
    <div
      className={`xp-window portfolio-browser${maximized ? ' maximized' : ''}`}
      style={{
        width: maximized ? '100%' : 980,
        height: maximized ? '100%' : undefined,
        zIndex: windowProps?.zIndex,
      }}
      onMouseDown={windowProps?.onFocus}
    >
      {/* ─── Title bar ─── */}
      <div className="xpw-title-bar" onMouseDown={handleTitleMouseDown}>
        <span className="xpw-title-icon" aria-hidden="true">
          <GlobeIcon size={16} />
        </span>
        <span className="xpw-title-text">Justine Rhey — Portfolio</span>
        <div className="xpw-title-buttons">
          <button className="xpw-btn xpw-min" onClick={onMinimize} aria-label="Minimize" title="Minimize" />
          <button className={`xpw-btn ${maximized ? 'xpw-restore' : 'xpw-max'}`} onClick={onMaximize} aria-label={maximized ? 'Restore' : 'Maximize'} title={maximized ? 'Restore' : 'Maximize'} />
          <button className="xpw-btn xpw-close" onClick={onClose} aria-label="Close" title="Close" />
        </div>
      </div>

      {/* ─── Menu bar ─── */}
      <div className="xpw-menu-bar portfolio-menu-bar" aria-hidden="true">
        {MENU_ITEMS.map(item => (
          <span className="xpw-menu-item" key={item}>{item}</span>
        ))}
      </div>

      {/* ─── IE Toolbar ─── */}
      <div className="ie-toolbar">
        <div className="ie-toolbar-row">
          <button className="ie-btn" title="Back" disabled>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3l-5 5 5 5"/></svg>
          </button>
          <button className="ie-btn" title="Forward" disabled>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3l5 5-5 5"/></svg>
          </button>
          <div className="ie-toolbar-divider" />
          <button className="ie-btn" title="Refresh" onClick={() => navigate(BASE_URL)}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 8a6 6 0 0 1-11.1 3.3"/><path d="M3.5 3.5A6 6 0 0 1 14 8"/><path d="M3 1v4h4"/></svg>
          </button>
          <button className="ie-btn" title="Home" onClick={() => navigate(BASE_URL)}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 9l7-6 7 6"/><path d="M3 7v7h4v-4h2v4h4V7"/></svg>
          </button>
          <div className="ie-toolbar-divider" />
          <span className="ie-address-label">Address</span>
          <div className="ie-address-bar">
            <input
              type="text"
              className="ie-address-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleAddressKey}
              spellCheck={false}
            />
          </div>
          <button className="ie-btn ie-go-btn" title="Go" onClick={() => navigate(inputVal.trim() || BASE_URL)}>
            Go
          </button>
        </div>
      </div>

      {/* ─── IE Content: iframe ─── */}
      <div className="ie-content">
        <iframe
          src={url}
          className="ie-iframe"
          title="Portfolio"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* ─── Status bar ─── */}
      <div className="ie-status-bar">
        <span className="ie-status-left">Done</span>
        <span className="ie-status-right">Internet</span>
      </div>
    </div>
  );
}
