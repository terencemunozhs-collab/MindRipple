/**
 * NotFoundPage component.
 * Displays a 404 error when a route is not found.
 */
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Helmet>
        <title>404 Not Found — MindRipple</title>
      </Helmet>
      
      <div className="relative">
        <h1 className="text-9xl font-serif font-bold text-indigo-600 mb-4 opacity-10">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-serif font-bold text-slate-800">Page Not Found</h2>
        </div>
      </div>
      
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        This page doesn't exist or has been removed.
      </p>
      
      <Link to="/" tabIndex="-1">
        <Button variant="primary" size="lg">
          Go back home
        </Button>
      </Link>
    </div>
  );
}
