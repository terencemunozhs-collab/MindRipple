/**
 * PageWrapper component.
 * Wraps all pages with NavBar and Footer.
 */
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      <NavBar />
      <main id="main-content" className="flex-grow container mx-auto px-4 max-w-7xl py-8 animate-in fade-in duration-500">
        {children}
      </main>
      <Footer />
    </div>
  );
}
