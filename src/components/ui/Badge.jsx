/**
 * Reusable Badge component.
 * Small pill shape for categories or status.
 */
export default function Badge({ label, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-800',
    teal: 'bg-teal-100 text-teal-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
  };

  const classes = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${colors[color]}`;

  return (
    <span className={classes}>
      {label}
    </span>
  );
}
