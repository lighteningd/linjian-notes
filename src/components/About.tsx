import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ articles: 0, cities: 0, books: 0 });

  useEffect(() => {
    // Reveal observer
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    // Counter animation
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
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="about-inner">
          <div className="about-avatar-wrap reveal-up">
            <div className="about-avatar">
              <div className="avatar-ring ring1" />
              <div className="avatar-ring ring2" />
              <div className="avatar-core">
                <svg viewBox="0 0 100 100" width="70" height="70">
                  <circle cx="50" cy="36" r="22" fill="var(--morandi-sage)" />
                  <ellipse cx="50" cy="85" rx="32" ry="18" fill="var(--morandi-sage)" />
                </svg>
              </div>
            </div>
            <div className="about-name">探索者</div>
            <div className="about-tagline">愿做一个有温度的记录者</div>
            <div className="about-socials">
              <a className="social-btn" href="mailto:278825000@qq.com" title="邮件">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a className="social-btn" href="#" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          <div className="about-bio reveal-up">
            <div className="section-label">
              <span className="label-line" />
              <span>关于这里</span>
            </div>
            <h2 className="section-title">一个<em>有故事的人</em><br />和他的笔记本</h2>
            <p className="bio-text">
              白天是一名后端工程师，用代码解决问题；下班后变成一个热爱生活的普通人。
              喜欢在旅途中发现不同角落的温度，喜欢在美食里寻找文化的线索，
              喜欢用一本书打开一扇窗。
            </p>
            <p className="bio-text">
              这里没有宏大的叙事，只有真实的记录——那些走过的路、吃过的饭、
              读过的书，以及偶尔冒出来的技术碎碎念。
            </p>
            <div className="bio-hobbies">
              <div className="hobby-item" onClick={() => navigate('/category/travel')}>
                <span className="hobby-icon">✈️</span>
                <div>
                  <p className="hobby-title">旅行探索</p>
                  <p className="hobby-sub">23 个城市足迹</p>
                </div>
              </div>
              <div className="hobby-item" onClick={() => navigate('/category/food')}>
                <span className="hobby-icon">🍜</span>
                <div>
                  <p className="hobby-title">美食记录</p>
                  <p className="hobby-sub">烟火气最抚人心</p>
                </div>
              </div>
              <div className="hobby-item" onClick={() => navigate('/category/books')}>
                <span className="hobby-icon">📚</span>
                <div>
                  <p className="hobby-title">阅读笔记</p>
                  <p className="hobby-sub">{counts.books}+ 本读后感</p>
                </div>
              </div>
              <div className="hobby-item" onClick={() => navigate('/category/tech')}>
                <span className="hobby-icon">💡</span>
                <div>
                  <p className="hobby-title">技术分享</p>
                  <p className="hobby-sub">写给未来的自己</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
