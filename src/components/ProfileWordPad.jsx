import { useEffect, useRef } from 'react';
import './ProfileWordPad.css';

export default function ProfileWordPad({ onClose, window: windowMode, onDragStart }) {
  const overlayRef = useRef(null);
  const docRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (onClose && e.target === overlayRef.current) onClose();
  };

  const handleTitleMouseDown = (e) => {
    if (e.target.closest('.wpad-title-buttons')) return;
    if (onDragStart) onDragStart(e);
  };

  const wordpad = (
    <div
      className="wpad-window"
      ref={docRef}
      role="dialog"
      aria-modal="true"
      aria-label="profile.txt - WordPad"
      tabIndex={-1}
    >
      {/* ─── Title bar ─── */}
      <div className="wpad-title-bar" onMouseDown={handleTitleMouseDown}>
        <span className="wpad-title-icon">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" width="18" height="18">
            <rect x="2" y="2" width="28" height="28" rx="2" fill="#fff" stroke="#808080" strokeWidth="1" />
            <rect x="6" y="8" width="20" height="2" rx="1" fill="#000" />
            <rect x="6" y="13" width="16" height="2" rx="1" fill="#000" />
            <rect x="6" y="18" width="18" height="2" rx="1" fill="#000" />
            <rect x="6" y="23" width="12" height="2" rx="1" fill="#000" />
          </svg>
        </span>
        <span className="wpad-title-text">profile.txt - WordPad</span>
        <div className="wpad-title-buttons">
          <span className="wpad-btn wpad-btn-min" aria-hidden="true" title="Minimize" />
          <span className="wpad-btn wpad-btn-max" aria-hidden="true" title="Maximize" />
          <button
            className="wpad-btn wpad-btn-close"
            onClick={onClose}
            aria-label="Close WordPad"
            title="Close"
          />
        </div>
      </div>

      {/* ─── Menu bar ─── */}
      <div className="wpad-menu-bar" aria-hidden="true">
        <span className="wpad-menu-item" tabIndex={-1}>File</span>
        <span className="wpad-menu-item active" tabIndex={-1}>Edit</span>
        <span className="wpad-menu-item" tabIndex={-1}>View</span>
        <span className="wpad-menu-item" tabIndex={-1}>Insert</span>
        <span className="wpad-menu-item" tabIndex={-1}>Format</span>
        <span className="wpad-menu-item" tabIndex={-1}>Help</span>
      </div>

      {/* ─── Toolbar ─── */}
      <div className="wpad-toolbar" aria-hidden="true">
        <div className="wpad-tb-group">
          <span className="wpad-tb-font" title="Font">Times New Roman</span>
          <span className="wpad-tb-size" title="Font size">12</span>
        </div>
        <div className="wpad-tb-divider" />
        <div className="wpad-tb-group">
          <button className="wpad-tb-btn wpad-tb-bold" tabIndex={-1} title="Bold"><b>B</b></button>
          <button className="wpad-tb-btn wpad-tb-italic" tabIndex={-1} title="Italic"><i>I</i></button>
          <button className="wpad-tb-btn wpad-tb-underline" tabIndex={-1} title="Underline"><u>U</u></button>
        </div>
        <div className="wpad-tb-divider" />
        <div className="wpad-tb-group">
          <button className="wpad-tb-btn" tabIndex={-1} title="Color">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="2" fill="#5B9BD5" />
            </svg>
          </button>
        </div>
        <div className="wpad-tb-divider" />
        <div className="wpad-tb-group">
          <button className="wpad-tb-btn" tabIndex={-1} title="Align Left">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="3" width="12" height="2" rx="0.5" fill="#000" /><rect x="2" y="7" width="8" height="2" rx="0.5" fill="#000" /><rect x="2" y="11" width="10" height="2" rx="0.5" fill="#000" /></svg>
          </button>
          <button className="wpad-tb-btn" tabIndex={-1} title="Center">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="3" width="12" height="2" rx="0.5" fill="#000" /><rect x="4" y="7" width="8" height="2" rx="0.5" fill="#000" /><rect x="3" y="11" width="10" height="2" rx="0.5" fill="#000" /></svg>
          </button>
          <button className="wpad-tb-btn" tabIndex={-1} title="Align Right">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="3" width="12" height="2" rx="0.5" fill="#000" /><rect x="6" y="7" width="8" height="2" rx="0.5" fill="#000" /><rect x="4" y="11" width="10" height="2" rx="0.5" fill="#000" /></svg>
          </button>
        </div>
        <div className="wpad-tb-divider" />
        <div className="wpad-tb-group">
          <button className="wpad-tb-btn" tabIndex={-1} title="Bullets">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="3" cy="4" r="1.5" fill="#000" /><rect x="6" y="3" width="8" height="2" rx="0.5" fill="#000" /><circle cx="3" cy="8" r="1.5" fill="#000" /><rect x="6" y="7" width="8" height="2" rx="0.5" fill="#000" /><circle cx="3" cy="12" r="1.5" fill="#000" /><rect x="6" y="11" width="8" height="2" rx="0.5" fill="#000" /></svg>
          </button>
        </div>
        <div className="wpad-tb-filler" />
        <div className="wpad-tb-divider" />
        <div className="wpad-tb-group">
          <button className="wpad-tb-btn wpad-tb-office" tabIndex={-1} title="Tip of the Day">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect x="3" y="1" width="10" height="10" rx="1" fill="#FFD700" stroke="#B8860B" strokeWidth="0.8" />
              <rect x="7" y="11" width="2" height="2" fill="#B8860B" />
              <rect x="6.5" y="13" width="3" height="1" rx="0.5" fill="#B8860B" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── Ruler ─── */}
      <div className="wpad-ruler" aria-hidden="true">
        <div className="wpad-ruler-inner">
          <div className="wpad-ruler-notch" style={{ left: '0px' }}><span>0</span></div>
          <div className="wpad-ruler-notch" style={{ left: '36px' }}><span>1</span></div>
          <div className="wpad-ruler-notch" style={{ left: '72px' }}><span>2</span></div>
          <div className="wpad-ruler-notch" style={{ left: '108px' }}><span>3</span></div>
          <div className="wpad-ruler-notch" style={{ left: '144px' }}><span>4</span></div>
          <div className="wpad-ruler-notch" style={{ left: '180px' }}><span>5</span></div>
          <div className="wpad-ruler-notch" style={{ left: '216px' }}><span>6</span></div>
        </div>
      </div>

      {/* ─── Document body ─── */}
      <div className="wpad-document">
        <div className="wpad-doc-paper">

          {/* Header with photo */}
          <div className="wpad-header">
            <div className="wpad-photo-wrap">
              <img src="./profile-1.png" alt="Justine Rhey" className="wpad-photo" />
            </div>
            <div className="wpad-header-text">
              <h1 className="wpad-doc-name">Justine Rhey M. Tambong</h1>
              <p className="wpad-doc-handle">@justrhey</p>
              <p className="wpad-doc-role">Backend Developer &amp; AI Engineer</p>
              <p className="wpad-doc-loc">Manila, Philippines</p>
              <p className="wpad-doc-email">
                <a href="mailto:justrhey.tambong@gmail.com">justrhey.tambong@gmail.com</a>
              </p>
            </div>
          </div>

          <hr className="wpad-hr" />

          {/* Bio */}
          <div className="wpad-section">
            <p className="wpad-body-text">
              Backend developer and AI engineer. I build intelligent automation systems, SaaS products, and blockchain-integrated applications — from the API layer to the infrastructure underneath.
            </p>
            <p className="wpad-body-text">
              Currently at TambayanPH, shipping AI-powered business solutions with n8n and Claude Code. I work across the stack: Java/Spring Boot on the backend, React on the frontend, Linux/CLI in between.
            </p>
          </div>

          <hr className="wpad-hr" />

          {/* Skills */}
          <div className="wpad-section">
            <h2 className="wpad-section-title">Technical Skills</h2>
            <ul className="wpad-skills-list">
              <li><strong>Languages:</strong> Java, Rust, Python, TypeScript</li>
              <li><strong>Frontend:</strong> React, Three.js</li>
              <li><strong>Backend:</strong> Spring Boot, Django REST, Actix-web</li>
              <li><strong>Databases:</strong> PostgreSQL, MySQL</li>
              <li><strong>Automation:</strong> n8n, Claude Code, AI integration</li>
              <li><strong>Infrastructure:</strong> Linux, CLI tooling</li>
            </ul>
          </div>

          <hr className="wpad-hr" />

          {/* Stats table */}
          <div className="wpad-section">
            <h2 className="wpad-section-title">Overview</h2>
            <table className="wpad-stats-table">
              <tbody>
                <tr>
                  <td className="wpad-stat-num">06</td>
                  <td className="wpad-stat-label">Projects</td>
                  <td className="wpad-stat-num">12</td>
                  <td className="wpad-stat-label">Skills</td>
                  <td className="wpad-stat-num">5</td>
                  <td className="wpad-stat-label">Years Exp.</td>
                  <td className="wpad-stat-num">∞</td>
                  <td className="wpad-stat-label">Coffee</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="wpad-hr" />

          {/* Social links */}
          <div className="wpad-section">
            <h2 className="wpad-section-title">Find me online</h2>
            <p className="wpad-body-text">
              GitHub: <a href="https://github.com/justrhey" target="_blank" rel="noopener">github.com/justrhey</a><br />
              LinkedIn: <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener">linkedin.com/in/justrhey</a><br />
              CV: <a href="CV_Justine_Rhey_Tambong.pdf" download>CV_Justine_Rhey_Tambong.pdf</a>
            </p>
          </div>

          {/* Cursor */}
          <p className="wpad-cursor"><span className="wpad-cursor-blink">_</span></p>
        </div>
      </div>

      {/* ─── Status bar ─── */}
      <div className="wpad-status-bar" aria-hidden="true">
        <span className="wpad-status-item">Page 1</span>
        <span className="wpad-status-item">Sec 1</span>
        <span className="wpad-status-item">1/1</span>
        <span className="wpad-status-sep">|</span>
        <span className="wpad-status-item">At 1.1"</span>
        <span className="wpad-status-item">Ln 1</span>
        <span className="wpad-status-item">Col 1</span>
        <span className="wpad-status-sep">|</span>
        <span className="wpad-status-item">REC</span>
        <span className="wpad-status-item">TRK</span>
        <span className="wpad-status-item">EXT</span>
        <span className="wpad-status-item">OVR</span>
      </div>
    </div>
  );

  if (windowMode) {
    return wordpad;
  }

  return (
    <div className="wpad-overlay" ref={overlayRef} onClick={handleOverlay}>
      {wordpad}
    </div>
  );
}
