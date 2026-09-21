// src/three/WirePolyhedron.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WirePolyhedron({ mouse }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow continuous rotation
    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.x += delta * 0.12;

    // Smooth mouse tilt
    const targetX = (mouse.current[1] * 0.3);
    const targetY = (mouse.current[0] * 0.3);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetY, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -targetX, 0.05);

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.15;
      innerRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshBasicMaterial
          color="#C084FC"
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner Translucent Facets with Subtle Purple Sheen */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2.18, 0]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#581C87"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Core Octahedron */}
      <mesh>
        <octahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial
          color="#A855F7"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glowing Vertex Spheres */}
      <points>
        <icosahedronGeometry args={[2.2, 0]} />
        <pointsMaterial
          color="#F4F1F8"
          size={0.09}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}
