import { useRef, useEffect } from 'react';
import './XpWindow.css';

export default function XpWindow({
  title,
  icon,
  open,
  zIndex,
  onClose,
  onFocus,
  onDragStart,
  children,
  width = 540,
  menuItems,
  statusBar,
  id,
}) {
  const winRef = useRef(null);
  const titleBarRef = useRef(null);

  /* Save a reference on window for focus management */
  useEffect(() => {
    if (open && winRef.current) {
      /* Move focus to the window so tab starts inside it */
      const body = winRef.current.querySelector('.xpw-body');
      if (body) body.setAttribute('tabindex', '-1');
      winRef.current.focus();
    }
  }, [open]);

  const handleTitleMouseDown = (e) => {
    if (e.target.closest('.xpw-title-buttons')) return;
    if (onDragStart) onDragStart(e);
  };

  if (!open) return null;

  return (
    <div
      ref={winRef}
      className="xp-window"
      style={{ zIndex, width: Math.min(width, window.innerWidth - 16) }}
      onMouseDown={onFocus}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Window'}
      tabIndex={-1}
    >
      {/* Title bar */}
      <div
        className="xpw-title-bar"
        ref={titleBarRef}
        role="toolbar"
        aria-label="Window controls"
        onMouseDown={handleTitleMouseDown}
      >
        {icon && <span className="xpw-title-icon" aria-hidden="true">{icon}</span>}
        <span className="xpw-title-text" role="heading" aria-level={2}>{title}</span>
        <div className="xpw-title-buttons">
          <button
            className="xpw-btn xpw-min"
            aria-hidden="true"
            title="Minimize"
            tabIndex={-1}
          />
          <button
            className="xpw-btn xpw-max"
            aria-hidden="true"
            title="Maximize"
            tabIndex={-1}
          />
          <button
            className="xpw-btn xpw-close"
            onClick={onClose}
            aria-label="Close window"
            title="Close"
          />
        </div>
      </div>

      {/* Menu bar (decorative) */}
      {menuItems && (
        <div className="xpw-menu-bar" aria-hidden="true">
          {menuItems.map((item, i) => (
            <span className="xpw-menu-item active" key={i}>{item}</span>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="xpw-body">
        {children}
      </div>

      {/* Status bar (decorative) */}
      {statusBar && <div className="xpw-status-bar" aria-hidden="true">{statusBar}</div>}
    </div>
  );
}
