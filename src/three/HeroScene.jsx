// src/three/HeroScene.jsx
import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WirePolyhedron from './WirePolyhedron';
import OrbitRings from './OrbitRings';
import ParticleField from './ParticleField';
import TechSatellites from './TechSatellites';

export default function HeroScene() {
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = [x, y];
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#D8B4FE" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7C3AED" />

        <Suspense fallback={null}>
          <group position={[1.4, 0.2, 0]}>
            <WirePolyhedron mouse={mouse} />
            <OrbitRings />
            <ParticleField count={100} mouse={mouse} />
            <TechSatellites />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
