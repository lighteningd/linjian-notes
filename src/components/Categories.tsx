import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const cats = [
  { key: 'travel', icon: '✈️', title: '旅行日志', desc: '丈量脚下的土地，感受陌生城市的呼吸', count: 10, tags: ['成都', '西藏', '云南', '大理'], cls: 'cat-travel' },
  { key: 'food', icon: '🍜', title: '美食笔记', desc: '一碗面的温度，一顿饭的故事，人间值得', count: 10, tags: ['火锅', '拉面', '早茶', '小吃'], cls: 'cat-food' },
  { key: 'books', icon: '📚', title: '读书随想', desc: '在字里行间漫游，遇见另一个自己', count: 10, tags: ['小说', '传记', '哲学', '技术'], cls: 'cat-books' },
  { key: 'tech', icon: '💡', title: '技术分享', desc: '把踩过的坑和悟到的道理，写给未来的自己', count: 10, tags: ['Java', 'React', 'AI', '工具'], cls: 'cat-tech' },
];

export default function Categories() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="categories" id="categories" ref={sectionRef}>
      <div className="section-container">
        <div className="section-label reveal-up">
          <span className="label-line" />
          <span>Explore</span>
        </div>
        <h2 className="section-title reveal-up">在<em>这些地方</em>留下脚印</h2>
        <p className="section-sub reveal-up">四个板块，四种生活。每一种都值得被认真记录。</p>

        <div className="cat-grid">
          {cats.map(cat => (
            <div key={cat.key} className={`cat-card ${cat.cls} reveal-up`} onClick={() => navigate(`/category/${cat.key}`)}>
              <div className="cat-bg-icon">{cat.icon}</div>
              <div className="cat-content">
                <div className="cat-icon-wrap">{cat.icon}</div>
                <h3 className="cat-title">{cat.title}</h3>
                <p className="cat-desc">{cat.desc}</p>
                <div className="cat-meta">
                  <span className="cat-count">{cat.count} 篇</span>
                  <span className="cat-arrow">→</span>
                </div>
              </div>
              <div className="cat-places">
                {cat.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
