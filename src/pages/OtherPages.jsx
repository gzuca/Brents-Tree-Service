import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import '../styles/Hero.css';
import '../styles/Pages.css';
import { FAQ_ITEMS }                    from '../data/faqData';
import { TREE_INFO, TREE_INFO_TOPICS }  from '../data/treeInfoData';
import { Helmet } from 'react-helmet-async';

/* ─────────────────────────────────────────────
   FAQ PAGE
───────────────────────────────────────────── */
function FAQPage() {
  const [openItem, setOpenItem] = useState(null);

  return (
    <>
      <Helmet>
        <title>FAQ | Brents Tree Service Austin, TX</title>
        <meta name="description" content="Frequently asked questions about tree removal, trimming, stump grinding and more. Brents Tree Service — Austin's most trusted tree service since 1991." />
        <link rel="canonical" href="https://brentstreeservice.com/faq" />
      </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span><span>FAQ</span>
            </div>
            <h1>❓ Frequently Asked Questions</h1>
            <p>Quick answers to the questions we hear most often.</p>
          </div>
        </div>
      </section>


      {/*FAQ LIST*/}
      <section className="section">
        <div className="container">

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`faq-item${openItem === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenItem(openItem === i ? null : i)}>
                  {item.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-ans"><p>{item.a}</p></div>
              </div>
            ))}
          </div>

          {/*Still have questions CTA*/}
          <div style={{
            marginTop: 56, textAlign: 'center',
            background: 'var(--gray-light)', borderRadius: 'var(--radius-xl)', padding: 40
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 10 }}>
              Still have questions?
            </h3>
            <p style={{ fontSize: 16, color: 'var(--gray-dark)', marginBottom: 24 }}>
              Call us anytime — we're happy to help.
            </p>
            <a href="tel:5123108789" className="btn btn-red btn-lg">📞 (512) 310-8789</a>
          </div>

        </div>
      </section>

    </>
  );
}

/* ─────────────────────────────────────────────
   CAREERS PAGE
───────────────────────────────────────────── */
const ROLES = [
  {
    title: 'Tree Service Worker — Groundsman',
    desc:  'Ground crew support for tree trimming, removal, and cleanup operations. Experience preferred but willing to train the right candidate.',
  },
  {
    title: 'Certified Tree Climber / Arborist',
    desc:  'Experienced climbers and certified arborists for residential and commercial projects. ISA certification a plus.',
  },
];

const BENEFITS = [
  'Competitive pay',
  'Local family-owned company',
  'Work outdoors in the Austin area',
  'Training opportunities',
  '30+ years of company stability',
];

function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers | Brents Tree Service Austin, TX</title>
        <meta name="description" content="Join the Brents Tree Service team! We are looking for experienced tree service professionals in Austin, TX. Apply today." />
        <link rel="canonical" href="https://brentstreeservice.com/careers" />
      </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span><span>Careers</span>
            </div>
            <h1>💼 Join Our Team</h1>
            <p>Build a career with Austin's most trusted tree service company.</p>
          </div>
        </div>
      </section>


      {/*CAREERS CONTENT*/}
      <section className="section">
        <div className="container">
          <div className="careers-inner">

            {/*Left — description + roles + benefits*/}
            <div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>Join Our Team</h2>
              <p style={{ fontSize: 16, color: 'var(--gray-dark)', lineHeight: 1.75, marginBottom: 14 }}>
                If you would like to join the Brents Tree Service team, we would love to hear from you.
                From time to time, we have positions available for experienced tree service professionals.
              </p>
              <p style={{ fontSize: 16, color: 'var(--gray-dark)', lineHeight: 1.75, marginBottom: 32 }}>
                We are a growing, family-owned company that values hard work, safety, and pride in
                craftsmanship. Our team works throughout the Austin metro area.
              </p>

              
              {/* 
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
                Current Openings
              </h3>
              <div className="roles-list">
                {ROLES.map(r => (
                  <div className="role-card" key={r.title}>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                ))}
              </div>*/}

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '36px 0 12px' }}>
                Benefits of Working With Us
              </h3>
              <div className="benefits-list">
                {BENEFITS.map(b => (
                  <div className="benefit-row" key={b}>
                    <span className="benefit-check">✓</span>{b}
                  </div>
                ))}
              </div>
            </div>

            {/*Right — apply box + photo*/}
            <div>
              <div className="apply-box">
                <h3>How to Apply</h3>
                <p>Send your resume (if applicable), full name, address, and contact phone number to:</p>
                <p><a href="mailto:info@brentstreeservice.com">info@brentstreeservice.com</a></p>
                <p style={{ marginTop: 16 }}>Or give us a call with any questions:</p>
                <p><a href="tel:5123108789">(512) 310-8789</a></p>
              </div>

              <div style={{ background: 'var(--gray-light)', borderRadius: 'var(--radius-lg)', padding: 24, marginTop: 16 }}>
                <img src="/images/home-why-choose-brents-tree-service-1920w.webp"
                  alt="Brents Tree Service team"
                  style={{ borderRadius: 'var(--radius)', width: '100%', height: 220, objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }} />
                <p style={{ fontSize: 14, color: 'var(--gray)', marginTop: 12, textAlign: 'center' }}>
                  Our team at Brents Tree Service — Austin's finest arborists
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

/* ─────────────────────────────────────────────
   TREE INFO PAGE
───────────────────────────────────────────── */
function TreeInfoPage() {
  const { topic } = useParams();
  const content = TREE_INFO[topic];

  if (!content) return <Navigate to="/tree-info/disease" replace />;

  return (
    <>

    <Helmet>
      <title>Tree Info | Brents Tree Service Austin, TX</title>
      <meta name="description" content="Learn about tree diseases, insects, trimming and types of trees in Texas. Brents Tree Service — Austin's most trusted arborists since 1991." />
      <link rel="canonical" href={`https://brentstreeservice.com/tree-info/${topic}`} />
    </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span>
              <span>Tree Info</span>
            </div>
            <h1>🌿 {content.title}</h1>
            <p>{content.sub}</p>
          </div>
        </div>
      </section>


      {/*CONTENT*/}
      <section className="section">
        <div className="container">

          {/*Topic navigation tabs*/}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
            {TREE_INFO_TOPICS.map(tp => (
              <Link key={tp.slug} to={`/tree-info/${tp.slug}`}
                className={`btn btn-sm${topic === tp.slug ? ' btn-red' : ' btn-outline'}`}>
                {tp.label}
              </Link>
            ))}
          </div>

          {/*Info cards grid*/}
          <div className="tree-info-grid">
            {content.sections.map((sec, i) => (
              <div className="info-card" key={i}>
                <div className="info-card-header"><h3>{sec.heading}</h3></div>
                <div className="info-card-body"><p>{sec.body}</p></div>
              </div>
            ))}
          </div>

          {/*CTA banner*/}
          <div style={{
            marginTop: 56,
            background: 'var(--red)', color: 'var(--white)',
            borderRadius: 'var(--radius-xl)', padding: 36, textAlign: 'center'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginBottom: 10 }}>
              Think Your Tree Might Have a Problem?
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.85)', margin: '0 auto 24px', maxWidth: 480 }}>
              Our certified arborists can diagnose and treat tree diseases, insect problems, and more.
              Call for a free consultation.
            </p>
            <a href="tel:5123108789" className="btn btn-outline-white btn-lg">📞 (512) 310-8789</a>
          </div>

        </div>
      </section>

    </>
  );
}

