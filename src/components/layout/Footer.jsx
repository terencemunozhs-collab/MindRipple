/**
 * Footer component.
 * Simple minimal footer for the application.
 */
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <span className="font-serif font-bold text-indigo-600 text-lg">MindRipple</span>
          <span>— Ideas Worth Rippling</span>
        </div>
        
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/create" className="hover:text-indigo-600 transition-colors">Write a Post</Link>
        </div>
        
        <div>
          &copy; {currentYear} MindRipple. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
