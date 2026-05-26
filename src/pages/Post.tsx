import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { POSTS_DATA, CAT_NAMES } from '../assets/posts-data';
import type { PostMeta } from '../assets/posts-data';

export default function PostPage() {
  const { cat, id } = useParams<{ cat: string; id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostMeta | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tocItems, setTocItems] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const found = POSTS_DATA.find(p => p.id === id && p.category === cat);
    if (!found) { setLoading(false); return; }
    setPost(found);

    fetch(`${import.meta.env.BASE_URL}posts/${found.file}`)
      .then(r => r.text())
      .then(md => {
        // Strip YAML front matter
        md = md.replace(/^---[\s\S]*?---\s*\n/, '');

        // Extract headings for TOC
        const headings: Array<{ id: string; text: string; level: number }> = [];
        const headRegex = /^(#{1,3})\s+(.+)$/gm;
        let match;
        while ((match = headRegex.exec(md)) !== null) {
          const level = match[1].length;
          const text = match[2].trim();
          const hid = 'h-' + text.replace(/[^\u4e00-\u9fa5\w]/g, '-').toLowerCase();
          md = md.replace(match[0], `<h${level} id="${hid}">${text}</h${level}>`);
          headings.push({ id: hid, text, level });
        }
        setTocItems(headings);

        const html = marked.parse(md) as string;
        setContent(html);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [cat, id]);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!loading && !post) {
    return (
      <main className="post-page">
        <div className="article-empty">
          <h2>文章未找到</h2>
          <p style={{ marginTop: '.5rem' }}>试试返回首页看看其他文章吧～</p>
          <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/')}>返回首页</button>
        </div>
      </main>
    );
  }

  // Related posts
  const related = post
    ? POSTS_DATA.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];

  return (
    <main className="post-page">
      <div className="reading-progress" style={{ width: progress + '%' }} />

      <div className="breadcrumb-wrap">
        <div className="breadcrumb">
          <Link to="/">首页</Link>
          <span className="bc-sep">›</span>
          <Link to={`/category/${cat}`}>{post ? CAT_NAMES[post.category] : ''}</Link>
          <span className="bc-sep">›</span>
          <span>{post?.title}</span>
        </div>
      </div>

      {loading ? (
        <div className="article-loading">
          <p>🌿 正在加载文章…</p>
        </div>
      ) : (
        <>
          <header className="article-hero">
            <div className="article-hero-inner">
              <div className="article-cover-icon">{post?.cover}</div>
              <div className="article-meta-top">
                <span className={`post-cat cat-tag-${post?.category}`}>{post ? CAT_NAMES[post.category] : ''}</span>
                <span className="article-date">{post?.date?.replace(/-/g, ' · ')}</span>
                <span className="read-time">⏱ {post?.readTime} 分钟</span>
              </div>
              <h1 className="article-title">{post?.title}</h1>
              <p className="article-excerpt">{post?.excerpt}</p>
              <div className="article-tags">
                {post?.tags.map(t => <span key={t} className="article-tag">{t}</span>)}
              </div>
            </div>
          </header>

          <div className="article-layout">
            {tocItems.length > 0 && (
              <aside className="toc-sidebar">
                <div className="toc-inner">
                  <p className="toc-title">📌 目录</p>
                  <nav className="toc-nav">
                    {tocItems.map(h => (
                      <a key={h.id} href={`#${h.id}`} className={`toc-link ${h.level === 2 ? 'h2' : ''}`}>
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
            <article className="article-body" dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {related.length > 0 && (
            <div className="related-posts">
              <div className="section-container">
                <h3 className="related-title">📎 相关文章</h3>
                <div className="related-grid">
                  {related.map(r => (
                    <div key={r.id} className="related-card" onClick={() => { window.scrollTo(0, 0); navigate(`/post/${r.category}/${r.id}`); }}>
                      <h4>{r.cover} {r.title}</h4>
                      <span className="r-date">{r.date.replace(/-/g, ' · ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
