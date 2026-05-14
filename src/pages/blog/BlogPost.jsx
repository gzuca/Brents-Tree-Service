import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../../styles/Hero.css';
import '../../styles/BlogPage.css';
import { getBlogBySlug, BLOGS } from '../../data/blogData';

function BlogPost() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) return <Navigate to="/blog" replace />;

  const related = BLOGS
    .filter(b => b.slug !== slug && b.category === blog.category)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{blog.title} | Brents Tree Service Austin, TX</title>
        <meta name="description" content={blog.excerpt} />
        <link rel="canonical" href={`https://brentstreeservice.com/blog/${blog.slug}`} />
      </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span>
              <Link to="/blog">Blog</Link><span>/</span>
              <span>{blog.category}</span>
            </div>
            <h1>{blog.title}</h1>
            <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>📅 {blog.date}</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>⏱ {blog.readTime}</span>
              <span style={{ background: 'var(--red)', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{blog.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/*CONTENT*/}
      <section className="section">
        <div className="container">
          <div className="blog-post-layout">

            {/*Main content*/}
            <div className="blog-post-content">
              <img
                src={blog.heroImg}
                alt={blog.title}
                className="blog-post-hero-img"
                loading="lazy"
              />
              <div className="blog-post-body">
                {blog.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={i}>{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={i}>{paragraph.replace('# ', '')}</h2>;
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h3 key={i}>{paragraph.replace(/\*\*/g, '')}</h3>;
                  }
                  if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•')) {
                    const items = paragraph.split('\n').filter(l => l.trim());
                    return (
                      <ul key={i}>
                        {items.map((item, j) => (
                          <li key={j}>{item.replace(/^[-•]\s*/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return paragraph.trim() ? <p key={i}>{paragraph}</p> : null;
                })}
              </div>

              {/*CTA*/}
              <div className="blog-post-cta">
                <h3>Ready to Schedule Your Tree Service?</h3>
                <p>Our certified arborists serve Austin, Round Rock, Georgetown, Cedar Park and all of Central Texas. Free estimates on every job.</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/#contact" className="btn btn-red">Get a Free Quote</Link>
                  <a href="tel:5123108789" className="btn btn-outline">📞 (512) 310-8789</a>
                </div>
              </div>
            </div>

            {/*Sidebar*/}
            <div className="blog-post-sidebar">
              <div className="sidebar-card red-card">
                <h4>Get a Free Quote</h4>
                <p style={{ marginBottom: 16, fontSize: 13 }}>Call or text us anytime:</p>
                <a href="tel:5123108789" className="sidebar-phone">📞 (512) 310-8789</a>
              </div>

              {related.length > 0 && (
                <div className="sidebar-card">
                  <h4>Related Articles</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                    {related.map(r => (
                      <Link key={r.slug} to={`/blog/${r.slug}`} style={{ textDecoration: 'none' }}>
                        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                          <div style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700, marginBottom: 4 }}>{r.category}</div>
                          <div style={{ fontSize: 13, color: 'var(--black)', fontWeight: 600, lineHeight: 1.4 }}>{r.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>{r.readTime}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

export default BlogPost;