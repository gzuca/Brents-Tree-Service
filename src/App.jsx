import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop  from './utils/ScrollToTop';
import Header       from './components/Header';
import Footer       from './components/Footer';
import Home         from './pages/Home';
import ServicePage  from './pages/services/ServicePage';
import LocationPage from './pages/locations/LocationPage';
import LocationsIndex from './pages/locations/LocationsIndex';
import GalleryPage  from './pages/GalleryPage';
import { FAQPage, CareersPage, TreeInfoPage, NotFound, ThankYouPage } from './pages/OtherPages';
import BlogIndex from './pages/blog/BlogIndex';
import BlogPost  from './pages/blog/BlogPost';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/services/:slug"      element={<ServicePage />} />
            <Route path="/locations"           element={<LocationsIndex />} />
            <Route path="/locations/:citySlug" element={<LocationPage />} />
            <Route path="/gallery"             element={<GalleryPage />} />
            <Route path="/faq"                 element={<FAQPage />} />
            <Route path="/careers"             element={<CareersPage />} />
            <Route path="/tree-info/:topic"    element={<TreeInfoPage />} />
            <Route path="/tree-info"           element={<TreeInfoPage />} />
            <Route path="/thank-you"           element={<ThankYouPage />} />
            <Route path="/blog"       element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*"                    element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* Floating call button — mobile only */}
      <a href="tel:5123108789" className="float-call" aria-label="Call Brents Tree Service">
        📞 Call Now
      </a>

    </Router>
  );
}

export default App;
