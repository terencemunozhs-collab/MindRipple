/**
 * Reusable ErrorMessage component.
 * Displays error states with an optional retry button.
 */
import { AlertTriangle } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-lg mx-auto" role="alert">
      <AlertTriangle className="mx-auto h-10 w-10 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-red-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-600 mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
