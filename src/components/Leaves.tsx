import { useEffect, useRef } from 'react';

const LEAVES = ['🍃', '🌿', '🍂', '🌱', '🍁', '🪴', '💚'];

export default function Leaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let running = true;

    const spawn = () => {
      if (!running) return;
      const leaf = document.createElement('span');
      leaf.className = 'leaf';
      leaf.textContent = LEAVES[Math.floor(Math.random() * LEAVES.length)];
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.animationDuration = (Math.random() * 6 + 8) + 's';
      leaf.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
      leaf.style.animationDelay = '0s';
      container.appendChild(leaf);

      setTimeout(() => {
        if (leaf.parentNode) leaf.remove();
      }, 15000);
    };

    const interval = setInterval(spawn, 800);
    return () => { running = false; clearInterval(interval); };
  }, []);

  return <div className="leaves-container" ref={containerRef} />;
}
