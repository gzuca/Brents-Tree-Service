import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../../styles/Hero.css';
import '../../styles/BlogPage.css';
import { BLOGS_SORTED as BLOGS } from '../../data/blogData';

const CATEGORIES = ['All', 'Tree Trimming', 'Tree Removal', 'Tree Pruning', 'Stump Services', 'Tree Health', 'Tree Services', 'Seasonal Care', 'Tree Care'];
const PER_PAGE = 9;

function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = activeCategory === 'All'
    ? BLOGS
    : BLOGS.filter(b => b.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(0, page * PER_PAGE);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Tree Care Blog | Brents Tree Service Austin, TX</title>
        <meta name="description" content="Tips, guides, and expert advice on tree care, trimming, removal, and more from Brents Tree Service — Austin's most trusted arborists since 1991." />
        <link rel="canonical" href="https://brentstreeservice.com/blog" />
      </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span>
              <span>Blog</span>
            </div>
            <h1>🌳 Tree Care Blog</h1>
            <p>Expert tips, guides, and advice from Austin's most trusted arborists since 1991.</p>
          </div>
        </div>
      </section>

      {/*BLOG CONTENT*/}
      <section className="section">
        <div className="container">

          {/*Category filters*/}
          <div className="blog-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => handleCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          {/*Count*/}
          <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 24 }}>
            Showing {visible.length} of {filtered.length} articles
          </p>

          {/*Grid*/}
          <div className="blog-grid">
            {visible.map(blog => (
              <Link key={blog.slug} to={`/blog/${blog.slug}`} className="blog-card">
                <div className="blog-card-img">
                  <img src={blog.heroImg} alt={blog.title} loading="lazy" />
                  <span className="blog-card-cat">{blog.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>📅 {blog.date}</span>
                    <span>⏱ {blog.readTime}</span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <span className="blog-card-link">Read More →</span>
                </div>
              </Link>
            ))}
          </div>

          {/*Load more*/}
          {page < totalPages && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => setPage(p => p + 1)}>
                Load More Articles
              </button>
            </div>
          )}

        </div>
      </section>

    </>
  );
}

export default BlogIndex;