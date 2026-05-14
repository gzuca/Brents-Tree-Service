import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { SERVICES } from '../data/services';

/* ── Static nav data ── */
const TREE_INFO_LINKS = [
  { label: 'Tree Disease Info',   href: '/tree-info/disease'  },
  { label: 'Tree Insect Info',    href: '/tree-info/insects'  },
  { label: 'Tree Trimming Info',  href: '/tree-info/trimming' },
  { label: 'Tree Types in Texas', href: '/tree-info/types'    },
];

const ABOUT_LINKS = [
  { label: 'Careers',       href: '/careers'   },
  { label: 'FAQ',           href: '/faq'       },
  {label: 'Blog',           href: '/blog'}
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  const isActive = (path) => location.pathname === path;

  /* Scroll to contact form — works from any page */
  const handleQuote = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">

          {/* ── Logo ── */}
          <Link to="/" className="logo">
            <img src="/images/logo-1920w.webp" alt="Brents Tree Service"
              onError={e => { e.target.style.display = 'none'; }} />
            <div className="logo-text">
              <strong>Brents Tree Service</strong>
              <span>Austin, TX · Since 1991</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="header-nav">

            {/* Services dropdown */}
            <div className="nav-dropdown">
              <button className="nav-dropdown-btn">
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="nav-dropdown-menu">
                {SERVICES.map(s => (
                  <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>
                ))}
              </div>
            </div>

            {/* Tree Info dropdown */}
            <div className="nav-dropdown">
              <button className="nav-dropdown-btn">
                Tree Info
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="nav-dropdown-menu">
                {TREE_INFO_LINKS.map(l => (
                  <Link key={l.href} to={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>

            <Link to="/locations" className={`nav-link${isActive('/locations') ? ' active' : ''}`}>
              Service Areas
            </Link>

            <Link to="/gallery" className={`nav-link${isActive('/gallery') ? ' active' : ''}`}>
              Gallery
            </Link>

            {/* About dropdown */}
            <div className="nav-dropdown">
              <button className="nav-dropdown-btn">
                About
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="nav-dropdown-menu">
                {ABOUT_LINKS.map(l => (
                  <Link key={l.href} to={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>

          </nav>

          {/* ── Actions ── */}
          <div className="header-actions">
            <a href="tel:5123108789" className="header-phone">📞 (512) 310-8789</a>
            <button className="btn btn-red btn-sm" onClick={handleQuote}>Request Quote</button>
            <button
              className={`menu-toggle ${menuOpen ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Nav ── */}
      <div className="mobile-phone-bar">
        <a href="tel:5123108789">📞 (512) 310-8789 — Tap to Call</a>
      </div>
      <nav className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>

        <span className="mobile-nav-section-title">Services</span>
        {SERVICES.map(s => (
          <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setMenuOpen(false)}>
            {s.title}
          </Link>
        ))}

        <span className="mobile-nav-section-title">Tree Info</span>
        {TREE_INFO_LINKS.map(l => (
          <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}

        <span className="mobile-nav-section-title">More</span>
        <Link to="/locations" onClick={() => setMenuOpen(false)}>Service Areas</Link>
        <Link to="/gallery"   onClick={() => setMenuOpen(false)}>Gallery</Link>
        {ABOUT_LINKS.map(l => (
          <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}

        <div className="mobile-nav-footer">
          <a href="tel:5123108789" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
            📞 (512) 310-8789
          </a>
          <button className="btn btn-red" style={{ flex: 1, justifyContent: 'center' }} onClick={handleQuote}>
            Request Quote
          </button>
        </div>
       

      </nav>
    </header>
  );
}

export default Header;
