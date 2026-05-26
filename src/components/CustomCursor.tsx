import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mx = 0, my = 0;
    let fx = 0, fy = 0;

    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onHover = () => { cursor.classList.add('hover'); };
    const onLeave = () => { cursor.classList.remove('hover'); };

    const hoverTargets = 'a, button, .btn, .post-card, .cat-card, .hobby-item, .social-btn, .filter-btn, .category-item, .related-card, .gallery-item, .form-input';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    const animate = () => {
      fx += (mx - fx) * 0.2;
      fy += (my - fy) * 0.2;
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
      if (follower) { follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouse);
    animate();

    const observer = new MutationObserver(() => {
      document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouse);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
