/**
 * PostCard component.
 * Displays a summary of a post in a grid layout.
 */
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import { formatDate } from '../../utils/formatDate.js';

export default function PostCard({ post }) {
  // Determine badge color based on category
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'productivity': return 'indigo';
      case 'mindset': return 'teal';
      case 'learning': return 'gray';
      default: return 'indigo';
    }
  };

  return (
    <Link 
      to={`/posts/${post.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 transition-all duration-200"
      aria-label={`Read post: ${post.title}`}
    >
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={`${post.title} cover image`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-teal-50 flex items-center justify-center">
            <span className="text-indigo-200 font-serif text-4xl font-bold opacity-50">MR</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge label={post.category || 'Other'} color={getCategoryColor(post.category)} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        
        <div className="text-sm text-gray-500 mb-4 flex items-center flex-wrap gap-1">
          <span className="font-medium text-slate-700">{post.author}</span>
          <span>&middot;</span>
          <span>{formatDate(post.date)}</span>
          <span>&middot;</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-50">
          <span className="text-indigo-600 font-medium text-sm group-hover:underline underline-offset-4">
            Read More &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
