import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AIBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create neural network structure spread across entire space
    const nodes: THREE.Mesh[] = [];
    const lines: THREE.Line[] = [];
    const nodeCount = 60;

    // Node geometry and material
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5,
    });

    // Create nodes spread across entire viewport in 3D space
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 30
      );
      
      // Store velocity for animation
      (node as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      );
      
      nodes.push(node);
      scene.add(node);
    }

    // Line material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.15,
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update node positions
      nodes.forEach((node) => {
        const velocity = (node as any).velocity;
        node.position.add(velocity);

        // Bounce off boundaries - wider space
        if (Math.abs(node.position.x) > 25) velocity.x *= -1;
        if (Math.abs(node.position.y) > 17) velocity.y *= -1;
        if (Math.abs(node.position.z) > 15) velocity.z *= -1;
      });

      // Remove old lines
      lines.forEach(line => scene.remove(line));
      lines.length = 0;

      // Create new connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position);
          
          if (distance < 7) {
            const points = [nodes[i].position, nodes[j].position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
            lines.push(line);
          }
        }
      }

      // Very slow rotation for depth
      scene.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.4 }}
    />
  );
};

export default AIBackground;
