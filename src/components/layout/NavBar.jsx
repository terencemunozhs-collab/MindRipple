/**
 * NavBar component.
 * Main navigation header with mobile menu toggle.
 */
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  // State to track if the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Helper for active link styling
  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors hover:text-indigo-600 ${
      isActive ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-600'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold text-indigo-600 tracking-tight" onClick={closeMenu}>
          MindRipple
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/create" className={navLinkClass}>
            Write a Post
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <NavLink to="/" className="block text-lg font-medium text-slate-800 hover:text-indigo-600" onClick={closeMenu} end>
            Home
          </NavLink>
          <NavLink to="/create" className="block text-lg font-medium text-slate-800 hover:text-indigo-600" onClick={closeMenu}>
            Write a Post
          </NavLink>
        </nav>
      )}
    </header>
  );
}
