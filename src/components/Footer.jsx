import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { SERVICES } from '../data/services';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* ── Brand ── */}
          <div className="footer-brand">
            <img src="/images/logo-nobg.webp" alt="Brents Tree Service"/>
            <p>Professional tree care in Austin, TX since 1991.</p>
            <a href="tel:5123108789">📞 (512) 310-8789</a>
          </div>

          {/* ── Services ── */}
          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {SERVICES.slice(0, 6).map(s => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/locations">Service Areas</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/tree-info/disease">Tree Info</Link></li>
            </ul>
          </div>

          {/* ── Hours ── */}
          <div className="footer-col">
            <h3>Business Hours</h3>
            <p className="h-row">Mon – Sat: 8:00 AM – 6:00 PM</p>
            <p className="h-row">Sunday: Closed</p>
            <span className="footer-emerg">⚡ 24/7 answering calls!</span>

            <h3 style={{ marginTop: 24 }}>Service Areas</h3>
            <p className="h-row" style={{ lineHeight: 1.9 }}>
              Austin, TX · Georgetown, TX<br />
              Round Rock, TX · Cedar Park, TX<br />
              <span style={{ opacity: .5, fontSize: 12 }}>+ all Central Texas</span>
            </p>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Brents Tree Service. All rights reserved.</span>
          <span>Built and designed by <a href='https://www.gzubieta.com/' target='/blank'>Guillermo Zubieta</a></span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
