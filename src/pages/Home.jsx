import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import '../styles/Shared.css';
import useCityRotator from '../utils/useCityRotator';
import { SERVICES, GALLERY_PHOTOS } from '../data/services';
import { FAQ_ITEMS }   from '../data/faqData';
import { WHY_POINTS }  from '../data/whyUsData';
import { GoogleReviews, DiscountBanner, QuoteForm } from '../components/Shared';
import { Helmet } from 'react-helmet-async';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { BLOGS_SORTED as BLOGS } from '../data/blogData';

function Home() {

  /* ── FAQ open state ── */
  const [openFaq, setOpenFaq] = useState(null);

  /* ── Rotating city in hero title ── */
  const { city, isAnimating } = useCityRotator(3000);



  return (
    <>

      <Helmet>
        <title>Brents Tree Service | Professional Tree Care in Austin, TX</title>
        <meta name="description" content="Brents Tree Service — Austin's most trusted tree service since 1991. Fully Insured. Tree removal, trimming, stump grinding & more. Free quotes. (512) 310-8789." />
        <link rel="canonical" href="https://brentstreeservice.com" />
      </Helmet>

      {/*HERO SECTION*/}
      <section className="hero">
        <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.20) 10%, rgba(0,0,0,0.20) 30%, rgba(0,0,0,0.10) 80%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-inner">

            {/*Left side - text*/}
            <div>
              <div className="hero-tag">🌳 Austin's Most Trusted Tree Service Since 1991</div>

              <h1>
                Professional Tree Care in{' '}
                <span className={`hero-city ${isAnimating ? 'fading' : 'visible'}`}>
                  {city}
                </span>
              </h1>

              <p className="hero-sub">
                Tree service experts, fully insured. Serving Austin, Round Rock, and Georgetown with 24/7 Answering Service.
              </p>

              <div className="hero-badges">
                {['35+ Years Experience', 'Insured', 'Free Quotes', '24/7 Call Answering', '15% off Discount', 'Flexible Payment Plans Available', 'A+ Score at BBB'].map(badge => (
                  <div className="hero-badge" key={badge}>
                    <span className="dot" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/*Right side - quote form*/}
            <div className="hero-visual">
              <div className='hero-form' style={{ 
                  background: 'rgba(255,255,255,0.92)',
                  boxShadow: '8px 10px rgba(0,0,0,0.35)', 
                  border: 'none',
                  borderRadius: 'var(--radius-xl)',
                  padding: '32px'
                }}>
                  <QuoteForm showTitle={false} compact/>
                  <p style={{ textAlign: 'center', color: 'var(--gray-dark)', fontSize: 13, marginTop: 16 }}>
                    or call us at <br/> <a href="tel:5123108789" style={{ color: 'var(--red)', fontWeight: 700, fontSize: '17px' }}>(512) 310-8789</a>
                  </p>
              </div>

              <div className="hero-stats">
                {[['35+', 'Years in Austin'], ['300+', 'Google Reviews'], ['24/7', 'Call Answering']].map(([num, label]) => (
                  <div className="hero-stat" key={num}>
                    <strong>{num}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/*GOOGLE REVIEWS STRIP*/}
      <GoogleReviews />


      {/*SERVICES SECTION*/}
      <section className="section" id="services">
        <div className="container">

          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-sub">
              Complete tree care solutions for homes and businesses across Central Texas
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map(s => (
              <Link to={`/services/${s.slug}`} className="service-card" key={s.slug}>
                <span className="svc-icon">{s.icon}</span>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.subtitle}</p>
                <div className="svc-tags">
                  {s.subs.slice(0, 3).map(sub => (
                    <span className="svc-tag" key={sub.title}>{sub.title}</span>
                  ))}
                </div>
                <span className="svc-link">Learn More →</span>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/*WHY CHOOSE US*/}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">

          <div className="section-header">
            <h2 className="section-title">Why Choose Brents?</h2>
            <p className="section-sub">Austin has trusted us with their trees for over 30 years</p>
          </div>

          <div className="why-grid">
            {WHY_POINTS.map(p => (
              <div className="why-card" key={p.title}>
                <span className="why-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/*DISCOUNT BANNER*/}
      <DiscountBanner />

      {/*TESTIMONIALS*/}
      <TestimonialsCarousel />

      {/*GALLERY PREVIEW*/}
      <section className="section">
        <div className="container">

          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="section-title">Our Work</h2>
              <p className="section-sub">Real projects by our Austin team</p>
            </div>
            <Link to="/gallery" className="btn btn-outline">View Full Gallery →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {GALLERY_PHOTOS.slice(0, 8).map((photo, i) => (
              <div key={i} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: 180 }}>
                <img src={photo.src} alt={photo.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s' }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={e  => e.target.style.transform  = 'scale(1)'} />
              </div>
            ))}
          </div>

        </div>
      </section>


      {/*ABOUT SECTION*/}
      <section className="section" id="about" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div className="about-inner">

            {/*Photos*/}
            <div className="about-imgs">
              <img src="/images/home-content-03-brents-tree-service-1920w.webp" alt="Brents truck" />
              <img src="/images/commercial-tree-service-hero-brents-tree-service-02-1920w.webp" alt="Arborist at work" />
              <img src="/images/home-content-04-brents-tree-service-1920w.webp" alt="Team trimming" />
            </div>

            {/*Text*/}
            <div className="about-text">
              <h2 className="section-title">About Brents Tree Service</h2>
              <p>
                Since 1991, Brents Tree Service has been Austin's trusted name in professional
                arborist care. As a local, family-owned business, we bring over 30 years of experience
                to every project — from routine pruning to emergency storm response.
              </p>
              <p>
                Our certified arborists understand Central Texas trees, weather, and soil like no one
                else. We serve homeowners and businesses across Austin, Georgetown, Round Rock, and
                surrounding communities with honest pricing and eco-friendly methods.
              </p>
              <div className="about-badges">
                <div className="about-badge">🏅 Serving Since 1991</div>
                {/* <div className="about-badge">🛡️ License: Jeff Heater - TX 3508-A</div>*/}
                <div className="about-badge">📍 Austin, TX</div>
                <div className="about-badge">❤️ Family Owned</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/*BLOG PREVIEW*/}
<section className="section" style={{ background: 'var(--gray-light)' }}>
  <div className="container">

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--red)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>TIPS & INFO</p>
        <h2 className="section-title">Tree Care Blog</h2>
        <p className="section-sub">Expert advice from Austin's most trusted arborists</p>
      </div>
      <Link to="/blog" className="btn btn-outline">View All Articles →</Link>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
      {BLOGS.slice(0, 3).map(blog => (
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

  </div>
</section>


      {/*CONTACT / QUOTE FORM*/}
      <section className="section" id="contact" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div className="contact-inner">

            {/*Left — info*/}
            <div>
              <h2 className="section-title">Request a Free Quote</h2>
              <p style={{ fontSize: 16, color: 'var(--gray-dark)', lineHeight: 1.7, marginBottom: 28 }}>
                Fill out the form and we'll respond within 1 business day.
                For emergencies, call us directly.
              </p>

              {[
                { icon: '📞', title: 'Call or Text',   content: <a href="tel:5123108789" className="phone">(512) 310-8789</a> },
                { icon: '🕐', title: 'Hours',          content: <span>Mon–Sat 8am–6pm<br />Sun: Closed</span> },
                { icon: '⚡', title: '24/7 Emergency', content: <span>Emergency & after-hours by appointment</span> },
                { icon: '📍', title: 'Service Area',   content: <span>Austin · Georgetown · Round Rock · Cedar Park · and more</span> },
              ].map(d => (
                <div className="contact-detail" key={d.title}>
                  <div className="cd-icon">{d.icon}</div>
                  <div className="cd-text">
                    <strong>{d.title}</strong>
                    {d.content}
                  </div>
                </div>
              ))}
            </div>

            {/*Right — form*/}
            <div className="quote-form">
              <QuoteForm />
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

export default Home;
