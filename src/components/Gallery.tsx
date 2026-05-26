import { useEffect, useRef } from 'react';

const galleryItems = [
  { cls: 'tall', bg: '#b8c8d8', emoji: '🏔️', label: '西藏·纳木错', cat: 'travel' },
  { cls: 'wide', bg: '#c8d8b0', emoji: '🍲', label: '成都·串串香', cat: 'food' },
  { cls: '', bg: '#dfc8a8', emoji: '📖', label: '杭州·图书馆', cat: 'books' },
  { cls: 'tall', bg: '#c0b8d0', emoji: '🌊', label: '大理·洱海', cat: 'travel' },
  { cls: '', bg: '#c8b898', emoji: '☕', label: '上海·咖啡馆', cat: 'food' },
  { cls: 'wide', bg: '#d8c8b0', emoji: '⛰️', label: '黄山·云海', cat: 'travel' },
  { cls: '', bg: '#b0c8b8', emoji: '🌸', label: '乌镇·水乡', cat: 'travel' },
  { cls: '', bg: '#c8b0b8', emoji: '🖥️', label: '会议·分享', cat: 'tech' },
];

export default function Gallery() {
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
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="section-container">
        <div className="section-label reveal-up">
          <span className="label-line" />
          <span>Gallery</span>
        </div>
        <h2 className="section-title reveal-up">影像<em>随手记</em></h2>
        <p className="section-sub reveal-up">那些值得被定格的瞬间，让回忆有了颜色。</p>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div key={i} className={`gallery-item ${item.cls} reveal-up`}>
              <div className="gallery-img" style={{ background: `linear-gradient(135deg, ${item.bg}, ${item.bg}88)` }}>
                {item.emoji}
              </div>
              <div className="gallery-overlay">
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
