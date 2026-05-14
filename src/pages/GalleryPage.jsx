import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import '../styles/Pages.css';
import { GALLERY_PHOTOS } from '../data/services';
import { Helmet } from 'react-helmet-async';

const CATEGORIES = [
  'All', 'Trimming', 'Removal', 'Stumps', 'Emergency',
  'Cleanup', 'Lot Clearing', 'Pruning', 'Equipment',
  'Commercial', 'Team', 'Tree Health', 'Climbing',
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxPhoto,  setLightboxPhoto]  = useState(null);

  const filtered = activeCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.cat === activeCategory);

  const goPrev = () => {
    const idx = filtered.findIndex(p => p === lightboxPhoto);
    setLightboxPhoto(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };

  const goNext = () => {
    const idx = filtered.findIndex(p => p === lightboxPhoto);
    setLightboxPhoto(filtered[(idx + 1) % filtered.length]);
  };

  return (
    <>

    <Helmet>
      <title>Tree Service Gallery | Brents Tree Service Austin, TX</title>
      <meta name="description" content="View our gallery of tree removal, trimming, stump grinding and more. Brents Tree Service has been serving Austin, TX since 1991. Licensed & insured arborists." />
      <link rel="canonical" href="https://brentstreeservice.com/gallery" />
    </Helmet>

      {/*PAGE HERO*/}
      <section className="page-hero">
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link><span>/</span>
              <span>Gallery</span>
            </div>
            <h1>📸 Our Work</h1>
            <p>Real projects by our Austin team — trimming, removal, stumps, and more</p>
          </div>
        </div>
      </section>


      {/*GALLERY + FILTERS*/}
      <section className="section">
        <div className="container">

          {/*Category filters*/}
          <div className="gallery-filters">
            <span className="gallery-filter-label">Filter by category:</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          {/*Photos grid*/}
          {filtered.length === 0 ? (
            <p style={{ color: 'var(--gray)', fontSize: 16 }}>No photos in this category yet.</p>
          ) : (
            <div className="gallery-grid">
              {filtered.map((photo, i) => (
                <div className="gallery-item" key={i} onClick={() => setLightboxPhoto(photo)}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-cat">{photo.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>


      {/*CTA*/}
      <section className="section-sm" style={{ background: 'var(--gray-light)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 className="section-title">Ready for Your Property to Look This Good?</h2>
          <p style={{ fontSize: 16, color: 'var(--gray-dark)', margin: '14px 0 28px' }}>
            Our team serves all of Central Texas. Get a free quote today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5123108789" className="btn btn-red btn-lg">📞 (512) 310-8789</a>
            <Link to="/#contact" className="btn btn-outline btn-lg">Get Free Quote</Link>
          </div>
        </div>
      </section>


      {/*LIGHTBOX*/}
      {lightboxPhoto && (
        <div className="lightbox" onClick={() => setLightboxPhoto(null)}>
          <img src={lightboxPhoto.src} alt={lightboxPhoto.alt}
            className="lightbox-img"
            onClick={e => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setLightboxPhoto(null)}>✕</button>
          <button className="lightbox-nav lightbox-prev"
            onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
          <button className="lightbox-nav lightbox-next"
            onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <div className="lightbox-caption">{lightboxPhoto.cat} · {lightboxPhoto.alt}</div>
        </div>
      )}

    </>
  );
}

export default GalleryPage;
