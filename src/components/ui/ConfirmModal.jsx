/**
 * Reusable ConfirmModal component.
 * Accessible modal for destructive actions.
 */
import { useEffect, useRef } from 'react';
import Button from './Button.jsx';

export default function ConfirmModal({ isOpen, title, message, confirmLabel, onConfirm, onCancel, loading = false }) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  // Trap focus when open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      modalRef.current.addEventListener('keydown', handleTabKey);
      return () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener('keydown', handleTabKey);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onCancel}>
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        ref={modalRef}
      >
        <h2 id="modal-title" className="text-xl font-serif font-semibold text-slate-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
