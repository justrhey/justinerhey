import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SKILL_ITEMS } from '../data/projects';

const ICON_SLUGS = {
  n8n: 'n8n',
  'Claude Code': 'anthropic',
  Java: 'openjdk',
  'Spring Boot': 'spring',
  Rust: 'rust',
  'Actix-web': 'actix',
  Python: 'python',
  'Django REST': 'django',
  Laravel: 'laravel',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  JWT: 'jsonwebtokens',
  React: 'react',
  TypeScript: 'typescript',
  Linux: 'linux',
  Git: 'git',
  Bash: 'gnubash',
};

export default function SkillsContent() {
  const containerRef = useRef(null);
  const animRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 660;
    const h = container.clientHeight || 380;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xf0f5fa, 1);
    container.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf0f5fa, 12, 26);
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 30);
    camera.position.set(0, 0, 9);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dl = new THREE.DirectionalLight(0xffffff, 1); dl.position.set(5, 8, 6); scene.add(dl);
    const bl = new THREE.DirectionalLight(0xffffff, 0.35); bl.position.set(-4, -3, -6); scene.add(bl);

    const gg = new THREE.SphereGeometry(2.4, 24, 18);
    const gw = new THREE.WireframeGeometry(gg);
    const globe = new THREE.LineSegments(gw, new THREE.LineBasicMaterial({ color: 0xa8d8ea }));
    scene.add(globe);
    const ig = new THREE.SphereGeometry(1.6, 16, 12);
    const iw = new THREE.WireframeGeometry(ig);
    const innerGlobe = new THREE.LineSegments(iw, new THREE.LineBasicMaterial({ color: 0x5b9bd5 }));
    scene.add(innerGlobe);

    const orbiters = [];
    function makeSprite(name) {
      const S = 100;
      const c = document.createElement('canvas');
      c.width = c.height = S;
      const ctx = c.getContext('2d');
      const tex = new THREE.CanvasTexture(c);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const slug = ICON_SLUGS[name] || '';
      img.onload = () => {
        ctx.clearRect(0, 0, S, S);
        const siz = S * 0.55;
        ctx.drawImage(img, (S - siz) / 2, (S - siz) / 2, siz, siz);
        tex.needsUpdate = true;
      };
      img.onerror = () => {
        ctx.clearRect(0, 0, S, S);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#1E293B';
        let fs = 22; ctx.font = '500 ' + fs + 'px Geist, sans-serif';
        while (ctx.measureText(name).width > S - 14 && fs > 8) { fs -= 2; ctx.font = '500 ' + fs + 'px Geist, sans-serif'; }
        ctx.fillText(name, S / 2, S / 2 + 1);
        tex.needsUpdate = true;
      };
      if (slug) img.src = 'https://cdn.simpleicons.org/' + slug + '/1e293b';
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true, depthWrite: false });
      const s = new THREE.Sprite(mat);
      s.scale.set(0.75, 0.75, 1);
      return s;
    }

    function hashStr(s) {
      let h = 0;
      for (let j = 0; j < s.length; j++) h = ((h << 5) - h + s.charCodeAt(j)) | 0;
      return Math.abs(h);
    }

    SKILL_ITEMS.forEach((name, i) => {
      let seed = hashStr(name) + i * 7919;
      function rnd() { seed = (seed * 16807 + 0) % 2147483647; return (seed & 0x7fffffff) / 2147483647; }
      const radius = 2 + rnd() * 2.6;
      const tilt = (rnd() - 0.5) * 1.6;
      const speed = 0.04 + rnd() * 0.28;
      const a0 = rnd() * Math.PI * 2;
      const cT = Math.cos(tilt); const sT = Math.sin(tilt);
      const sprite = makeSprite(name);
      sprite.position.set(Math.cos(a0) * radius, -Math.sin(a0) * radius * sT, Math.sin(a0) * radius * cT);
      sprite.userData = { angle: a0, radius, tilt, speed };
      scene.add(sprite);
      orbiters.push(sprite);
    });

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      const r = container.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMouse);

    let anim = true;
    let ox = 0, oy = 0;
    function animate() {
      if (!anim) return;
      requestAnimationFrame(animate);
      const dt = 0.016;
      globe.rotation.x += dt * 0.08;
      globe.rotation.y += dt * 0.12;
      innerGlobe.rotation.x -= dt * 0.05;
      innerGlobe.rotation.y += dt * 0.08;
      orbiters.forEach((sp) => {
        const ud = sp.userData;
        ud.angle += dt * ud.speed;
        const ca = Math.cos(ud.angle); const sa = Math.sin(ud.angle);
        const ct = Math.cos(ud.tilt); const st = Math.sin(ud.tilt);
        sp.position.x = ca * ud.radius;
        sp.position.z = sa * ud.radius * ct;
        sp.position.y = sa * ud.radius * (-st);
      });
      ox += (-mouseX * 1.2 - ox) * 0.035;
      oy += (-mouseY * 0.6 - oy) * 0.035;
      camera.position.x = Math.sin(ox * 0.3) * 9;
      camera.position.z = Math.cos(ox * 0.3) * 9;
      camera.position.y = oy * 0.3;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      anim = false;
      container.removeEventListener('mousemove', onMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="skills-window-content">
      <div className="skills-globe-wrap" ref={containerRef} />
      <div className="skills-globe-overlay">
        <h2><span className="txt-fill">Tech</span> <span className="txt-outline">Stack</span></h2>
      </div>
    </div>
  );
}
