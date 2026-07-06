/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../assets/card.glb';
import lanyardTex from '../assets/lanyard.png';

import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

/** Draw ID card face on canvas atlas. */
function drawIdCardFace(ctx, rect, baseW, baseH, profileImg, name, handle, roles) {
  const rx = rect.x * baseW;
  const ry = rect.y * baseH;
  const rw = rect.w * baseW;
  const rh = rect.h * baseH;

  ctx.save();
  ctx.beginPath();
  ctx.rect(rx, ry, rw, rh);
  ctx.clip();

  const grad = ctx.createLinearGradient(rx, ry, rx, ry + rh);
  grad.addColorStop(0, '#0F172A');
  grad.addColorStop(0.45, '#1E293B');
  grad.addColorStop(0.5, '#FFFFFF');
  grad.addColorStop(1, '#F8FAFC');
  ctx.fillStyle = grad;
  ctx.fillRect(rx, ry, rw, rh);

  ctx.strokeStyle = '#A8D8EA';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(rx + 12, ry + rh * 0.48);
  ctx.lineTo(rx + rw - 12, ry + rh * 0.48);
  ctx.stroke();

  const photoSize = rh * 0.35;
  const photoX = rx + rw * 0.08;
  const photoY = ry + rh * 0.08;
  const photoR = 6;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(photoX + photoR, photoY);
  ctx.lineTo(photoX + photoSize - photoR, photoY);
  ctx.quadraticCurveTo(photoX + photoSize, photoY, photoX + photoSize, photoY + photoR);
  ctx.lineTo(photoX + photoSize, photoY + photoSize - photoR);
  ctx.quadraticCurveTo(photoX + photoSize, photoY + photoSize, photoX + photoSize - photoR, photoY + photoSize);
  ctx.lineTo(photoX + photoR, photoY + photoSize);
  ctx.quadraticCurveTo(photoX, photoY + photoSize, photoX, photoY + photoSize - photoR);
  ctx.lineTo(photoX, photoY + photoR);
  ctx.quadraticCurveTo(photoX, photoY, photoX + photoR, photoY);
  ctx.closePath();
  ctx.clip();

  if (profileImg) {
    const ps = Math.min(photoSize / profileImg.width, photoSize / profileImg.height);
    const pw = profileImg.width * ps;
    const ph = profileImg.height * ps;
    ctx.drawImage(profileImg, photoX + (photoSize - pw) / 2, photoY + (photoSize - ph) / 2, pw, ph);
  } else {
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(photoX, photoY, photoSize, photoSize);
    ctx.fillStyle = '#94A3B8';
    ctx.font = `${photoSize * 0.4}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u{1F464}', photoX + photoSize / 2, photoY + photoSize / 2);
  }
  ctx.restore();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX - 1, photoY - 1, photoSize + 2, photoSize + 2);

  const textX = photoX + photoSize + rw * 0.04;
  const textW = rw - (textX - rx) - rw * 0.06;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 ${rh * 0.095}px "Geist", sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  let nameText = name || 'Justine Rhey';
  while (ctx.measureText(nameText).width > textW && parseFloat(ctx.font) > 10) {
    const cur = parseFloat(ctx.font);
    ctx.font = `600 ${cur - 1}px "Geist", sans-serif`;
  }
  ctx.fillText(nameText, textX, photoY + rh * 0.02);

  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = `500 ${rh * 0.045}px "Geist Mono", monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(handle || '@justrhey', textX, photoY + rh * 0.14);

  const rolesList = roles || ['Backend Dev', 'AI Engineer'];
  ctx.fillStyle = '#1E293B';
  ctx.font = `500 ${rh * 0.055}px "Geist", sans-serif`;
  let roleY = photoY + photoSize + rh * 0.04;
  rolesList.forEach((role) => {
    const roleH = rh * 0.065;
    const rolePad = rw * 0.015;
    const roleW = ctx.measureText(role).width + rolePad * 2;
    ctx.fillStyle = '#F0F5FA';
    const chipR = 4;
    const chipX = textX;
    const chipY2 = roleY;
    ctx.beginPath();
    ctx.moveTo(chipX + chipR, chipY2);
    ctx.lineTo(chipX + roleW - chipR, chipY2);
    ctx.quadraticCurveTo(chipX + roleW, chipY2, chipX + roleW, chipY2 + chipR);
    ctx.lineTo(chipX + roleW, chipY2 + roleH - chipR);
    ctx.quadraticCurveTo(chipX + roleW, chipY2 + roleH, chipX + roleW - chipR, chipY2 + roleH);
    ctx.lineTo(chipX + chipR, chipY2 + roleH);
    ctx.quadraticCurveTo(chipX, chipY2 + roleH, chipX, chipY2 + roleH - chipR);
    ctx.lineTo(chipX, chipY2 + chipR);
    ctx.quadraticCurveTo(chipX, chipY2, chipX + chipR, chipY2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.font = `500 ${rh * 0.04}px "Geist", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(role, chipX + roleW / 2, chipY2 + roleH / 2);
    roleY += roleH + rh * 0.015;
  });

  const stripeY = ry + rh * 0.82;
  ctx.fillStyle = '#5B9BD5';
  ctx.fillRect(rx + 12, stripeY, rw - 24, rh * 0.06);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 ${rh * 0.035}px "Geist Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ID: JR-2025-001', rx + rw / 2, stripeY + rh * 0.03);
  ctx.fillStyle = '#94A3B8';
  ctx.font = `500 ${rh * 0.035}px "Geist", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('MANILA · PHILIPPINES', rx + rw / 2, stripeY + rh * 0.08);

  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#5B9BD5';
  ctx.font = `700 ${rh * 1.2}px "Geist Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JR', rx + rw / 2, ry + rh / 2);
  ctx.restore();
  ctx.restore();
}

function generateIdCard(baseMap, profileImg, name, handle, roles) {
  const baseImg = baseMap.image;
  const W = baseImg.width;
  const H = baseImg.height;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return baseMap;

  ctx.drawImage(baseImg, 0, 0, W, H);
  drawIdCardFace(ctx, { x: 0, y: 0, w: 0.5, h: 0.755 }, W, H, profileImg, name, handle, roles);

  const backRx = 0.5 * W;
  const backRy = 0;
  const backRw = 0.5 * W;
  const backRh = 0.757 * H;
  ctx.save();
  ctx.beginPath();
  ctx.rect(backRx, backRy, backRw, backRh);
  ctx.clip();
  const bg = ctx.createLinearGradient(backRx, backRy, backRx, backRy + backRh);
  bg.addColorStop(0, '#1E293B');
  bg.addColorStop(1, '#0F172A');
  ctx.fillStyle = bg;
  ctx.fillRect(backRx, backRy, backRw, backRh);
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = '#A8D8EA';
  ctx.font = `700 ${backRh * 0.8}px "Geist Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JR', backRx + backRw / 2, backRy + backRh / 2);
  ctx.restore();

  const composite = new THREE.CanvasTexture(canvas);
  composite.colorSpace = THREE.SRGBColorSpace;
  composite.flipY = baseMap.flipY;
  composite.anisotropy = 16;
  composite.needsUpdate = true;
  return composite;
}

export default function Lanyard({
  position = [0, 0, 22],
  fov = 22,
  transparent = true,
  profilePhoto,
  name = 'Justine Rhey',
  handle = '@justrhey',
  roles = ['Backend Dev', 'AI Engineer'],
  lanyardImage,
  lanyardWidth = 0.9,
  cardScale = 3.5,
}) {
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-3, 5, -5]} intensity={0.5} />
        <HangingCard
          profilePhoto={profilePhoto}
          name={name}
          handle={handle}
          roles={roles}
          lanyardImage={lanyardImage}
          lanyardWidth={lanyardWidth}
          cardScale={cardScale}
        />
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function HangingCard({
  profilePhoto,
  name,
  handle,
  roles,
  lanyardImage,
  lanyardWidth = 0.9,
  cardScale = 3.5,
}) {
  const bandRef = useRef();
  const cardGroupRef = useRef();
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyardTex);
  const profileTex = useTexture(profilePhoto || null);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const img = profileTex?.image || null;
    return generateIdCard(baseMap, img, name, handle, roles);
  }, [profileTex, name, handle, roles, materials.base.map]);

  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
  );
  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // ── positioning ──
  const anchorY = 5.0;
  const halfCardH = 1.125 * cardScale;
  const bandTopGap = 1.0;                         // visible band from anchor to card clip
  const cardTopY = anchorY - bandTopGap;           // y of card top (clip area)
  const cardCenterY = cardTopY - halfCardH;        // y of card center
  const pendLength = anchorY - cardCenterY;        // pendulum radius (anchor to card center)

  const vec = new THREE.Vector3();

  useFrame((state, _delta) => {
    const t = state.clock.elapsedTime;
    const sway = Math.sin(t * 0.9) * 0.12;
    const swayZ = Math.sin(t * 0.6 + 1.2) * 0.04;

    // Pendulum position: card swings around anchor
    const sinSway = Math.sin(sway);
    const cosSway = Math.cos(sway);
    const sinZ = Math.sin(swayZ);
    const cosZ = Math.cos(swayZ);

    const cardX = pendLength * sinSway * cosZ;
    const cardY = anchorY - pendLength * cosSway * cosZ;
    const cardZ = pendLength * sinZ * cosSway;

    if (cardGroupRef.current) {
      cardGroupRef.current.position.set(cardX, cardY, cardZ);
      // Tilt card with swing
      cardGroupRef.current.rotation.z = sway;
      cardGroupRef.current.rotation.x = swayZ;
    }

    // Band curve from anchor to card clip top
    const clipTopY = cardY + halfCardH;
    const midX = cardX * 0.4;
    const midY = (anchorY + clipTopY) / 2;

    curve.points[0].set(0, anchorY, 0);
    curve.points[1].set(midX * 0.5, midY + 0.2, cardZ * 0.3);
    curve.points[2].set(midX * 0.8, midY - 0.2, cardZ * 0.6);
    curve.points[3].set(cardX, clipTopY, cardZ);

    if (bandRef.current) {
      bandRef.current.geometry.setPoints(curve.getPoints(24));
    }
  });

  return (
    <group>
      {/* Lanyard band */}
      <mesh ref={bandRef}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>

      {/* Card — animated position via useFrame */}
      <group ref={cardGroupRef} position={[0, cardCenterY, 0]}>
        <mesh
          geometry={nodes.card.geometry}
          scale={cardScale}
          position={[0, 0, -0.05]}
        >
          <meshPhysicalMaterial
            map={cardMap}
            map-anisotropy={16}
            clearcoat={1}
            clearcoatRoughness={0.15}
            roughness={0.9}
            metalness={0.8}
          />
        </mesh>
        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} scale={cardScale} position={[0, 0, -0.05]} />
        <mesh geometry={nodes.clamp.geometry} material={materials.metal} scale={cardScale} position={[0, 0, -0.05]} />
      </group>
    </group>
  );
}
