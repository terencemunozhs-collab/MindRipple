/**
 * Reusable EmptyState component.
 * Displayed when lists are empty.
 */
import { Inbox } from 'lucide-react';
import Button from './Button.jsx';

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="text-center py-16 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-white">
      <Inbox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{message}</p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