/* ─────────────────────────────────────────────
   404 PAGE
───────────────────────────────────────────── */
function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌳</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, marginBottom: 12 }}>404</h1>
        <p style={{ fontSize: 18, color: 'var(--gray)', marginBottom: 28 }}>
          Oops! This page seems to have been trimmed away.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-red">← Back Home</Link>
          <a href="tel:5123108789" className="btn btn-outline">📞 (512) 310-8789</a>
        </div>
      </div>
    </section>
  );
}

function ThankYouPage() {
  return (
    <>
      <Helmet>
        <title>Thank You | Brents Tree Service Austin, TX</title>
        <meta name="description" content="Thank you for contacting Brents Tree Service. We will get back to you within 1 business day." />
        <link rel="canonical" href="https://brentstreeservice.com/thank-you" />
      </Helmet>

      <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, marginBottom: 12 }}>
            Thank You!
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray)', marginBottom: 8, maxWidth: 480, margin: '0 auto 28px' }}>
            We received your request and will get back to you within 1 business day. For urgent needs, call us directly.
          </p>
          <a href="tel:5123108789" className="btn btn-red btn-lg" style={{ marginBottom: 12 }}>
            📞 (512) 310-8789
          </a>
          <br /><br />
          <Link to="/" className="btn btn-outline">← Back Home</Link>
        </div>
      </section>
    </>
  );
}


export { FAQPage, CareersPage, TreeInfoPage, NotFound, ThankYouPage };
