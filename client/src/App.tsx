import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<DetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-surface-200/60">
      <div className="container-main flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🍽️</span>
          <span className="font-display text-xl text-surface-900 group-hover:text-brand-600 transition-colors">
            Recipe
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-surface-600">
          <Link to="/" className="hover:text-brand-600 transition-colors">
            Home
          </Link>
          <a href="#" className="hover:text-brand-600 transition-colors">
            Categories
          </a>
          <a href="#" className="hover:text-brand-600 transition-colors">
            Favorites
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-surface-200/60 bg-surface-100/50 mt-20">
      <div className="container-main py-8 text-center text-sm text-surface-500">
        <p className="font-display text-base text-surface-700 mb-1">Recipe</p>
        <p>Made with love for food lovers</p>
      </div>
    </footer>
  );
}

export default App;