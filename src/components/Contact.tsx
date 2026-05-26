import { useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('留言功能暂未开启，可以直接发邮件给我哟~ 📬');
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="section-container">
        <div className="section-label reveal-up">
          <span className="label-line" />
          <span>Contact</span>
        </div>
        <h2 className="section-title reveal-up">留下<em>你的足迹</em></h2>
        <p className="section-sub reveal-up">有任何想说的，或者只是想打个招呼，都非常欢迎。</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input className="form-input reveal-up" type="text" placeholder="你的名字" required />
          <input className="form-input reveal-up" type="email" placeholder="你的邮箱" required />
          <textarea className="form-input reveal-up" rows={4} placeholder="想对我说的话…" required />
          <button className="btn btn-primary form-submit magnetic reveal-up" type="submit">
            <span>发送留言</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
