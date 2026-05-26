import { useParams, useNavigate, Link } from 'react-router-dom';
import { POSTS_DATA, CAT_NAMES, CAT_EMOJI } from '../assets/posts-data';

export default function CategoryPage() {
  const { cat } = useParams<{ cat: string }>();
  const navigate = useNavigate();

  const catName = CAT_NAMES[cat || ''] || '未知';
  const catEmoji = CAT_EMOJI[cat || ''] || '📁';
  const posts = POSTS_DATA.filter(p => p.category === cat);

  return (
    <main className="category-page">
      <div className="breadcrumb-wrap">
        <div className="breadcrumb">
          <Link to="/">首页</Link>
          <span className="bc-sep">›</span>
          <span>{catName}</span>
        </div>
      </div>

      <header className="article-hero" style={{ paddingBottom: '2.5rem' }}>
        <div className="article-hero-inner">
          <div className="article-cover-icon">{catEmoji}</div>
          <h1 className="article-title">{catName}</h1>
          <p className="article-excerpt">共 {posts.length} 篇文章</p>
        </div>
      </header>

      <div className="category-grid">
        {posts.map(p => (
          <div key={p.id} className="category-item" onClick={() => navigate(`/post/${p.category}/${p.id}`)}>
            <div className="ci-icon">{p.cover}</div>
            <div className="ci-info">
              <div className="ci-title">{p.title}</div>
              <div className="ci-date">{p.date.replace(/-/g, ' · ')} · ⏱ {p.readTime} 分钟</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
