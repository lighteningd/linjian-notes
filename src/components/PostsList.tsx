import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTS_DATA, CAT_NAMES, CAT_COLORS } from '../assets/posts-data';

const CAT_CSS: Record<string, string> = {
  travel: 'cat-tag-travel',
  food: 'cat-tag-food',
  books: 'cat-tag-books',
  tech: 'cat-tag-tech',
};

export default function PostsList() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    const list = filter === 'all' ? POSTS_DATA : POSTS_DATA.filter(p => p.category === filter);
    return list.slice(0, visibleCount);
  }, [filter, visibleCount]);

  const total = useMemo(() => {
    return filter === 'all' ? POSTS_DATA.length : POSTS_DATA.filter(p => p.category === filter).length;
  }, [filter]);

  const hasMore = visibleCount < total;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Re-observe cards when filtered changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    gridRef.current?.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  // 3D tilt
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.post-card');
    const handlers: Array<{ el: Element; mm: (e: Event) => void; ml: () => void }> = [];

    cards?.forEach(card => {
      const mm = (e: Event) => {
        const me = e as MouseEvent;
        const r = card.getBoundingClientRect();
        const dx = (me.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (me.clientY - r.top - r.height / 2) / (r.height / 2);
        (card as HTMLElement).style.transform = `translateY(-5px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
      };
      const ml = () => { (card as HTMLElement).style.transform = ''; };
      card.addEventListener('mousemove', mm);
      card.addEventListener('mouseleave', ml);
      handlers.push({ el: card, mm, ml });
    });

    return () => {
      handlers.forEach(({ el, mm, ml }) => {
        el.removeEventListener('mousemove', mm);
        el.removeEventListener('mouseleave', ml);
      });
    };
  }, [filtered]);

  return (
    <section className="posts" id="posts" ref={sectionRef}>
      <div className="section-container">
        <div className="section-label reveal-up">
          <span className="label-line" />
          <span>Recent</span>
        </div>
        <h2 className="section-title reveal-up">近期的<em>记录与思考</em></h2>

        <div className="filter-bar reveal-up">
          {['all', 'travel', 'food', 'books', 'tech'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              data-filter={f}
              onClick={() => { setFilter(f); setVisibleCount(6); }}
            >
              {f === 'all' ? '全部' : CAT_NAMES[f]}
            </button>
          ))}
        </div>

        <div className="posts-grid" ref={gridRef}>
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className={`post-card ${i === 0 && filter === 'all' ? 'post-featured' : ''} reveal-up`}
              onClick={() => navigate(`/post/${p.category}/${p.id}`)}
            >
              <div className="post-img" style={{ background: `linear-gradient(135deg, ${CAT_COLORS[p.category]}22, ${CAT_COLORS[p.category]}11)` }}>
                <div className="post-img-icon">{p.cover}</div>
              </div>
              <div className="post-body">
                <div className="post-meta">
                  <span className={`post-cat ${CAT_CSS[p.category]}`}>{CAT_NAMES[p.category]}</span>
                  <span className="post-date">{p.date.replace(/-/g, ' · ')}</span>
                </div>
                <h3 className="post-title">{p.title}</h3>
                <p className="post-excerpt">{p.excerpt}</p>
                <div className="post-footer">
                  <span className="read-time">⏱ {p.readTime} 分钟</span>
                  <span className="read-more">阅读全文 →</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="load-more-wrap">
          <button
            className="btn btn-ghost load-more magnetic"
            disabled={!hasMore}
            onClick={() => setVisibleCount(c => c + 6)}
          >
            <span>{hasMore ? '加载更多' : '没有更多了 😊'}</span>
            {hasMore && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
