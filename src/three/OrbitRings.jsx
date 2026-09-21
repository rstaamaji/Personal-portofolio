// src/three/OrbitRings.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OrbitRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const pulse1Ref = useRef();
  const pulse2Ref = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.12;
    }

    // Pulse nodes traveling along orbits
    if (pulse1Ref.current) {
      const angle = time * 0.7;
      pulse1Ref.current.position.x = Math.cos(angle) * 3.4;
      pulse1Ref.current.position.y = Math.sin(angle) * 3.4;
    }
    if (pulse2Ref.current) {
      const angle = -time * 0.5 + Math.PI;
      pulse2Ref.current.position.x = Math.cos(angle) * 4.2;
      pulse2Ref.current.position.y = Math.sin(angle) * 4.2;
    }
  });

  return (
    <group>
      {/* Orbit 1: Tilted Ring */}
      <group rotation={[1.1, 0.4, 0.2]}>
        <mesh ref={ring1Ref}>
          <ringGeometry args={[3.38, 3.41, 96]} />
          <meshBasicMaterial
            color="#A855F7"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Orbit Photon 1 */}
        <mesh ref={pulse1Ref}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#F4F1F8" />
        </mesh>
      </group>

      {/* Orbit 2: Wider Counter-Tilted Ring */}
      <group rotation={[-0.8, -0.6, 0.5]}>
        <mesh ref={ring2Ref}>
          <ringGeometry args={[4.18, 4.21, 96]} />
          <meshBasicMaterial
            color="#C084FC"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Orbit Photon 2 */}
        <mesh ref={pulse2Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#C084FC" />
        </mesh>
      </group>
    </group>
  );
}
