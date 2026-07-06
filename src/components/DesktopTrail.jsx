import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DesktopTrail() {
  const containerRef = useRef(null);
  const trailRef = useRef(null);
  const animRef = useRef(true);
  const prevRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const TRAIL_SIZE = 256;
    const FADE_RATE = 0.045;

    const trailCanvas = document.createElement('canvas');
    trailCanvas.width = trailCanvas.height = TRAIL_SIZE;
    const tCtx = trailCanvas.getContext('2d');
    tCtx.fillStyle = '#000';
    tCtx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE);
    const trailTexture = new THREE.CanvasTexture(trailCanvas);
    trailTexture.minFilter = THREE.NearestFilter;
    trailTexture.magFilter = THREE.NearestFilter;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        resolution: { value: new THREE.Vector2(w, h) },
        mouseTrail: { value: trailTexture },
        gridSize: { value: 40 },
        pixelColor: { value: new THREE.Color('#5B9BD5') },
      },
      vertexShader: `void main(){gl_Position=vec4(position.xy,0.0,1.0);}`,
      fragmentShader: `
        uniform vec2 resolution; uniform sampler2D mouseTrail; uniform float gridSize; uniform vec3 pixelColor;
        vec2 coverUv(vec2 uv){vec2 s=resolution.xy/max(resolution.x,resolution.y);vec2 n=(uv-0.5)*s+0.5;return clamp(n,0.0,1.0);}
        void main(){
          vec2 uv=coverUv(gl_FragCoord.xy/resolution);
          vec2 guv=(floor(uv*gridSize)+0.5)/gridSize;
          float t=texture2D(mouseTrail,guv).r;
          gl_FragColor=vec4(pixelColor,t);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      const tx = Math.max(0, Math.min(TRAIL_SIZE, x * TRAIL_SIZE));
      const ty = Math.max(0, Math.min(TRAIL_SIZE, y * TRAIL_SIZE));
      tCtx.globalCompositeOperation = 'source-over';
      tCtx.lineWidth = 9; tCtx.lineCap = 'round'; tCtx.lineJoin = 'round'; tCtx.strokeStyle = '#ffffff';
      const p = prevRef.current;
      if (p) {
        const dx = tx - p.x, dy = ty - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < TRAIL_SIZE * 0.5) {
          tCtx.beginPath(); tCtx.moveTo(p.x, p.y); tCtx.lineTo(tx, ty); tCtx.stroke();
        }
      }
      tCtx.fillStyle = '#ffffff';
      tCtx.beginPath(); tCtx.arc(tx, ty, 4.5, 0, Math.PI * 2); tCtx.fill();
      prevRef.current = { x: tx, y: ty };
      trailTexture.needsUpdate = true;
    };
    const onLeave = () => { prevRef.current = null; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    function resize() {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      renderer.setSize(nw, nh);
      material.uniforms.resolution.value.set(nw, nh);
    }
    window.addEventListener('resize', resize);

    let anim = true;
    function animate() {
      if (!anim) return;
      requestAnimationFrame(animate);
      tCtx.globalCompositeOperation = 'source-over';
      tCtx.fillStyle = 'rgba(0,0,0,' + FADE_RATE + ')';
      tCtx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE);
      trailTexture.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();

    trailRef.current = { trailTexture, material };

    return () => {
      anim = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="desktop-trail" />;
}
