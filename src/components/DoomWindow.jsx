import { useRef, useEffect, useState } from 'react';
import { DOOM } from 'wasm-doom';

/* Dispatch a synthetic keyboard event on the canvas.
   DOOM's own keyboard handler catches these and sends them to WASM. */
function fireKey(canvas, keyCode, type) {
  canvas.dispatchEvent(new KeyboardEvent(type, {
    keyCode, bubbles: true, cancelable: true,
  }));
}

function releaseX(state) {
  if (state.activeX !== 0) {
    fireKey(state.canvas, state.activeX === -1 ? 37 : 39, 'keyup');
    state.activeX = 0;
  }
}
function releaseY(state) {
  if (state.activeY !== 0) {
    fireKey(state.canvas, state.activeY === -1 ? 38 : 40, 'keyup');
    state.activeY = 0;
  }
}
function releaseAll(state) {
  releaseX(state);
  releaseY(state);
}

export default function DoomWindow({ onClose }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(true);
  const [status, setStatus] = useState('loading');
  const [pointerLocked, setPointerLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    isActiveRef.current = true;

    /* ─── Mouse → keyboard (pointer-lock look) ───
         Accumulate movementX/movementY per frame and map to arrow key
         events. A timer-based idle check releases all keys 50ms after
         the mouse stops, preventing the "keeps spinning" bug.      */
    const state = {
      canvas,
      accX: 0, accY: 0,          // accumulated pointer deltas
      activeX: 0, activeY: 0,     // -1/0/1 per axis — last dispatched dir
      lastMoveTime: 0,            // performance.now() of last mousemove
      frameId: null,
    };
    const THRESH = 8;

    function pollMouse() {
      if (!pointerLockRef.current || !isActiveRef.current) {
        releaseAll(state);
        state.frameId = null;
        return;
      }

      // If mouse has been idle for 50ms, release all and stop polling
      if (performance.now() - state.lastMoveTime > 50) {
        releaseAll(state);
        state.accX = 0;
        state.accY = 0;
        state.frameId = null;
        return;
      }

      // Map accumulated movement to direction (-1/0/1 per axis)
      const wantX = state.accX > THRESH ? 1 : state.accX < -THRESH ? -1 : 0;
      const wantY = state.accY > THRESH ? 1 : state.accY < -THRESH ? -1 : 0;

      // Dispatch key changes
      if (wantX !== state.activeX) {
        releaseX(state);
        if (wantX !== 0)
          fireKey(canvas, wantX === -1 ? 37 : 39, 'keydown');
        state.activeX = wantX;
      }
      if (wantY !== state.activeY) {
        releaseY(state);
        if (wantY !== 0)
          fireKey(canvas, wantY === -1 ? 38 : 40, 'keydown');
        state.activeY = wantY;
      }

      // Aggressive decay — values drop fast so keys release promptly
      state.accX = Math.abs(state.accX) < 1 ? 0 : state.accX * 0.35;
      state.accY = Math.abs(state.accY) < 1 ? 0 : state.accY * 0.35;

      state.frameId = requestAnimationFrame(pollMouse);
    }

    /* ─── Native event handlers (document-level for pointer-lock safety) ─── */
    function onPointerChange() {
      const locked = document.pointerLockElement === canvas;
      pointerLockRef.current = locked;
      setPointerLocked(locked);
      if (!locked) {
        releaseAll(state);
        state.accX = 0; state.accY = 0;
        if (state.frameId) cancelAnimationFrame(state.frameId);
        state.frameId = null;
      } else {
        state.lastMoveTime = performance.now();
        if (!state.frameId) state.frameId = requestAnimationFrame(pollMouse);
      }
    }

    function onMouseMove(e) {
      if (document.pointerLockElement !== canvas) return;
      state.accX += e.movementX || 0;
      state.accY += e.movementY || 0;
      state.lastMoveTime = performance.now();
      // Start poll if not already running
      if (!state.frameId) state.frameId = requestAnimationFrame(pollMouse);
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

    /* ─── WASD remap ───
         W/S → up/down arrows (forward/backward).
         A/D pass through to DOOM's native handler for strafe.
         stopImmediatePropagation prevents DOOM from getting the
         *original* key AND our synthetic arrow key (which would
         double-fire forward/backward on W/S).                   */
    const WASD_MAP = { 87: 38, 83: 40 }; // W→up, S→down
    function onKeyDown(e) {
      const mapped = WASD_MAP[e.keyCode];
      if (mapped) {
        e.stopImmediatePropagation();
        e.preventDefault();
        fireKey(canvas, mapped, 'keydown');
      }
    }
    function onKeyUp(e) {
      const mapped = WASD_MAP[e.keyCode];
      if (mapped) {
        e.stopImmediatePropagation();
        fireKey(canvas, mapped, 'keyup');
      }
    }

    /* Bind */
    const pointerLockRef = { current: false };
    function onPointerError() {}
    document.addEventListener('pointerlockchange', onPointerChange);
    document.addEventListener('pointerlockerror', onPointerError);
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
      if (state.frameId) cancelAnimationFrame(state.frameId);
      releaseAll(state);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
      document.removeEventListener('pointerlockchange', onPointerChange);
      document.removeEventListener('pointerlockerror', onPointerError);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onCanvasClick);
      canvas.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('keyup', onKeyUp);
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
          <span className="doom-hint-text">
            {pointerLocked ? 'Escape to release mouse' : 'Click to play (WASD + mouse look)'}
          </span>
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
