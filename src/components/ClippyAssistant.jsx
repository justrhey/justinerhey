import { useState, useEffect, useRef, useCallback } from 'react';
import './ClippyAssistant.css';

const TIPS = [
  "It looks like you're browsing a portfolio. Would you like help?",
  "Hi there! I'm Clippy! Need help navigating?",
  "Did you know… you can drag windows by their title bars?",
  "Tip of the day: Double-click a desktop icon to open a window!",
  "Would you like to take a tour of this desktop?",
  "It looks like you're writing code. Would you like a hand?",
  "You've got windows open. Want to switch between them?",
  "The Recycle Bin is empty. Very tidy!",
  "Hide me if I'm annoying! Just click the X.",
  "Did you know… this whole desktop was built with React?",
  "I'm here to help! Just click on me anytime.",
  "Pro tip: Click Start to see all available shortcuts.",
  "It looks like you're admiring a portfolio. I can help with that!",
  "Backend developer + AI engineer = full-stack wizard 🧙",
  "Psst… check out the Projects window for cool stuff!",
  "I'm like a paperclip, but friendlier!",
  "Still waiting for Windows 98 to load… just kidding!",
  "Have you tried dragging the windows around yet?",
  "This desktop runs at real Windows XP speed — in your browser!",
  "Looking for the Solitaire? Wrong desktop, sorry!",
];

export default function ClippyAssistant() {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState('');
  const [tipOpen, setTipOpen] = useState(false);
  const [phase, setPhase] = useState('enter'); // enter | idle | hidden
  const timerRef = useRef(null);
  const tipIdxRef = useRef(0);

  /* ─── Auto-show after delay ─── */
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setTip(TIPS[0]);
      tipIdxRef.current = 0;
      setTipOpen(true);
      setVisible(true);
      setPhase('idle');
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  /* ─── Rotate tips every 25s ─── */
  useEffect(() => {
    if (!visible || phase !== 'idle') return;
    timerRef.current = setInterval(() => {
      tipIdxRef.current = (tipIdxRef.current + 1) % TIPS.length;
      setTipOpen(false);
      setTimeout(() => {
        setTip(TIPS[tipIdxRef.current]);
        setTipOpen(true);
      }, 300);
    }, 25000);
    return () => clearInterval(timerRef.current);
  }, [visible, phase]);

  const handleClippyClick = () => {
    if (!tipOpen) {
      tipIdxRef.current = (tipIdxRef.current + 1) % TIPS.length;
      setTip(TIPS[tipIdxRef.current]);
      setTipOpen(true);
    } else {
      setTipOpen(false);
      setTimeout(() => {
        tipIdxRef.current = (tipIdxRef.current + 1) % TIPS.length;
        setTip(TIPS[tipIdxRef.current]);
        setTipOpen(true);
      }, 400);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setTipOpen(false);
    setPhase('hidden');
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`clippy-container ${phase === 'hidden' ? 'clippy-hiding' : ''}`}
      aria-label="Clippy the Office Assistant"
      role="complementary"
    >
      {/* Speech bubble */}
      {tipOpen && (
        <div className="clippy-bubble" onClick={handleClippyClick}>
          <p className="clippy-bubble-text">{tip}</p>
          <div className="clippy-bubble-tail" />
        </div>
      )}

      {/* Clippy character */}
      <button
        className="clippy-character"
        onClick={handleClippyClick}
        aria-label="Ask Clippy for help"
        title="Click me!"
      >
        <img src="./clippy.png" alt="Clippy" className="clippy-img" />
        <button
          className="clippy-close"
          onClick={handleDismiss}
          aria-label="Close Clippy"
          title="Hide Clippy"
        >
          ✕
        </button>
      </button>
    </div>
  );
}
