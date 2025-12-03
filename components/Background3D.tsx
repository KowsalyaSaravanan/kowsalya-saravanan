import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const Electron = ({ radius = 1.5, baseSpeed = 1, color = "#F43F5E", offset = 0 }: any) => {
  const ref = useRef<THREE.Mesh>(null);
  const angleRef = useRef(offset);
  
  useFrame((state, delta) => {
    angleRef.current += delta * baseSpeed;
    const t = angleRef.current;

    if (ref.current) {
      ref.current.position.x = Math.sin(t) * radius;
      ref.current.position.y = Math.cos(t * 0.8) * radius;
      ref.current.position.z = Math.cos(t * 1.2) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

const GeometricCrystal = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Outer Crystal Shell */}
        <Icosahedron args={[1, 1]} ref={meshRef} scale={2.5}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            wireframe={true}
          />
        </Icosahedron>
        
        {/* Inner Glowing Core */}
        <Icosahedron args={[0.8, 0]} scale={2}>
          <MeshDistortMaterial
            color="#F43F5E"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0}
            transparent
            opacity={0.3}
          />
        </Icosahedron>
      </group>
    </Float>
  );
};

const ScrollScene = () => {
  const { scene } = useThree();
  
  useFrame(() => {
    // Calculate scroll percentage (approximate based on body height)
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    
    const color1 = new THREE.Color('#0F172A'); // Slate Blue
    const color2 = new THREE.Color('#1E1B4B'); // Indigo
    const color3 = new THREE.Color('#2C0512'); // Dark Rose
    
    let targetColor = new THREE.Color();
    
    // Clamp 0-1
    const p = Math.min(Math.max(scrollPercent, 0), 1);
    
    if (p < 0.5) {
      targetColor.lerpColors(color1, color2, p * 2);
    } else {
      targetColor.lerpColors(color2, color3, (p - 0.5) * 2);
    }
    
    scene.background = targetColor;
    if(scene.fog) {
        // @ts-ignore
        scene.fog.color.copy(targetColor);
    } else {
        scene.fog = new THREE.FogExp2(targetColor, 0.05);
    }
  });
  
  return null;
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        eventSource={document.body}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <ScrollScene />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <GeometricCrystal />
      </Canvas>
    </div>
  );
};

export default Background3D;