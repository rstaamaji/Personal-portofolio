// src/three/TechSatellites.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const SATELLITES = [
  { name: 'Vue 3', angle: 0.2, radius: 3.2, y: 1.1 },
  { name: 'FastAPI', angle: 1.6, radius: 3.5, y: -0.9 },
  { name: 'Python', angle: 2.8, radius: 3.1, y: 1.5 },
  { name: 'AWS', angle: 3.9, radius: 3.6, y: -1.2 },
  { name: 'React', angle: 5.0, radius: 3.3, y: 0.6 },
];

export default function TechSatellites() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      {SATELLITES.map((sat, idx) => {
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;

        return (
          <group key={sat.name} position={[x, sat.y, z]}>
            <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  background: 'rgba(17, 16, 25, 0.85)',
                  border: '1px solid rgba(190, 165, 230, 0.3)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 16px rgba(168, 85, 247, 0.25)',
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                  transform: 'scale(0.85)',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#C084FC',
                    boxShadow: '0 0 8px #C084FC',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    color: '#F4F1F8',
                    textTransform: 'uppercase',
                  }}
                >
                  {sat.name}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
