import { useParams, Link, Navigate } from 'react-router-dom';
import '../../styles/Hero.css';
import '../../styles/LocationPage.css';
import '../../styles/Shared.css';
import { getCityBySlug, CITIES } from '../../data/cities';
import { SERVICES } from '../../data/services';
import { QuoteForm, TrustSidebar, DiscountBanner } from '../../components/Shared';
import { NotFound } from '../OtherPages';
import { Helmet } from 'react-helmet-async';

function LocationPage() {
  const { citySlug } = useParams();
  const city = getCityBySlug(citySlug);

  if (!city) return <NotFound />;

  return (
    <>

    <Helmet>
      <title>Tree Service in {city.name}, TX | Brents Tree Service</title>
      <meta name="description" content={`Professional tree service in ${city.name}, TX. Brents Tree Service offers tree removal, trimming, stump grinding and more in ${city.name} and surrounding areas. Licensed & insured. Free quotes. (512) 310-8789.`} />
      <link rel="canonical" href={`https://brentstreeservice.com/locations/${city.slug}`} />
    </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">

            {/*Text*/}
            <div>
              <div className="page-hero-breadcrumb">
                <Link to="/">Home</Link><span>/</span>
                <Link to="/locations">Service Areas</Link><span>/</span>
                <span>{city.name}</span>
              </div>
              <h1>🌳 Tree Services in <span>{city.name}, TX</span></h1>
              <p>
                Professional, licensed tree care serving {city.name} and all of {city.county}.
                Local arborists, free quotes, 24/7 emergency service.
              </p>
              <div className="page-hero-cta">
                <button className="btn btn-red btn-lg"
                  onClick={() => document.getElementById('city-quote')?.scrollIntoView({ behavior: 'smooth' })}>
                  🗂 Free Quote in {city.name}
                </button>
                <a href="tel:5123108789" className="btn btn-outline-white">📞 (512) 310-8789</a>
              </div>
            </div>

            {/*Hero image*/}
            <div className="page-hero-img">
              <img src="/images/lot-clearing-hero-brents-tree-service-cust-1920w.webp"
                alt={`Tree service in ${city.name} TX`} />
            </div>

          </div>
        </div>
      </section>


      {/*CITY INFO CARDS*/}
      <section className="section-sm">
        <div className="container">

          <div className="location-info-grid">
            <div className="loc-info-card">
              <div className="li-icon">📍</div>
              <strong>{city.name}, TX</strong>
              <span>{city.county}</span>
            </div>
            <div className="loc-info-card">
              <div className="li-icon">🚗</div>
              <strong>{city.distance}</strong>
              <span>from downtown Austin</span>
            </div>
            <div className="loc-info-card">
              <div className="li-icon">👥</div>
              <strong>{city.population}</strong>
              <span>residents</span>
            </div>
          </div>


          {/*BODY — text + sidebar*/}
          <div className="loc-body">

            {/*Main text*/}
            <div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                Serving {city.name} Since 1991
              </h2>
              <p className="loc-body-text">{city.description}</p>
              <p className="loc-body-text">{city.treeNote}</p>
              <p className="loc-body-text">{city.localNote}</p>

              {/*Services grid*/}
              <h3 className="section-title" style={{ fontSize: 22, margin: '32px 0 16px' }}>
                Our Services in {city.name}
              </h3>
              <div className="loc-services-grid">
                {SERVICES.map(s => (
                  <Link to={`/services/${s.slug}`} className="loc-service-item" key={s.slug}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="loc-service-icon">{s.icon}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/*Sticky sidebar*/}
            <div className="loc-sticky">
              <TrustSidebar heading={`Free Quote in ${city.name}`} />
              <div className="sidebar-card">
                <h4>Top Services in {city.name}</h4>
                <div className="sidebar-trust">
                  {city.topServices.map(s => (
                    <div className="trust-row" key={s}>
                      <span className="trust-dot" />{s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/*DISCOUNT BANNER*/}
      <DiscountBanner />


      {/*QUOTE FORM*/}
      <section className="section" id="city-quote" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-header center">
            <h2 className="section-title">Free Quote for {city.name} Residents</h2>
            <p className="section-sub">
              We serve {city.name} and all surrounding communities.
              Fill out the form and we'll respond within 1 business day.
            </p>
          </div>
          <div className="quote-form">
            <QuoteForm compact />
          </div>
        </div>
      </section>


      {/*OTHER CITIES*/}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Other Areas We Serve</h2>
          </div>
          <div className="cities-grid">
            {CITIES.filter(c => c.slug !== citySlug).slice(0, 8).map(c => (
              <Link to={`/locations/${c.slug}`} className="city-card" key={c.slug}>
                <h3>{c.name}</h3>
                <div className="city-county">{c.county}</div>
                <div className="city-tags">
                  {c.topServices.slice(0, 2).map(s => (
                    <span className="city-tag" key={s}>{s}</span>
                  ))}
                </div>
                <span className="city-link">View Services →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default LocationPage;