import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from './data/projects';
import XpWindow from './components/XpWindow';
import ProfileWordPad from './components/ProfileWordPad';
import SkillsContent from './components/SkillsContent';
import ClippyAssistant from './components/ClippyAssistant';
import DoomWindow from './components/DoomWindow';
import './App.css';

const SHORTCUTS = [
  { id: 'profile', label: 'profile.txt', icon: 'txt' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'skills', label: 'Skills', icon: 'globe' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
  { id: 'doom', label: 'DOOM', icon: 'doom' },
];

const DESKTOP_ICONS = {
  txt: <img src="/icons/Documents.png" alt="" width={72} height={72} />,
  info: <img src="/icons/My computer.png" alt="" width={72} height={72} />,
  folder: <img src="/icons/Documents.png" alt="" width={72} height={72} />,
  globe: <img src="/icons/Network.png" alt="" width={72} height={72} />,
  mail: <img src="/icons/My computer.png" alt="" width={72} height={72} />,
  doom: <img src="/doom.png" alt="" width={72} height={72} />,
};

export default function App() {
  const [winState, setWinState] = useState({});
  const nextZ = useRef(10);
  const cascadeOff = useRef(0);
  const [startOpen, setStartOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [modalIdx, setModalIdx] = useState(null);
  const [dragId, setDragId] = useState(null);
  const dragRef = useRef(null);
  const [ctxMenu, setCtxMenu] = useState(null);
  const ctxRef = useRef(null);

  const activeWindow = winState
    ? Object.entries(winState)
        .filter(([, w]) => w.open)
        .sort(([, a], [, b]) => b.zIndex - a.zIndex)
        .map(([id]) => id)[0]
    : null;

  /* ─── Clock ─── */
  useEffect(() => {
    function tick() {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    tick(); const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  /* ─── Close start menu on outside click ─── */
  useEffect(() => {
    if (!startOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.taskbar') && !e.target.closest('.start-menu')) setStartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [startOpen]);

  /* ─── Right-click context menu ─── */
  const handleCtxMenu = useCallback((id, e) => {
    e.preventDefault();
    setCtxMenu({ id, x: e.clientX, y: e.clientY });
  }, []);

  /* Close context menu on outside click */
  useEffect(() => {
    if (!ctxMenu) return;
    const handler = (e) => {
      if (ctxRef.current && !ctxRef.current.contains(e.target)) setCtxMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ctxMenu]);

  /* Show Desktop — minimize all windows */
  const showDesktop = useCallback(() => {
    setWinState(prev => {
      const next = {};
      for (const [k, v] of Object.entries(prev)) next[k] = { ...v, open: false };
      return next;
    });
  }, []);

  /* ─── Window helpers ─── */
  const win = useCallback((id) => winState[id] || { open: false, zIndex: 0, offset: 0, posX: 80, posY: 80 }, [winState]);

  const openWindow = useCallback((id) => {
    const sizes = { profile: [520, 400], projects: [700, 500], skills: [700, 500], contact: [620, 450], doom: [700, 480] };
    const [w, h] = sizes[id] || [600, 420];
    const posX = Math.max(20, (window.innerWidth - w) / 2);
    const posY = Math.max(20, (window.innerHeight - h) / 2);
    setWinState(prev => ({
      ...prev,
      [id]: { open: true, zIndex: nextZ.current++, offset: 0, posX, posY },
    }));
    setStartOpen(false);
  }, []);

  const closeWindow = useCallback((id) => {
    setWinState(prev => {
      const next = { ...prev };
      if (next[id]) next[id] = { ...next[id], open: false };
      return next;
    });
  }, []);

  const focusWindow = useCallback((id) => {
    setWinState(prev => {
      const w = prev[id];
      if (!w || !w.open) return prev;
      return { ...prev, [id]: { ...w, zIndex: nextZ.current++ } };
    });
  }, []);

  /* ─── Window dragging ─── */
  const handleDragStart = useCallback((id, clientX, clientY) => {
    const w = winState[id];
    if (!w) return;
    focusWindow(id);
    dragRef.current = { id, startX: clientX, startY: clientY, origX: w.posX, origY: w.posY };
    setDragId(id);
  }, [winState, focusWindow]);

  useEffect(() => {
    if (!dragId || !dragRef.current) return;
    const d = dragRef.current;
    const handleMove = (e) => {
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      setWinState(prev => {
        const w = prev[d.id];
        if (!w) return prev;
        return {
          ...prev,
          [d.id]: { ...w, posX: Math.max(0, d.origX + dx), posY: Math.max(0, d.origY + dy) },
        };
      });
    };
    const handleUp = () => { setDragId(null); dragRef.current = null; };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [dragId]);

  /* ─── Project modal ─── */
  const openModal = useCallback((idx) => setModalIdx(idx), []);
  const closeModal = useCallback(() => setModalIdx(null), []);

  /* ─── Contact form submit ─── */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name')?.trim();
    const email = fd.get('email')?.trim();
    const message = fd.get('message')?.trim();
    const status = document.getElementById('formStatus');
    if (!name || !email || !message) {
      if (status) { status.textContent = 'Please fill in all fields.'; }
      return;
    }
    const mailto = `mailto:justrhey.tambong@gmail.com?subject=Portfolio%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0A--%20${encodeURIComponent(email)}`;
    if (status) status.textContent = 'Opening your mail client...';
    window.location.href = mailto;
    setTimeout(() => { e.target.reset(); if (status) status.textContent = 'Message ready. Thanks!'; }, 1000);
  }, []);

  /* ─── Window position ─── */
  function winStyle(id) {
    const w = win(id);
    return { zIndex: w.zIndex, left: w.posX || 60, top: w.posY || 30, position: 'absolute' };
  }

  const winAnim = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: { duration: 0.15, ease: 'easeOut' },
  };

  /* ─── Project modal Escape ─── */
  useEffect(() => {
    if (modalIdx === null) return;
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modalIdx, closeModal]);

  const p = PROJECTS[modalIdx];

  return (
    <>
      {/* ─── Desktop ─── */}
      <div className="desktop" id="desktop">
        <h1 className="visually-hidden">Justine Rhey - Portfolio</h1>

        {/* Desktop shortcut icons */}
        <div className="desktop-icons">
          {SHORTCUTS.map(s => (
            <button key={s.id} className="desktop-shortcut" onClick={() => openWindow(s.id)}>
              <span className="desktop-shortcut-icon">{DESKTOP_ICONS[s.icon]}</span>
              <span className="desktop-shortcut-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* ─── Windows with Framer Motion ─── */}
        <AnimatePresence>
          {win('profile').open && (
            <motion.div key="profile" className="desktop-window-wrap" style={winStyle('profile')} {...winAnim}>
              <ProfileWordPad onClose={() => closeWindow('profile')} window
                onDragStart={(e) => handleDragStart('profile', e.clientX, e.clientY)} />
            </motion.div>
          )}

          {win('projects').open && (
            <motion.div key="projects" style={winStyle('projects')} {...winAnim}>
              <XpWindow
                title="Projects"
                icon={<img src="/icons/Documents.png" alt="" width={20} height={20} />}
                open={win('projects').open}
                zIndex={win('projects').zIndex}
                onClose={() => closeWindow('projects')}
                onFocus={() => focusWindow('projects')}
                onDragStart={(e) => handleDragStart('projects', e.clientX, e.clientY)}
                width={700}
                menuItems={['File', 'Edit', 'View', 'Favorites', 'Help']}
              >
                <div className="window-content">
                  <div className="pw-grid">
                    {PROJECTS.map((proj, i) => (
                      <button key={proj.id} className="pw-card" tabIndex={0} onClick={() => openModal(i)}>
                        <img className="pw-card-img" src={proj.img} alt={proj.name} loading="lazy" />
                        <div className="pw-card-body">
                          <div className="pw-card-index">{'[' + String(i + 1).padStart(2, '0') + ']'}</div>
                          <h3 className="pw-card-name">{proj.name}</h3>
                          <p className="pw-card-desc">{proj.desc}</p>
                          <div className="pw-card-tags">
                            {proj.tags.map(t => <span className="pw-tag" key={t}>{t}</span>)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </XpWindow>
            </motion.div>
          )}

          {win('skills').open && (
            <motion.div key="skills" style={winStyle('skills')} {...winAnim}>
              <XpWindow
                title="Skills"
                icon={<img src="/icons/Network.png" alt="" width={20} height={20} />}
                open={win('skills').open}
                zIndex={win('skills').zIndex}
                onClose={() => closeWindow('skills')}
                onFocus={() => focusWindow('skills')}
                onDragStart={(e) => handleDragStart('skills', e.clientX, e.clientY)}
                width={700}
                menuItems={['File', 'Edit', 'View', 'Help']}
              >
                <SkillsContent />
              </XpWindow>
            </motion.div>
          )}

          {win('doom').open && (
            <motion.div key="doom" style={winStyle('doom')} {...winAnim}>
              <XpWindow
                title="DOOM (1993)"
                icon={
                  <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden="true">
                    <circle cx="8" cy="9" r="5" fill="#1a1a1a" stroke="#8b0000" strokeWidth="0.8"/>
                    <ellipse cx="6" cy="8" rx="1.2" ry="1.5" fill="#ff4400" opacity="0.9"/>
                    <ellipse cx="10" cy="8" rx="1.2" ry="1.5" fill="#ff4400" opacity="0.9"/>
                    <path d="M4 11c1.2 1.5 3.5 1.5 4.7 0" stroke="#8b0000" strokeWidth="0.8"/>
                    <path d="M3 5l-2-3M13 5l2-3" stroke="#5c0000" strokeWidth="1"/>
                  </svg>
                }
                open={win('doom').open}
                zIndex={win('doom').zIndex}
                onClose={() => closeWindow('doom')}
                onFocus={() => focusWindow('doom')}
                onDragStart={(e) => handleDragStart('doom', e.clientX, e.clientY)}
                width={700}
                menuItems={['File', 'Edit', 'View', 'Help']}
              >
                <div className="window-content" style={{ padding: '8px 10px' }}>
                  <DoomWindow onClose={() => closeWindow('doom')} />
                </div>
              </XpWindow>
            </motion.div>
          )}

          {win('contact').open && (
            <motion.div key="contact" style={winStyle('contact')} {...winAnim}>
              <XpWindow
                title="Contact Me"
                icon={<img src="/icons/Documents.png" alt="" width={20} height={20} />}
                open={win('contact').open}
                zIndex={win('contact').zIndex}
                onClose={() => closeWindow('contact')}
                onFocus={() => focusWindow('contact')}
                onDragStart={(e) => handleDragStart('contact', e.clientX, e.clientY)}
                width={620}
                menuItems={['File', 'Edit', 'Format', 'Help']}
              >
                <div className="window-content">
                  <div className="cw">
                    <div className="cw-info">
                      <h3 className="cw-name">Justine Rhey</h3>
                      <a className="cw-email" href="mailto:justrhey.tambong@gmail.com">justrhey.tambong@gmail.com</a>
                      <div className="cw-socials">
                        <a href="https://github.com/justrhey" target="_blank" rel="noopener">GitHub</a>
                        <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener">LinkedIn</a>
                        <a href="CV_Justine_Rhey_Tambong.pdf" download>CV ↓</a>
                      </div>
                    </div>
                    <form className="cw-form" onSubmit={handleSubmit}>
                      <div className="cw-field">
                        <label htmlFor="formName">Name</label>
                        <input type="text" id="formName" name="name" placeholder="Your name" required />
                      </div>
                      <div className="cw-field">
                        <label htmlFor="formEmail">Email</label>
                        <input type="email" id="formEmail" name="email" placeholder="you@example.com" required />
                      </div>
                      <div className="cw-field">
                        <label htmlFor="formMessage">Message</label>
                        <textarea id="formMessage" name="message" placeholder="What would you like to say?" required />
                      </div>
                      <button type="submit" className="cw-submit">Send Message →</button>
                      <div className="cw-status" id="formStatus" />
                    </form>
                  </div>
                </div>
              </XpWindow>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Project detail modal (XP style) ─── */}
      <AnimatePresence>
      {p && (
        <motion.div className="proj-modal-overlay" key="modal-overlay" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
          <motion.div className="xp-dialog" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.15 }} onClick={e => e.stopPropagation()}>
            <div className="xpw-title-bar">
              <span className="xpw-title-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#fff"><rect x="2" y="2" width="12" height="12" rx="2" fill="#1a5fb4"/><path d="M5 5h6v1H5zM5 7h6v1H5zM5 9h4v1H5z" fill="#fff"/></svg>
              </span>
              <span className="xpw-title-text">{p.name} - Properties</span>
              <div className="xpw-title-buttons">
                <button className="xpw-btn xpw-close" onClick={closeModal} aria-label="Close" title="Close" />
              </div>
            </div>
            <div className="xpw-menu-bar" aria-hidden="true">
              <span className="xpw-menu-item active">General</span>
              <span className="xpw-menu-item">Summary</span>
              <span className="xpw-menu-item">Details</span>
            </div>
            <div className="xpw-body" style={{ padding: 0 }}>
              <div className="xp-modal-content">
                <div className="xp-modal-img-wrap">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="xp-modal-info">
                  <div className="xp-modal-meta">
                    <span className="xp-modal-year">{p.year}</span>
                    <span className="xp-modal-type">{p.tags[0]}</span>
                  </div>
                  <h3 className="xp-modal-title">{p.name}</h3>
                  <p className="xp-modal-desc">{p.desc}</p>
                  <div className="xp-modal-tags">
                    {p.tags.map(t => <span className="pw-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="xp-dialog-buttons">
              {p.live && <a href={p.live} target="_blank" rel="noopener" className="xp-dialog-btn">Live Demo</a>}
              {p.github && <a href={p.github} target="_blank" rel="noopener" className="xp-dialog-btn">GitHub</a>}
              <button className="xp-dialog-btn xp-dialog-default" onClick={closeModal} style={{ marginLeft: 'auto' }}>OK</button>
              <button className="xp-dialog-btn" onClick={closeModal}>Cancel</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ─── Taskbar ─── */}
      <div className="taskbar">
        <button className={'taskbar-start' + (startOpen ? ' open' : '')} onClick={() => setStartOpen(v => !v)}>
          <span className="taskbar-start-logo">
            <img src="/startxpblue.png" alt="" width={25} height={20} />
          </span>
          Start
        </button>
        <div className="taskbar-divider" />
        <div className="taskbar-buttons">
          {SHORTCUTS.filter(s => winState[s.id]?.open).map(s => (
            <button key={s.id} className={'taskbar-btn' + (activeWindow === s.id ? ' active' : '')} onClick={() => focusWindow(s.id)} onContextMenu={(e) => handleCtxMenu(s.id, e)}>
              <span className="taskbar-btn-icon">{DESKTOP_ICONS[s.icon]}</span>
              {s.label}
            </button>
          ))}
        </div>
        <div className="taskbar-tray">
          <button className="taskbar-showdesk" onClick={showDesktop} title="Show Desktop" aria-label="Show Desktop" />
          <span className="taskbar-clock">{timeStr}</span>
        </div>
      </div>

      {/* ─── Task Button Context Menu ─── */}
      {ctxMenu && (
        <div className="task-ctx-menu" ref={ctxRef} style={{ left: ctxMenu.x, top: ctxMenu.y }} role="menu" aria-label="Window actions">
          <button className="task-ctx-item" role="menuitem" onClick={() => { focusWindow(ctxMenu.id); setCtxMenu(null); }}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M5 6h6M5 8h6M5 10h4"/></svg>
            </span>
            Restore
          </button>
          <button className="task-ctx-item" role="menuitem" onClick={() => { focusWindow(ctxMenu.id); setCtxMenu(null); }}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="5" width="12" height="9" rx="1"/><path d="M4 5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg>
            </span>
            Maximize
          </button>
          <div className="task-ctx-sep" />
          <button className="task-ctx-item" role="menuitem" onClick={() => { closeWindow(ctxMenu.id); setCtxMenu(null); }}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l8 8M12 4l-8 8"/></svg>
            </span>
            Close
          </button>
        </div>
      )}

      {/* ─── Start Menu ─── */}
      {startOpen && (
        <div className="start-menu">
          <div className="start-menu-brand">
            <span className="start-menu-user">Justine<br />Rhey</span>
          </div>
          <div className="start-menu-body">
            <div className="start-menu-items">
              {SHORTCUTS.map(s => (
                <button key={s.id} className="start-menu-item" onClick={() => openWindow(s.id)}>
                  <span className="start-menu-item-icon">{DESKTOP_ICONS[s.icon]}</span>
                  <span className="start-menu-item-label">{s.label}</span>
                </button>
              ))}
            </div>
            <div className="start-menu-footer">
              <button className="start-menu-item" onClick={() => setStartOpen(false)}>
                <span className="start-menu-item-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </span>
                <span className="start-menu-item-label">Log Off…</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ─── Clippy Assistant ─── */}
      <ClippyAssistant />
    </>
  );
}
