import { useState, useRef, useEffect, useCallback, useMemo, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from './data/projects';
import XpWindow from './components/XpWindow';
import ProfileWordPad from './components/ProfileWordPad';
import SkillsContent from './components/SkillsContent';
import ClippyAssistant from './components/ClippyAssistant';
import DoomWindow from './components/DoomWindow';
import PortfolioBrowser, { GlobeIcon } from './components/PortfolioBrowser';
import './App.css';

const SHORTCUTS = [
  { id: 'profile', label: 'profile.txt', icon: 'txt' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'skills', label: 'Skills', icon: 'globe' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
  { id: 'doom', label: 'DOOM', icon: 'doom' },
  { id: 'portfolio', label: 'Portfolio', icon: 'browser' },
];

const DESKTOP_ICONS = {
  txt: <img src="./icons/file-icon.png" alt="" width={72} height={72} />,
  info: <img src="./icons/My computer.png" alt="" width={72} height={72} />,
  folder: <img src="./icons/Documents.png" alt="" width={72} height={72} />,
  globe: <img src="./icons/Network.png" alt="" width={72} height={72} />,
  mail: <img src="./icons/My computer.png" alt="" width={72} height={72} />,
  doom: <img src="./doom-icon.png" alt="" width={72} height={72} />,
  browser: <GlobeIcon size={72} />,
};

export default function App() {
  const [winState, setWinState] = useState({});
  const nextZ = useRef(10);
  const cascadeOff = useRef(0);
  const [startOpen, setStartOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [modalIdx, setModalIdx] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [altTabActive, setAltTabActive] = useState(false);
  const [altTabIdx, setAltTabIdx] = useState(0);
  const [clockFlyout, setClockFlyout] = useState(false);
  const clockRef = useRef(null);
  const [displayProps, setDisplayProps] = useState(false);
  const [dpTab, setDpTab] = useState(0);
  const dpTabs = ['Desktop', 'Screen Saver', 'Appearance', 'Settings'];
  const dragRef = useRef(null);
  const [ctxMenu, setCtxMenu] = useState(null);
  const ctxRef = useRef(null);
  const [desktopCtx, setDesktopCtx] = useState(null);
  const desktopCtxRef = useRef(null);
  const [desktopSub, setDesktopSub] = useState(null);
  const [selRect, setSelRect] = useState(null);
  const selStart = useRef(null);
  const iconRefs = useRef({});

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

  /* ─── Click outside to close clock flyout ─── */
  useEffect(() => {
    if (!clockFlyout) return;
    const handler = (e) => {
      if (clockRef.current && !clockRef.current.contains(e.target) && !e.target.closest('.taskbar-clock')) setClockFlyout(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [clockFlyout]);

  /* ─── Close start menu on outside click ─── */
  useEffect(() => {
    if (!startOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.taskbar') && !e.target.closest('.start-menu')) setStartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [startOpen]);

  /* ─── Desktop right-click context menu ─── */
  const handleDesktopCtx = useCallback((e) => {
    if (e.target.closest('.desktop-shortcut') || e.target.closest('.taskbar') || e.target.closest('.xp-window') || e.target.closest('.proj-modal-overlay') || e.target.closest('.start-menu') || e.target.closest('.clippy-container')) return;
    e.preventDefault();
    setDesktopCtx({ x: e.clientX, y: e.clientY });
    setDesktopSub(null);
  }, []);

  /* Close desktop context menu */
  useEffect(() => {
    if (!desktopCtx) return;
    const handler = (e) => {
      if (desktopCtxRef.current && !desktopCtxRef.current.contains(e.target)) {
        setDesktopCtx(null);
        setDesktopSub(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [desktopCtx]);

  /* ─── Desktop drag selection (rubber band) ─── */
  const handleDeskMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (e.target.closest('.desktop-shortcut') || e.target.closest('.xp-window') || e.target.closest('.taskbar') || e.target.closest('.start-menu')) return;
    selStart.current = { x: e.clientX, y: e.clientY };
    setSelRect({ sx: e.clientX, sy: e.clientY, cx: e.clientX, cy: e.clientY });
  }, []);

  useEffect(() => {
    if (!selRect) return;
    const handleMove = (e) => {
      if (!selStart.current) return;
      setSelRect(prev => prev ? { ...prev, cx: e.clientX, cy: e.clientY } : null);
    };
    const handleUp = () => { selStart.current = null; setSelRect(null); };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => { document.removeEventListener('mousemove', handleMove); document.removeEventListener('mouseup', handleUp); };
  }, [selRect]);

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
    const sizes = { profile: [880, 640], projects: [960, 720], skills: [960, 720], contact: [900, 680], doom: [664, 540], portfolio: [980, 680] };
    const [w, h] = sizes[id] || [600, 420];
    const posX = Math.max(20, (window.innerWidth - w) / 2);
    const posY = Math.max(20, (window.innerHeight - h) / 2);
    setWinState(prev => ({
      ...prev,
      [id]: { open: true, minimized: false, zIndex: nextZ.current++, offset: 0, posX, posY },
    }));
    setStartOpen(false);
  }, []);

  const closeWindow = useCallback((id) => {
    setWinState(prev => {
      const next = { ...prev };
      if (next[id]) next[id] = { ...next[id], open: false, minimized: false };
      return next;
    });
  }, []);

  const focusWindow = useCallback((id) => {
    setWinState(prev => {
      const w = prev[id];
      if (!w || !w.open) return prev;
      return { ...prev, [id]: { ...w, zIndex: nextZ.current++, minimized: false } };
    });
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWinState(prev => {
      const w = prev[id];
      if (!w || !w.open) return prev;
      return { ...prev, [id]: { ...w, minimized: true } };
    });
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWinState(prev => {
      const w = prev[id];
      if (!w || !w.open) return prev;
      return { ...prev, [id]: { ...w, maximized: !w.maximized } };
    });
  }, []);

  /* ─── Alt+Tab window switcher ─── */
  useEffect(() => {
    let altHeld = false;
    const onDown = (e) => {
      if (e.key === 'Alt' && !altHeld) { altHeld = true; return; }
      if (e.key === 'Tab' && altHeld) {
        e.preventDefault();
        const openWs = Object.entries(winState).filter(([, w]) => w.open).sort(([, a], [, b]) => b.zIndex - a.zIndex);
        if (!openWs.length) return;
        if (!altTabActive) {
          setAltTabActive(true);
          setAltTabIdx(e.shiftKey ? openWs.length - 1 : 0);
        } else {
          setAltTabIdx(prev => {
            const len = openWs.length;
            return e.shiftKey ? (prev - 1 + len) % len : (prev + 1) % len;
          });
        }
      }
    };
    const onUp = (e) => {
      if (e.key === 'Alt') {
        altHeld = false;
        if (altTabActive) {
          const openWs = Object.entries(winState).filter(([, w]) => w.open).sort(([, a], [, b]) => b.zIndex - a.zIndex);
          if (openWs[altTabIdx]) focusWindow(openWs[altTabIdx][0]);
          setAltTabActive(false);
        }
      }
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, [altTabActive, altTabIdx, winState, focusWindow]);

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

  /* ─── Contact form submit (Outlook Express style) ─── */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cc = document.getElementById('oeCc')?.value?.trim();
    const subject = document.getElementById('oeSubject')?.value?.trim() || 'Portfolio Contact';
    const message = document.getElementById('oeMessage')?.value?.trim();
    const status = document.getElementById('oeStatus');
    if (!message) {
      if (status) status.textContent = 'Please write a message.';
      return;
    }
    let body = encodeURIComponent(message);
    if (cc) body += `%0A%0A--%20${encodeURIComponent(cc)}`;
    const mailto = `mailto:justrhey.tambong@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    if (status) status.textContent = 'Opening your mail client...';
    window.location.href = mailto;
    setTimeout(() => { if (status) status.textContent = 'Message ready. Thanks!'; }, 1000);
  }, []);

  /* ─── Window position ─── */
  function winStyle(id) {
    const w = win(id);
    if (w.maximized) {
      return { zIndex: 250, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: 'auto', height: 'auto' };
    }
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

  const ctxValue = useMemo(() => ({
    winState, activeWindow, nextZ, startOpen, timeStr, modalIdx,
    dragId, altTabActive, altTabIdx, clockFlyout, clockRef,
    displayProps, dpTab, dpTabs, dragRef, ctxMenu, ctxRef,
    desktopCtx, desktopCtxRef, desktopSub, selRect, selStart, iconRefs,
    setWinState, setStartOpen, setModalIdx,
    setDragId, setAltTabActive, setAltTabIdx, setClockFlyout,
    setDisplayProps, setDpTab, setCtxMenu, setDesktopCtx, setDesktopSub, setSelRect,
    openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow,
    handleDragStart, handleSubmit, handleDesktopCtx, handleCtxMenu,
    handleDeskMouseDown, showDesktop, openModal, closeModal,
    win, winStyle, winAnim, SHORTCUTS, DESKTOP_ICONS, PROJECTS,
  }), [winState, activeWindow, nextZ, startOpen, timeStr, modalIdx,
    dragId, altTabActive, altTabIdx, clockFlyout,
    displayProps, dpTab, dpTabs, ctxMenu, desktopCtx, desktopCtxRef, desktopSub,
    selRect, openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow,
    handleDragStart, handleSubmit, handleDesktopCtx, handleCtxMenu,
    handleDeskMouseDown, showDesktop, openModal, closeModal,
  ]);

  return (
    <DesktopContext.Provider value={ctxValue}>
      <DesktopContent />
    </DesktopContext.Provider>
  );
}

/* ═══════════════════════════════════════════════════
   DesktopContent — reads from DesktopContext
   ═══════════════════════════════════════════════════ */
const DesktopContext = createContext(null);
export function useDesktop() { return useContext(DesktopContext); }

function DesktopContent() {
  const ctx = useDesktop();
  if (!ctx) return null;
  const {
    winState, activeWindow, startOpen, timeStr, modalIdx,
    altTabActive, altTabIdx, clockFlyout, clockRef,
    displayProps, dpTab, dpTabs,
    ctxMenu, ctxRef, desktopCtx, desktopCtxRef, desktopSub, selRect,
    setStartOpen, setModalIdx, setClockFlyout,
    setDisplayProps, setDpTab, setCtxMenu, setDesktopCtx, setDesktopSub,
    openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow,
    handleDragStart, handleSubmit, handleDesktopCtx, handleCtxMenu,
    handleDeskMouseDown, showDesktop, openModal, closeModal,
    win, winStyle, winAnim, SHORTCUTS, DESKTOP_ICONS, PROJECTS,
  } = ctx;

  const p = PROJECTS[modalIdx];

  return (
    <>
      {/* ─── Desktop ─── */}
      <div className="desktop" id="desktop" onContextMenu={handleDesktopCtx} onMouseDown={handleDeskMouseDown}>
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
          {win('profile').open && !win('profile').minimized && (
            <motion.div key="profile" className="desktop-window-wrap" style={winStyle('profile')} {...winAnim}>
              <ProfileWordPad onClose={() => closeWindow('profile')} window
                onMinimize={() => minimizeWindow('profile')}
                onMaximize={() => maximizeWindow('profile')}
                maximized={win('profile').maximized}
                onDragStart={(e) => handleDragStart('profile', e.clientX, e.clientY)} />
            </motion.div>
          )}

          {win('projects').open && !win('projects').minimized && (
            <motion.div key="projects" className="win-wrap" style={winStyle('projects')} {...winAnim}>
              <XpWindow
                title="Projects"
                icon={<img src="./icons/Documents.png" alt="" width={20} height={20} />}
                open={win('projects').open}
                zIndex={win('projects').zIndex}
                onClose={() => closeWindow('projects')}
                onFocus={() => focusWindow('projects')}
                onDragStart={(e) => handleDragStart('projects', e.clientX, e.clientY)}
                onMinimize={() => minimizeWindow('projects')}
                onMaximize={() => maximizeWindow('projects')}
                maximized={win('projects').maximized}
                width={960}
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

          {win('skills').open && !win('skills').minimized && (
            <motion.div key="skills" className="win-wrap" style={winStyle('skills')} {...winAnim}>
              <XpWindow
                title="Skills"
                icon={<img src="./icons/Network.png" alt="" width={20} height={20} />}
                open={win('skills').open}
                zIndex={win('skills').zIndex}
                onClose={() => closeWindow('skills')}
                onFocus={() => focusWindow('skills')}
                onDragStart={(e) => handleDragStart('skills', e.clientX, e.clientY)}
                onMinimize={() => minimizeWindow('skills')}
                onMaximize={() => maximizeWindow('skills')}
                maximized={win('skills').maximized}
                width={960}
                menuItems={['File', 'Edit', 'View', 'Help']}
              >
                <SkillsContent />
              </XpWindow>
            </motion.div>
          )}

          {win('doom').open && (
            <motion.div key="doom" className="win-wrap" style={winStyle('doom')} {...winAnim}>
              <XpWindow
                title="DOOM (1993)"
                icon={<img src="./doom-logo-20.png" alt="" width={20} height={20} />}
                open={win('doom').open}
                zIndex={win('doom').zIndex}
                onClose={() => closeWindow('doom')}
                onFocus={() => focusWindow('doom')}
                onDragStart={(e) => handleDragStart('doom', e.clientX, e.clientY)}
                width={664}
                menuItems={['File', 'Edit', 'View', 'Help']}
              >
                <div className="window-content" style={{ padding: '8px 10px' }}>
                  <DoomWindow onClose={() => closeWindow('doom')} />
                </div>
              </XpWindow>
            </motion.div>
          )}

          {win('portfolio').open && !win('portfolio').minimized && (
            <motion.div key="portfolio" className="win-wrap" style={winStyle('portfolio')} {...winAnim}>
              <PortfolioBrowser
                onClose={() => closeWindow('portfolio')}
                onMinimize={() => minimizeWindow('portfolio')}
                onMaximize={() => maximizeWindow('portfolio')}
                maximized={win('portfolio').maximized}
                windowProps={{
                  zIndex: win('portfolio').zIndex,
                  onFocus: () => focusWindow('portfolio'),
                  onDragStart: (e) => handleDragStart('portfolio', e.clientX, e.clientY),
                }}
              />
            </motion.div>
          )}

          {win('contact').open && !win('contact').minimized && (
            <motion.div key="contact" className="win-wrap" style={winStyle('contact')} {...winAnim}>
              <XpWindow
                title="Contact Me"
                icon={<img src="./icons/Documents.png" alt="" width={20} height={20} />}
                open={win('contact').open}
                zIndex={win('contact').zIndex}
                onClose={() => closeWindow('contact')}
                onFocus={() => focusWindow('contact')}
                onDragStart={(e) => handleDragStart('contact', e.clientX, e.clientY)}
                onMinimize={() => minimizeWindow('contact')}
                onMaximize={() => maximizeWindow('contact')}
                maximized={win('contact').maximized}
                width={900}
                menuItems={['File', 'Edit', 'View', 'Insert', 'Format']}
              >
                <div className="window-content" style={{ padding: 0 }}>
                  <div className="oe-window">
                    {/* Toolbar */}
                    <div className="oe-toolbar">
                      <button className="oe-toolbar-btn" title="Send">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="3" width="14" height="10" rx="1" stroke="#316AC5" strokeWidth="1.2" fill="#E8EFF8"/>
                          <polyline points="1,3 8,9 15,3" stroke="#316AC5" strokeWidth="1.2" fill="none"/>
                          <line x1="1" y1="6" x2="5" y2="8" stroke="#316AC5" strokeWidth="0.8"/>
                          <line x1="15" y1="6" x2="11" y2="8" stroke="#316AC5" strokeWidth="0.8"/>
                        </svg>
                        Send
                      </button>
                      <div className="oe-toolbar-sep" />
                      <button className="oe-toolbar-btn" title="Cut">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM14 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#666" strokeWidth="1"/>
                          <line x1="3.5" y1="9" x2="12.5" y2="3" stroke="#666" strokeWidth="1"/>
                          <line x1="4" y1="8.5" x2="12" y2="11" stroke="#666" strokeWidth="1"/>
                        </svg>
                      </button>
                      <button className="oe-toolbar-btn" title="Copy">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="4.5" y="0.5" width="9" height="11" rx="1" stroke="#666" strokeWidth="1" fill="#fff"/>
                          <rect x="2.5" y="2.5" width="9" height="11" rx="1" fill="#fff" stroke="#666" strokeWidth="1"/>
                          <line x1="6" y1="6" x2="10" y2="6" stroke="#666" strokeWidth="0.8"/>
                          <line x1="6" y1="8" x2="10" y2="8" stroke="#666" strokeWidth="0.8"/>
                          <line x1="6" y1="10" x2="9" y2="10" stroke="#666" strokeWidth="0.8"/>
                        </svg>
                      </button>
                      <button className="oe-toolbar-btn" title="Paste">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="2" width="10" height="12" rx="1" fill="#fff" stroke="#666" strokeWidth="1"/>
                          <rect x="5.5" y="0.5" width="5" height="3" rx="0.5" fill="#fff" stroke="#666" strokeWidth="1"/>
                          <line x1="5" y1="6" x2="11" y2="6" stroke="#666" strokeWidth="0.8"/>
                          <line x1="5" y1="8" x2="11" y2="8" stroke="#666" strokeWidth="0.8"/>
                          <line x1="5" y1="10" x2="9" y2="10" stroke="#666" strokeWidth="0.8"/>
                        </svg>
                      </button>
                      <div className="oe-toolbar-sep" />
                      <button className="oe-toolbar-btn" title="Attach File">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 15a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v8a3 3 0 0 0 6 0V5" stroke="#666" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                          <circle cx="12" cy="4" r="1.5" fill="#ff4444"/>
                        </svg>
                      </button>
                    </div>

                    {/* Header fields */}
                    <div className="oe-fields">
                      <label>
                        <span className="oe-lbl">To:</span>
                        <input type="text" value="Justine Rhey" readOnly
                          style={{ color: '#666', fontStyle: 'italic' }} />
                      </label>
                      <label>
                        <span className="oe-lbl">Cc:</span>
                        <input id="oeCc" type="text" placeholder="your.name@example.com" />
                      </label>
                      <label>
                        <span className="oe-lbl">Subject:</span>
                        <input id="oeSubject" type="text" defaultValue="Portfolio Contact" />
                      </label>
                    </div>

                    <div className="oe-header-sep" />

                    {/* Message body */}
                    <div className="oe-body">
                      <textarea id="oeMessage" placeholder="Write your message here..." />
                    </div>

                    {/* Bottom bar */}
                    <div className="oe-bottom">
                      <span className="oe-status" id="oeStatus">Connected</span>
                      <button className="oe-send" onClick={handleSubmit}>
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="3" width="14" height="10" rx="1" stroke="#316AC5" strokeWidth="0.8" fill="#E8EFF8"/>
                          <polyline points="1,3 8,9 15,3" stroke="#316AC5" strokeWidth="1" fill="none"/>
                          <line x1="1" y1="6" x2="5" y2="8" stroke="#316AC5" strokeWidth="0.6"/>
                          <line x1="15" y1="6" x2="11" y2="8" stroke="#316AC5" strokeWidth="0.6"/>
                        </svg>
                        Send Message
                      </button>
                    </div>

                    {/* Contact links (like address book) */}
                    <div className="oe-contacts">
                      <a className="oe-contact-item" href="https://github.com/justrhey" target="_blank" rel="noopener">
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                        GitHub
                      </a>
                      <a className="oe-contact-item" href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener">
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                        LinkedIn
                      </a>
                      <a className="oe-contact-item" href="mailto:justrhey.tambong@gmail.com">
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 4.697v7.104l-5.803-3.558L16 4.697Z"/></svg>
                        Email
                      </a>
                      <a className="oe-contact-item" href="CV_Justine_Rhey_Tambong.pdf" download>
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M4 0h5.5v1H5v3h1V1.5L9 5l1 4H6v1h5v1H5V9H3.5L4 0ZM0 11v4h4v-1H1v-3H0Zm15 4v-3h-1v3h-3v1h3v-1h1Z"/></svg>
                        CV ↓
                      </a>
                    </div>
                  </div>
                </div>
              </XpWindow>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Rubber-band selection rectangle ─── */}
        {selRect && (
          <div className="desk-sel-rect" style={{
            left: Math.min(selRect.sx, selRect.cx),
            top: Math.min(selRect.sy, selRect.cy),
            width: Math.abs(selRect.cx - selRect.sx),
            height: Math.abs(selRect.cy - selRect.sy),
          }} />
        )}
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
            <img src="./startxpblue.png" alt="" width={25} height={20} />
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
          <button className="taskbar-clock" onClick={() => setClockFlyout(v => !v)}>{timeStr}</button>
        </div>
      </div>

      {/* ─── XP Yellow Balloon Tooltip ─── */}
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

      {/* ─── Desktop Context Menu ─── */}
      {desktopCtx && (
        <div className="desk-ctx-menu" ref={desktopCtxRef} style={{ left: desktopCtx.x, top: desktopCtx.y }} role="menu" aria-label="Desktop actions">
          <button className="task-ctx-item" role="menuitem" onClick={() => { setDesktopCtx(null); setDesktopSub(desktopSub === 'new' ? null : 'new'); }}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><rect x="2" y="6" width="12" height="8" rx="1"/><path d="M7 3h2v3H7z"/><path d="M6 2h4v2H6z"/></svg>
            </span>
            New
            <span className="task-ctx-arrow">▸</span>
          </button>
          {desktopSub === 'new' && (
            <div className="desk-ctx-sub" style={{ left: '100%', top: 0 }}>
              <button className="task-ctx-item" role="menuitem" onClick={() => setDesktopCtx(null)}>Folder</button>
              <button className="task-ctx-item" role="menuitem" onClick={() => setDesktopCtx(null)}>Shortcut</button>
              <button className="task-ctx-item" role="menuitem" onClick={() => setDesktopCtx(null)}>Text Document</button>
            </div>
          )}
          <div className="task-ctx-sep" />
          <button className="task-ctx-item" role="menuitem" onClick={() => setDesktopCtx(null)}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 8h3l2-4 3 8 2-4h2"/></svg>
            </span>
            Arrange Icons By
            <span className="task-ctx-arrow">▸</span>
          </button>
          <button className="task-ctx-item" role="menuitem" onClick={() => setDesktopCtx(null)}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 10l3-3-3-3M4 6l-3 3 3 3"/></svg>
            </span>
            Refresh
          </button>
          <div className="task-ctx-sep" />
          <button className="task-ctx-item" role="menuitem" onClick={() => setDesktopCtx(null)}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="5" width="10" height="9" rx="1"/><path d="M5 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </span>
            Paste
            <span className="task-ctx-shortcut">Ctrl+V</span>
          </button>
          <div className="task-ctx-sep" />
          <button className="task-ctx-item" role="menuitem" onClick={() => { setDesktopCtx(null); setDisplayProps(true); setDpTab(0); }}>
            <span className="task-ctx-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 4v8M8 4v8M11 4v8M4 5h8M4 8h8M4 11h8"/></svg>
            </span>
            Properties
          </button>
        </div>
      )}

      {/* ─── Start Menu (authentic XP Luna) ─── */}
      {startOpen && (
        <div className="start-menu">
          {/* ─── Header ─── */}
          <div className="start-menu-header">
            <div className="start-menu-avatar">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#2D5C8A">
                <circle cx="12" cy="8" r="5" />
                <ellipse cx="12" cy="20" rx="10" ry="6" />
              </svg>
            </div>
            <span className="start-menu-username">Justine Rhey</span>
          </div>

          {/* ─── Body ─── */}
          <div className="start-menu-body">
            {/* Left column — pinned programs */}
            <div className="start-menu-col-left">
              <button className="start-menu-item" onClick={() => openWindow('profile')}>
                <span className="start-menu-item-icon">{DESKTOP_ICONS.txt}</span>
                <div className="start-menu-item-text">
                  <span className="start-menu-item-label">profile.txt</span>
                  <span className="start-menu-item-desc">WordPad Document</span>
                </div>
              </button>
              <button className="start-menu-item" onClick={() => openWindow('projects')}>
                <span className="start-menu-item-icon">{DESKTOP_ICONS.folder}</span>
                <div className="start-menu-item-text">
                  <span className="start-menu-item-label">Projects</span>
                  <span className="start-menu-item-desc">File Folder</span>
                </div>
              </button>
              <button className="start-menu-item" onClick={() => openWindow('skills')}>
                <span className="start-menu-item-icon">{DESKTOP_ICONS.globe}</span>
                <div className="start-menu-item-text">
                  <span className="start-menu-item-label">Skills</span>
                  <span className="start-menu-item-desc">Shortcut</span>
                </div>
              </button>
              <button className="start-menu-item" onClick={() => openWindow('portfolio')}>
                <span className="start-menu-item-icon">{DESKTOP_ICONS.browser}</span>
                <div className="start-menu-item-text">
                  <span className="start-menu-item-label">Portfolio</span>
                  <span className="start-menu-item-desc">Internet Shortcut</span>
                </div>
              </button>

              <div className="start-menu-separator" />

              <button className="start-menu-item" onClick={() => {
                setStartOpen(false);
                window.open('CV_Justine_Rhey_Tambong.pdf', '_blank');
              }}>
                <span className="start-menu-item-icon">
                  <svg viewBox="0 0 32 32" width="32" height="32">
                    <rect x="4" y="2" width="24" height="28" rx="2" fill="#FFFFFF" stroke="#808080" strokeWidth="1.5"/>
                    <rect x="6" y="4" width="20" height="2" rx="1" fill="#1A3B6E"/>
                    <rect x="6" y="10" width="16" height="2" rx="1" fill="#1A3B6E"/>
                    <rect x="6" y="14" width="18" height="2" rx="1" fill="#1A3B6E"/>
                    <rect x="6" y="18" width="12" height="2" rx="1" fill="#1A3B6E"/>
                    <rect x="6" y="22" width="14" height="2" rx="1" fill="#1A3B6E"/>
                  </svg>
                </span>
                <div className="start-menu-item-text">
                  <span className="start-menu-item-label">CV / Resume</span>
                  <span className="start-menu-item-desc">Adobe Acrobat Document</span>
                </div>
              </button>
            </div>

            {/* Right column — system links */}
            <div className="start-menu-col-right">
              <button className="start-menu-item start-menu-item-right" onClick={() => openWindow('contact')}>
                <span className="start-menu-item-icon">
                  <svg viewBox="0 0 32 32" width="28" height="28">
                    <rect x="2" y="6" width="28" height="20" rx="2" fill="#F0F0F0" stroke="#808080" strokeWidth="1.5"/>
                    <rect x="4" y="8" width="24" height="16" rx="1" fill="#FFFFFF"/>
                    <path d="M2 26L12 18" stroke="#808080" strokeWidth="1.5" fill="none"/>
                    <path d="M30 26L20 18" stroke="#808080" strokeWidth="1.5" fill="none"/>
                    <circle cx="16" cy="16" r="4" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/>
                  </svg>
                </span>
                <span className="start-menu-item-label">Contact Me</span>
              </button>

              <div className="start-menu-separator-right" />

              <button className="start-menu-item start-menu-item-right" onClick={() => openWindow('doom')}>
                <span className="start-menu-item-icon">
                  <img src="./doom-icon.png" alt="" width={28} height={28} />
                </span>
                <span className="start-menu-item-label">DOOM (1993)</span>
              </button>

              <div className="start-menu-separator-right" />

              <button className="start-menu-item start-menu-item-right" onClick={() => setStartOpen(false)}>
                <span className="start-menu-item-icon">
                  <svg viewBox="0 0 32 32" width="28" height="28">
                    <rect x="6" y="4" width="20" height="24" rx="2" fill="#FFFFFF" stroke="#808080" strokeWidth="1.5"/>
                    <rect x="8" y="6" width="16" height="2" rx="1" fill="#1A3B6E"/>
                    <rect x="8" y="10" width="14" height="2" rx="1" fill="#1A3B6E"/>
                    <rect x="8" y="14" width="12" height="2" rx="1" fill="#1A3B6E"/>
                    <circle cx="18" cy="24" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/>
                    <path d="M22 6l4 4" stroke="#808080" strokeWidth="1.5" fill="none"/>
                  </svg>
                </span>
                <span className="start-menu-item-label">Help and Support</span>
              </button>
            </div>
          </div>

          {/* ─── Bottom bar ─── */}
          <div className="start-menu-bottom">
            <button className="start-menu-bottom-btn" onClick={() => setStartOpen(false)}>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                <polyline points="11 11 14 8 11 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="14" y1="8" x2="7" y2="8" stroke="#fff" strokeWidth="1.5"/>
              </svg>
              Log Off
            </button>
            <button className="start-menu-bottom-btn" onClick={() => setStartOpen(false)}>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="9" width="12" height="6" rx="1" stroke="#fff" strokeWidth="1.2" fill="none"/>
                <path d="M12 6a4 4 0 0 0-8 0" stroke="#fff" strokeWidth="1.5" fill="none"/>
                <circle cx="8" cy="11" r="1.5" fill="#FFE44D"/>
                <line x1="8" y1="11" x2="8" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Turn Off Computer
            </button>
          </div>
        </div>
      )}
      {/* ─── Clippy Assistant ─── */}

      {/* ─── Alt+Tab Switcher ─── */}
      {altTabActive && (() => {
        const openWs = Object.entries(winState).filter(([, w]) => w.open).sort(([, a], [, b]) => b.zIndex - a.zIndex);
        return (
          <div className="alttab-overlay">
            <div className="alttab-panel">
              {openWs.map(([id], i) => {
                const s = SHORTCUTS.find(s => s.id === id);
                return (
                  <div key={id} className={'alttab-item' + (i === altTabIdx ? ' active' : '')}>
                    <span className="alttab-icon">{s ? DESKTOP_ICONS[s.icon] : null}</span>
                    <span className="alttab-label">{s ? s.label : id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ─── Clock/Calendar Flyout ─── */}
      {clockFlyout && (
        <div className="clock-flyout" ref={clockRef}>
          <div className="clock-flyout-time">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="clock-flyout-date">
            {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="clock-flyout-cal">
            <div className="clock-cal-header">
              <button className="clock-cal-nav" onClick={() => {}}>◀</button>
              <span>{new Date().toLocaleDateString([], { month: 'long', year: 'numeric' })}</span>
              <button className="clock-cal-nav" onClick={() => {}}>▶</button>
            </div>
            <div className="clock-cal-grid">
              {['S','M','T','W','T','F','S'].map(d => <span key={d} className="clock-cal-dow">{d}</span>)}
              {(() => {
                const d = new Date(); const y = d.getFullYear(); const m = d.getMonth();
                const first = new Date(y, m, 1).getDay(); const days = new Date(y, m + 1, 0).getDate();
                const cells = []; const today = d.getDate();
                for (let i = 0; i < first; i++) cells.push(<span key={`e${i}`} className="clock-cal-day dim" />);
                for (let i = 1; i <= days; i++) cells.push(
                  <span key={i} className={'clock-cal-day' + (i === today ? ' today' : '')}>{i}</span>
                );
                return cells;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ─── Display Properties Dialog ─── */}
      {displayProps && (
        <div className="dp-overlay" onClick={(e) => { if (e.target === e.currentTarget) setDisplayProps(false); }}>
          <div className="dp-dialog" onClick={e => e.stopPropagation()}>
            <div className="dp-title-bar">
              <span className="dp-title-text">Display Properties</span>
              <button className="dp-title-close" onClick={() => setDisplayProps(false)}>✕</button>
            </div>
            <div className="dp-tabs">
              {dpTabs.map((t, i) => (
                <button key={t} className={'dp-tab' + (i === dpTab ? ' active' : '')} onClick={() => setDpTab(i)}>{t}</button>
              ))}
            </div>
            <div className="dp-body">
              {dpTab === 0 && (
                <div className="dp-tab-content">
                  <div className="dp-desktop-preview">
                    <div className="dp-preview-inner">
                      <span className="dp-preview-text">Desktop</span>
                    </div>
                  </div>
                  <div className="dp-desktop-controls">
                    <label className="dp-label">Background:</label>
                    <select className="dp-select" defaultValue="Bliss">
                      <option>Bliss</option>
                      <option>None</option>
                    </select>
                    <label className="dp-label">Color:</label>
                    <select className="dp-select" defaultValue="#3a6ea5">
                      <option value="#3a6ea5">Blue</option>
                      <option value="#538135">Green</option>
                      <option value="#cc3333">Red</option>
                    </select>
                  </div>
                </div>
              )}
              {dpTab === 1 && (
                <div className="dp-tab-content">
                  <p className="dp-saver-text">No screen saver configured.</p>
                  <select className="dp-select" defaultValue="(None)">
                    <option>(None)</option>
                    <option>Blank</option>
                    <option>3D Text</option>
                  </select>
                  <div className="dp-saver-preview">
                    <div className="dp-saver-inner">
                      <span className="dp-saver-text">Preview</span>
                    </div>
                  </div>
                </div>
              )}
              {dpTab === 2 && (
                <div className="dp-tab-content">
                  <div className="dp-appearance-preview">
                    <div className="dp-ap-inner">
                      <div className="dp-ap-title">Active Window</div>
                      <div className="dp-ap-body">Window Body</div>
                    </div>
                  </div>
                  <div className="dp-appearance-controls">
                    <label className="dp-label">Color scheme:</label>
                    <select className="dp-select" defaultValue="Blue (Luna)">
                      <option>Blue (Luna)</option>
                      <option>Olive Green</option>
                      <option>Silver</option>
                    </select>
                    <label className="dp-label">Font size:</label>
                    <select className="dp-select" defaultValue="Normal">
                      <option>Normal</option>
                      <option>Large Fonts</option>
                      <option>Extra Large Fonts</option>
                    </select>
                  </div>
                </div>
              )}
              {dpTab === 3 && (
                <div className="dp-tab-content">
                  <p className="dp-settings-text">Display settings let you control the resolution and color quality of your monitor.</p>
                  <div className="dp-settings-row">
                    <label className="dp-label">Screen resolution:</label>
                    <div className="dp-slider-wrap">
                      <input type="range" min="800" max="1920" defaultValue="1366" className="dp-slider" />
                      <span className="dp-slider-label">1366 × 768 pixels</span>
                    </div>
                  </div>
                  <div className="dp-settings-row">
                    <label className="dp-label">Color quality:</label>
                    <select className="dp-select" defaultValue="32">
                      <option value="16">High (16 bit)</option>
                      <option value="32">Highest (32 bit)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="dp-buttons">
              <button className="dp-btn dp-btn-default" onClick={() => setDisplayProps(false)}>OK</button>
              <button className="dp-btn" onClick={() => setDisplayProps(false)}>Cancel</button>
              <button className="dp-btn" onClick={() => setDisplayProps(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}

      <ClippyAssistant />
    </>
  );
}
