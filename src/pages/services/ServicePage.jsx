import { useParams, Link, Navigate } from 'react-router-dom';
import '../../styles/Hero.css';
import '../../styles/ServicePage.css';
import '../../styles/Shared.css';
import { getServiceBySlug, SERVICES } from '../../data/services';
import { QuoteForm, TrustSidebar, DiscountBanner } from '../../components/Shared';
import { Helmet } from 'react-helmet-async';

function ServicePage() {
  const { slug } = useParams();
  const svc = getServiceBySlug(slug);

  if (!svc) return <Navigate to="/" replace />;

  return (
    <>

    <Helmet>
      <title>{svc.title} in Austin, TX | Brents Tree Service</title>
      <meta name="description" content={svc.metaDesc} />
      <link rel="canonical" href={`https://brentstreeservice.com/services/${svc.slug}`} />
    </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">

            {/*Text*/}
            <div>
              <div className="page-hero-breadcrumb">
                <Link to="/">Home</Link><span>/</span>
                <Link to="/#services">Services</Link><span>/</span>
                <span>{svc.title}</span>
              </div>
              <h1><span>{svc.icon}</span> {svc.title}</h1>
              <p>{svc.subtitle}</p>
              <div className="page-hero-cta">
                <button className="btn btn-red btn-lg"
                  onClick={() => document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  🗂 Request Free Quote
                </button>
                <a href="tel:5123108789" className="btn btn-outline-white">📞 (512) 310-8789</a>
              </div>
            </div>

            {/*Hero image*/}
            <div className="page-hero-img">
              <img src={svc.heroImg} alt={svc.title} />
            </div>

          </div>
        </div>
      </section>


      {/*MAIN BODY*/}
      <section className="section">
        <div className="container">
          <div className="svc-page-body">

            {/*Main content*/}
            <div className="svc-body-text">
              <h2 className="section-title">{svc.title}</h2>
              <p>{svc.intro}</p>
              <p>{svc.body}</p>

              {/*Sub-services*/}
              <div className="svc-subs">
                {svc.subs.map(sub => (
                  <div className="svc-sub" key={sub.title}>
                    <h3>{sub.title}</h3>
                    <p>{sub.desc}</p>
                  </div>
                ))}
              </div>

              {/*Photo grid*/}
              <div className="svc-photos">
                {svc.photos.map((src, i) => (
                  <img key={i} src={src} alt={`${svc.title} ${i + 1}`} loading="lazy" />
                ))}
              </div>

              {/*Price note*/}
              {svc.priceNote && (
                <div className="price-note" style={{ marginTop: 24 }}>
                  💡 {svc.priceNote}
                </div>
              )}
            </div>

            {/*Sidebar*/}
            <div className="svc-sidebar">
              <TrustSidebar heading="Ready to Get Started?" />
              <div className="sidebar-card">
                <h4>Service Areas</h4>
                <p>
                  We provide {svc.title.toLowerCase()} throughout:<br />
                  Austin · Georgetown · Round Rock · Cedar Park · Pflugerville ·
                  Kyle · Buda · Leander · and all surrounding areas.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/*DISCOUNT BANNER*/}
      <DiscountBanner />


      {/*QUOTE FORM*/}
      <section className="section" id="quote-section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-header center">
            <h2 className="section-title">Get a Free Quote</h2>
            <p className="section-sub">Fill out the form and we'll get back to you within 1 business day.</p>
          </div>
          <div className="quote-form">
            <QuoteForm compact />
          </div>
        </div>
      </section>


      {/*OTHER SERVICES*/}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Other Services</h2>
          </div>
          <div className="services-grid">
            {SERVICES.filter(s => s.slug !== slug).slice(0, 3).map(s => (
              <Link to={`/services/${s.slug}`} className="service-card" key={s.slug}>
                <span className="svc-icon">{s.icon}</span>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.subtitle}</p>
                <span className="svc-link">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default ServicePage;
