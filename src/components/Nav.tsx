import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavProps {
  onThemeToggle: () => void;
}

export default function Nav({ onThemeToggle }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (hash: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + hash;
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <span>🌿</span>
          <span>林间笔记</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><a href="/#about" onClick={e => { e.preventDefault(); scrollTo('#about'); }}>关于</a></li>
        <li><a href="/#categories" onClick={e => { e.preventDefault(); scrollTo('#categories'); }}>分类</a></li>
        <li><a href="/#posts" onClick={e => { e.preventDefault(); scrollTo('#posts'); }}>近期</a></li>
        <li><a href="/#gallery" onClick={e => { e.preventDefault(); scrollTo('#gallery'); }}>图集</a></li>
        <li><a href="/#contact" onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>留言</a></li>
      </ul>
      <div className="nav-right">
        <button className="theme-toggle" onClick={onThemeToggle} title="切换主题">◐</button>
      </div>
    </nav>
  );
}
