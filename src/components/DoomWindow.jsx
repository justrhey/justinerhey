import { useRef, useEffect, useState } from 'react';
import { DOOM } from 'wasm-doom';

/* Dispatch a synthetic keyboard event on the canvas.
   DOOM's own keyboard handler catches these and sends them to WASM. */
function fireKey(canvas, keyCode, type) {
  canvas.dispatchEvent(new KeyboardEvent(type, {
    keyCode, bubbles: true, cancelable: true,
  }));
}

/* WASD → arrow-key remap (DOOM WASM doesn't always map WASD by default) */
const WASD = { 87: 38, 83: 40, 65: 37, 68: 39 };

export default function DoomWindow({ onClose }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(true);
  const pointerLockRef = useRef(false);
  const [status, setStatus] = useState('loading');
  const [pointerLocked, setPointerLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    isActiveRef.current = true;

    /* ─── Mouse → keyboard (pointer-lock look) ─── */
    let accX = 0, accY = 0;
    let dirX = 0, dirY = 0; // -1/0/1 per axis
    let pollId = null;
    const THRESH = 3;
    const DECAY = 0.7;

    function releaseMouseKeys() {
      if (dirX === -1) { fireKey(canvas, 37, 'keyup'); dirX = 0; }
      if (dirX === 1)  { fireKey(canvas, 39, 'keyup'); dirX = 0; }
      if (dirY === -1) { fireKey(canvas, 38, 'keyup'); dirY = 0; }
      if (dirY === 1)  { fireKey(canvas, 40, 'keyup'); dirY = 0; }
      accX = 0; accY = 0;
    }

    function pollMouse() {
      const wantX = accX > THRESH ? 1 : accX < -THRESH ? -1 : 0;
      if (wantX !== dirX) {
        if (dirX === -1) fireKey(canvas, 37, 'keyup');
        if (dirX === 1)  fireKey(canvas, 39, 'keyup');
        if (wantX === -1) fireKey(canvas, 37, 'keydown');
        if (wantX === 1)  fireKey(canvas, 39, 'keydown');
        dirX = wantX;
      }
      const wantY = accY > THRESH ? 1 : accY < -THRESH ? -1 : 0;
      if (wantY !== dirY) {
        if (dirY === -1) fireKey(canvas, 38, 'keyup');
        if (dirY === 1)  fireKey(canvas, 40, 'keyup');
        if (wantY === -1) fireKey(canvas, 38, 'keydown');
        if (wantY === 1)  fireKey(canvas, 40, 'keydown');
        dirY = wantY;
      }
      accX *= DECAY; accY *= DECAY;
      if (Math.abs(accX) < 0.5) accX = 0;
      if (Math.abs(accY) < 0.5) accY = 0;
      if (pointerLockRef.current && isActiveRef.current)
        pollId = requestAnimationFrame(pollMouse);
    }

    function startPoll() { pollMouse(); }

    /* ─── Native event handlers (document-level for pointer-lock safety) ─── */
    function onPointerChange() {
      const locked = document.pointerLockElement === canvas;
      pointerLockRef.current = locked;
      setPointerLocked(locked);
      if (!locked) releaseMouseKeys();
      else startPoll();
    }

    function onMouseMove(e) {
      if (document.pointerLockElement !== canvas) return;
      accX += e.movementX || 0;
      accY += e.movementY || 0;
    }

    function onMouseDown(e) {
      if (document.pointerLockElement !== canvas) return;
      e.preventDefault();
      fireKey(canvas, 17, 'keydown'); // Ctrl → fire
    }

    function onMouseUp(e) {
      if (document.pointerLockElement !== canvas) return;
      fireKey(canvas, 17, 'keyup');
    }

    /* ─── Canvas-level handlers ─── */
    function onCanvasClick() {
      if (!pointerLockRef.current) canvas.requestPointerLock();
    }

    /* ─── WASD → arrow key remap ─── */
    function onKeyDown(e) {
      const mapped = WASD[e.keyCode];
      if (mapped) {
        fireKey(canvas, mapped, 'keydown');
        e.preventDefault();
        e.stopPropagation();
      }
    }
    function onKeyUp(e) {
      const mapped = WASD[e.keyCode];
      if (mapped) fireKey(canvas, mapped, 'keyup');
    }

    /* Bind */
    document.addEventListener('pointerlockchange', onPointerChange);
    document.addEventListener('pointerlockerror', () => { /* fail silent */ });
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('keyup', onKeyUp);

    /* ─── Start DOOM ─── */
    async function startGame() {
      try {
        const game = new DOOM({
          screenWidth: 640,
          screenHeight: 400,
          keyboardTarget: canvas,
          enableLogs: false,
          onFrameRender: ({ screen }) => {
            if (!isActiveRef.current || !ctx) return;
            const imageData = new ImageData(screen, 640, 400);
            ctx.putImageData(imageData, 0, 0);
          },
        });
        setStatus('ready');
        requestAnimationFrame(() => { if (isActiveRef.current) canvas.focus(); });
        await game.start();
      } catch (err) {
        console.error('DOOM failed:', err);
        if (isActiveRef.current) setStatus('error');
      }
    }
    startGame();

    return () => {
      isActiveRef.current = false;
      if (pollId) cancelAnimationFrame(pollId);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
      document.removeEventListener('pointerlockchange', onPointerChange);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className="doom-container">
      {status === 'loading' && (
        <div className="doom-message">
          <div className="doom-progress-track"><div className="doom-progress-fill" /></div>
          <p className="doom-msg-text">Initializing DOOM...</p>
          <p className="doom-msg-sub">Loading WebAssembly binary</p>
        </div>
      )}

      {status === 'error' && (
        <div className="doom-message doom-error-state">
          <div className="doom-error-icon">☠</div>
          <p className="doom-msg-text">Failed to load DOOM</p>
          <p className="doom-msg-sub">The WASM binary could not be fetched from CDN.</p>
          <button className="xp-dialog-btn" onClick={onClose} style={{ marginTop: 12 }}>Close</button>
        </div>
      )}

      {status === 'ready' && (
        <div className={`doom-overlay-hint${pointerLocked ? ' hidden' : ''}`}>
          {pointerLocked
            ? <span className="doom-hint-text">Escape to release mouse</span>
            : <span className="doom-hint-text">Click to play (WASD + mouse look)</span>
          }
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={640} height={400}
        tabIndex={0}
        className="doom-canvas"
        style={{ display: status === 'ready' ? 'block' : 'none' }}
      />
    </div>
  );
}
