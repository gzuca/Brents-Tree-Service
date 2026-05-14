import { Link } from 'react-router-dom';
import '../../styles/Hero.css';
import '../../styles/LocationPage.css';
import { CITIES } from '../../data/cities';
import { Helmet } from 'react-helmet-async';

function LocationsIndex() {
  return (
    <>

    <Helmet>
      <title>Tree Service Areas in Austin, TX | Brents Tree Service</title>
      <meta name="description" content="Brents Tree Service serves Austin, Round Rock, Georgetown, Cedar Park, Pflugerville and all surrounding Central Texas communities. Licensed & insured. Free quotes. (512) 310-8789." />
      <link rel="canonical" href="https://brentstreeservice.com/locations" />
    </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span>
              <span>Service Areas</span>
            </div>
            <h1>📍 Service Areas</h1>
            <p>Proudly serving Austin and all surrounding Central Texas communities since 1991.</p>
            <div className="page-hero-cta">
              <a href="tel:5123108789" className="btn btn-red btn-lg">📞 (512) 310-8789</a>
            </div>
          </div>
        </div>
      </section>


      {/*ALL CITIES GRID*/}
      <section className="section">
        <div className="container">

          <div className="section-header">
            <h2 className="section-title">All Service Areas</h2>
            <p className="section-sub">
              Click any city to see available services, get a free quote,
              and learn about local tree care needs.
            </p>
          </div>

          <div className="cities-grid">
            {CITIES.map(city => (
              <Link to={`/locations/${city.slug}`} className="city-card" key={city.slug}>
                <h3>{city.name}</h3>
                <div className="city-county">{city.county}</div>
                <div className="city-dist">{city.distance}</div>
                <div className="city-tags">
                  {city.topServices.slice(0, 3).map(s => (
                    <span className="city-tag" key={s}>{s}</span>
                  ))}
                </div>
                <span className="city-link">View Services in {city.name} →</span>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/*DON'T SEE YOUR CITY*/}
      <section className="section" style={{ background: 'var(--gray-light)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 className="section-title">Don't See Your City?</h2>
          <p style={{ fontSize: 17, color: 'var(--gray-dark)', margin: '14px 0 28px', lineHeight: 1.7 }}>
            We serve all of Central Texas. If you don't see your city listed,
            give us a call — we likely serve your area!
          </p>
          <a href="tel:5123108789" className="btn btn-red btn-lg">📞 Call (512) 310-8789</a>
        </div>
      </section>

    </>
  );
}

export default LocationsIndex;
