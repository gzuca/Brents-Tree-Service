import { useState, useEffect } from 'react';
import { REVIEWS } from '../data/reviewsData';
import '../styles/TestimonialsCarousel.css';

const VISIBLE = 3;

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
  if (isAnimating) return;
  setIsAnimating(true);
  setTimeout(() => {
    setCurrent(prev => {
      const next = prev + VISIBLE;
      return next >= REVIEWS.length ? 0 : next;
    });
    setIsAnimating(false);
  }, 400);
};

  const goPrev = () => {
  if (isAnimating) return;
  setIsAnimating(true);
  setTimeout(() => {
    setCurrent(prev => {
      const prevIdx = prev - VISIBLE;
      return prevIdx < 0 ? REVIEWS.length - VISIBLE : prevIdx;
    });
    setIsAnimating(false);
  }, 400);
};

  const visible = [
  ...REVIEWS.slice(current, current + VISIBLE),
  ...REVIEWS.slice(0, Math.max(0, current + VISIBLE - REVIEWS.length))
].slice(0, VISIBLE);

  const totalDots = Math.ceil(REVIEWS.length / VISIBLE);
  const activeDot = Math.floor(current / VISIBLE);

  return (
    <section className="section testimonials-section">
      <div className="container">

        <div className="section-header center" style={{ marginBottom: 32 }}>
          <p className="testimonials-label">WHAT AUSTIN IS SAYING</p>
          <h2 className="section-title">Customer Testimonials</h2>
        </div>

        <div className={`testimonials-grid ${isAnimating ? 'fading' : 'visible'}`}>
          {visible.map(review => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{review.text}</p>
              <div className="testimonial-footer">
                <div>
                  <div className="testimonial-name">{review.name}</div>
                  <div className="testimonial-location">{review.location}</div>
                </div>
                <div className="testimonial-stars">★★★★★</div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-controls">
          <button className="testimonials-arrow" onClick={goPrev}>‹</button>
          <div className="testimonials-dots">
            {Array.from({ length: totalDots }).map((_, i) => (
              <span
                key={i}
                className={`testimonials-dot ${i === activeDot ? 'active' : ''}`}
                onClick={() => setCurrent(i * VISIBLE)}
              />
            ))}
          </div>
          <button className="testimonials-arrow" onClick={goNext}>›</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          
            <a href="https://g.page/r/CapNgqah4WeBEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red">
            Leave Us a Review on Google
          </a>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsCarousel;