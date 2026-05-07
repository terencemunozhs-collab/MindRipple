/**
 * Reusable Button component.
 * Supports variants, sizes, loading states, and disabled states.
 */
import Spinner from './Spinner.jsx';

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.03] shadow-sm',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    danger: 'border-2 border-red-500 text-red-500 hover:bg-red-50',
    ghost: 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" color="white" className="mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
