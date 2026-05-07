/**
 * PostDetail component.
 * Displays the full content of a post.
 */
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { formatDate } from '../../utils/formatDate.js';

export default function PostDetail({ post, onDeleteClick }) {
  if (!post) return null;

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Back Link */}
      <div className="p-6 pb-0">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mb-6 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Posts
        </Link>
      </div>

      {/* Header */}
      <header className="px-6 md:px-10 pt-4 pb-8 border-b border-gray-100">
        <div className="mb-4">
          <Badge label={post.category || 'Other'} color="teal" />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-gray-500 text-sm gap-2">
          <span className="font-medium text-slate-700">By {post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full max-h-[400px] overflow-hidden bg-gray-100">
          <img 
            src={post.coverImage} 
            alt={`${post.title} cover image`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Content Body */}
      <div className="px-6 md:px-10 py-10 prose prose-indigo prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
          {post.content}
        </div>
      </div>

      {/* Action Bar */}
      <footer className="px-6 md:px-10 py-6 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-4 justify-end items-center">
        <Link to={`/edit/${post.id}`} tabIndex="-1">
          <Button variant="outline" className="flex items-center">
            <Edit size={16} className="mr-2" />
            Edit Post
          </Button>
        </Link>
        <Button variant="danger" onClick={onDeleteClick} className="flex items-center">
          <Trash2 size={16} className="mr-2" />
          Delete Post
        </Button>
      </footer>
    </article>
  );
}
