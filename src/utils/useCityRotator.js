import { useState, useEffect } from 'react';

// ─── Cities to rotate through ────────────────────────────────
const CITIES = [
  'Austin, TX',
  'Round Rock, TX',
  'Cedar Park, TX',
  'Georgetown, TX',
  'Pflugerville, TX',
  'Leander, TX',
  'Hutto, TX',
  'Lakeway, TX',
  'Bee Cave, TX',
  'Liberty Hill, TX',
];

// ─── Hook ─────────────────────────────────────────────────────
// Cycles through CITIES every `interval` ms.
// Returns: { city, index, isAnimating }
function useCityRotator(interval = 3000) {
  const [index,       setIndex]       = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      /* Fade out */
      setIsAnimating(true);

      /* After fade-out finishes, swap city and fade back in */
      setTimeout(() => {
        setIndex(prev => (prev + 1) % CITIES.length);
        setIsAnimating(false);
      }, 400); // matches CSS transition duration

    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return {
    city:        CITIES[index],
    index,
    isAnimating,
  };
}

export default useCityRotator;
