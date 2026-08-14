import { useState, useEffect } from 'react';
import '../styles/Shared.css';
import { useNavigate } from 'react-router-dom';
import { LIVE_REVIEWS } from '../data/reviewsLive';

/* ── Constants ── */
const PHONE      = '(512) 310-8789';
const MAPS_URL = 'https://www.google.com/maps/search/Brent%27s+Tree+Service+Austin+TX';

const SERVICES_LIST = [
  'Tree Trimming & Branch Services',
  'Tree Removal',
  'Stump Grinding / Removal',
  'Emergency & Storm Clean-Up',
  'Property & Cleanup Services',
  'Lot Clearing',
  'Tree Pruning',
  'Commercial Tree Services',
  'Other / Not Sure',
];

const LEAD_SOURCES = ['Google', 'Facebook', 'Instagram', 'Already Knew Us', 'Other'];

const TRUST_ITEMS = [
  '30+ Years of Experience',
  'Fully Insured',
  'Free Quotes',
  'Financing Available',
  '24/7 Emergency Services',
  'Local Family Business Since 1991',
];

/* ─────────────────────────────────────────────
   GOOGLE REVIEWS STRIP
───────────────────────────────────────────── */
function GoogleReviews() {
  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ opacity: i < Math.floor(rating) ? 1 : i < rating ? 0.5 : 0.2 }}>★</span>
    ));
 
  return (
    <div className="reviews-strip">
      <div className="container">
        <div className="reviews-strip-inner">
 
          <>
            <div className="reviews-left">
              <div className="stars-row">{renderStars(LIVE_REVIEWS.rating)}</div>
              <div>
                <div className="reviews-rating">{LIVE_REVIEWS.rating.toFixed(1)}</div>
                <div className="reviews-count">{LIVE_REVIEWS.total}+ Google Reviews</div>
              </div>
            </div>
 
            <div className="reviews-google">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Based on Google Reviews
            </div>
 
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="reviews-cta">
              See All Google Reviews →
            </a>
          </>
 
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DISCOUNT BANNER
───────────────────────────────────────────── */
function DiscountBanner() {
  return (
    <section className="discount-banner">
      <div className="container">
        <div className="discount-label">🏷 SPECIAL OFFER</div>
        <h3><em>15%</em> Off All Tree Trimming Services</h3>
        <p>Mention this offer when scheduling. Not valid with other offers. Restrictions apply.</p>
        <div className="discount-call">
          <span className="discount-call-label">Call to Schedule:</span>
          <a href="tel:5123108789" onClick={() => { if (typeof fbq !== 'undefined') fbq('track', 'Contact'); }}>(512) 310-8789</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRUST SIDEBAR CARD
───────────────────────────────────────────── */
function TrustSidebar({ heading = 'Ready to Get Started?' }) {
  return (
    <div className="sidebar-card red-card">
      <h4>{heading}</h4>
      <p style={{ marginBottom: 16 }}>Call or text us anytime:</p>
      <a href="tel:5123108789" className="sidebar-phone" onClick={() => { if (typeof fbq !== 'undefined') fbq('track', 'Contact'); }}>📞 {PHONE}</a>
      <div className="sidebar-trust">
        {TRUST_ITEMS.map(item => (
          <div className="trust-row" key={item}>
            <span className="trust-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   QUOTE FORM
───────────────────────────────────────────── */
function QuoteForm({ compact = false, showTitle=true }) {
  const [form,   setForm]   = useState({ name: '', phone: '', email: '', service: '', address: '', message: '', leadSource: '', otherSource: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  /* Format phone as the user types: (512) 555-1234. Also strips any non-digit,
     so pasted junk like a last name can't end up in this field. */
  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    const len = digits.length;
    if (len === 0) return '';
    if (len < 4) return `(${digits}`;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (e) => {
    setForm({ ...form, phone: formatPhone(e.target.value) });
  };

  /* Client-side validation. Returns an error string, or '' if the form is good. */
  const validate = () => {
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    if (!form.address.trim()) {
      return 'Please enter your property address.';
    }
    if (!form.leadSource) {
      return 'Please let us know how you found us.';
    }
    if (!compact && form.message.trim().length < 10) {
      return 'Please add a short description of what you need.';
    }
    return '';
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus('error');
      setErrMsg(validationError);
      return;
    }

    setStatus('sending');

    const sId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const tId  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const pKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
   

    /* If no EmailJS configured → simulate success */
    if (!sId || sId === 'YOUR_SERVICE_ID') {
      await new Promise(r => setTimeout(r, 1200));
      navigate('/thank-you');
      return;
    }

    try {
      const ejs = await import('@emailjs/browser');
      const displaySource = (form.leadSource === 'Other' && form.otherSource.trim())
        ? `Other – ${form.otherSource.trim()}`
        : form.leadSource;
      await ejs.send(sId, tId, { ...form, leadSource: displaySource, reply_to: form.email }, pKey);
      setForm({ name: '', phone: '', email: '', service: '', address: '', message: '', leadSource: '', otherSource: '' });
      navigate('/thank-you');
    } catch {
      setStatus('error');
      setErrMsg('Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Title (shown when not compact) */}
      {!compact && (
        <>
          <h2>Request a Free Quote</h2>
          <p className="sub">
            Fill out the form and we will contact you as soon as possible. For emergencies, call us directly.
          </p>
        </>
      )}

      {/* Error message */}
      {status === 'error' && <div className="form-err">⚠️ {errMsg}</div>}

      {/* Fields */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor='name'>Full Name *</label>
          <input id='name' type="text" placeholder="Your full name"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor='phone'>Phone Number *</label>
          <input id='phone' type="tel" placeholder="(512) 555-1234" inputMode="numeric"
            value={form.phone} onChange={handlePhoneChange} maxLength={14} required />
        </div>
        <div className="form-group">
          <label htmlFor='email'>Email Address *</label>
          <input id='email' type="email" placeholder="Your email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
        </div>
        <div className="form-group">
          <label htmlFor='service'>Service Needed *</label>
          <select id='service' value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required>
            <option value="">Select a service</option>
            {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
          <label htmlFor='address'>Address *</label>
          <input id='address' type="text" placeholder="Your property address"
            value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
        </div>

      {/* How did you hear about us */}
      <div className="form-group">
        <label>How did you find us? *</label>
        <div className="lead-source-row">
          {LEAD_SOURCES.map(src => (
            <button
              key={src}
              type="button"
              className={`lead-source-btn${form.leadSource === src ? ' selected' : ''}`}
              onClick={() => setForm({ ...form, leadSource: src, otherSource: src === 'Other' ? form.otherSource : '' })}
            >
              {src}
            </button>
          ))}
        </div>
        {form.leadSource === 'Other' && (
          <input
            type="text"
            placeholder="Tell us where! (optional)"
            value={form.otherSource}
            onChange={e => setForm({ ...form, otherSource: e.target.value })}
            style={{ marginTop: 8 }}
          />
        )}
      </div>

      {/* Message (not shown in compact mode) */}
      {!compact && (
        <div className="form-group">
          <label htmlFor='message'>Message</label>
          <textarea id='message' placeholder="Describe your situation or ask a question..."
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} required />
        </div>
      )}

      {/* Submit */}
      <button type="submit" className="btn btn-red form-submit-btn" disabled={status === 'sending'}>
        {status === 'sending'
          ? <><span className="spinner" /> Sending...</>
          : <>📨 Send Request</>}
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray)', marginTop: 8 }}>
        💳 Payment plans available — ask us how
      </p>

    </form>
  );
}

export { GoogleReviews, DiscountBanner, TrustSidebar, QuoteForm };