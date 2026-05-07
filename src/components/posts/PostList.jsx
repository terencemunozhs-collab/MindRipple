/**
 * PostList component.
 * Renders a grid of PostCards or loading skeletons.
 */
import PostCard from './PostCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

// Skeleton loader for posts
function PostSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="aspect-video w-full bg-gray-200"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-6"></div>
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="h-4 bg-gray-200 rounded-md w-24"></div>
        </div>
      </div>
    </div>
  );
}

export default function PostList({ posts, loading, onClearFilters }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState 
        title="No posts found" 
        message="We couldn't find any posts matching your current filters."
        actionLabel={onClearFilters ? "Clear Filters" : null}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
