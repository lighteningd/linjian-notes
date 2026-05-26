import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Particles
    const count = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const morandiColors = [
      new THREE.Color('#9aaa97'), // sage
      new THREE.Color('#8fa8c8'), // sky
      new THREE.Color('#b89dab'), // mauve
      new THREE.Color('#c8b898'), // wheat
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = morandiColors[Math.floor(Math.random() * morandiColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isDark ? 0.7 : 0.5,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    for (let i = 0; i < 200; i++) {
      const p1 = Math.floor(Math.random() * count);
      const p2 = Math.floor(Math.random() * count);
      if (Math.abs(p1 - p2) < count / 3) {
        linePositions.push(positions[p1 * 3], positions[p1 * 3 + 1], positions[p1 * 3 + 2]);
        linePositions.push(positions[p2 * 3], positions[p2 * 3 + 1], positions[p2 * 3 + 2]);
      }
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x4a5a4a : 0x9aaa97,
      opacity: isDark ? 0.06 : 0.04,
      transparent: true,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse parallax
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const onMouse = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      points.rotation.x += 0.0001;
      points.rotation.y += 0.0002;
      lines.rotation.x += 0.0001;
      lines.rotation.y += 0.0002;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="hero-bg" />;
}
