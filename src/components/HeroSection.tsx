import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({ articles: 0, cities: 0, books: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    const target = { articles: 48, cities: 23, books: 120 };
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        articles: Math.round(target.articles * ease),
        cities: Math.round(target.cities * ease),
        books: Math.round(target.books * ease),
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-greeting reveal-up">🌿 欢迎驻足</div>
        <h1 className="hero-title reveal-up">
          林间<em>笔记</em>
        </h1>
        <p className="hero-bio reveal-up">
          记录走过的路、吃过的饭、读过的书、写过的代码。<br />
          这里是探索者的数字花园。
        </p>
        <div className="hero-btns reveal-up">
          <button className="btn btn-primary magnetic" onClick={() => navigate('/category/travel')}>
            探索旅行
          </button>
          <button className="btn btn-ghost magnetic" onClick={() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })}>
            最新文章
          </button>
        </div>

        <div className="stats-card reveal-up">
          <div className="mini-stat">
            <span className="ms-num">{counts.articles}</span>
            <span className="ms-label">篇文章</span>
          </div>
          <div className="ms-divider" />
          <div className="mini-stat">
            <span className="ms-num">{counts.cities}</span>
            <span className="ms-label">个城市</span>
          </div>
          <div className="ms-divider" />
          <div className="mini-stat">
            <span className="ms-num">{counts.books}</span>
            <span className="ms-label">本书</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>向下探索</span>
      </div>
    </section>
  );
}
