/**
 * HomePage component.
 * Displays the hero section, filters, search, and post grid.
 */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, PenLine } from 'lucide-react';
import { usePosts } from '../hooks/usePosts.js';
import PostList from '../components/posts/PostList.jsx';
import Button from '../components/ui/Button.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';

const CATEGORIES = ['All', 'Productivity', 'Mindset', 'Learning'];

export default function HomePage() {
  const { posts, loading, error, refetch } = usePosts();
  // State to track the currently selected category filter
  const [activeCategory, setActiveCategory] = useState('All');
  // State to track the user's search input
  const [searchTerm, setSearchTerm] = useState('');

  // Client-side filtering
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      // Category filter
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      
      // Search filter (title or author)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        post.title?.toLowerCase().includes(searchLower) || 
        post.author?.toLowerCase().includes(searchLower);
        
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchTerm]);

  const handleClearFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className="py-12">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12 relative">
      <Helmet>
        <title>MindRipple — Ideas Worth Rippling</title>
        <meta name="description" content="A space to think, write, and share what matters." />
      </Helmet>

      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
          Ideas Worth Rippling
        </h1>
        <p className="text-xl text-gray-600 mb-10 font-medium">
          A space to think, write, and share what matters.
        </p>
        <Link to="/create" tabIndex="-1">
          <Button size="lg" className="rounded-full px-8 shadow-md">
            Write a Post
          </Button>
        </Link>
      </section>

      {/* Decorative separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full max-w-4xl mx-auto"></div>

      {/* Filters & Search */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:border-indigo-200 border border-transparent hover:bg-indigo-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
            placeholder="Search posts or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Post Grid */}
      <section>
        <PostList 
          posts={filteredPosts} 
          loading={loading} 
          onClearFilters={handleClearFilters} 
        />
      </section>

      {/* Mobile Floating Action Button */}
      <Link 
        to="/create" 
        className="md:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all z-40"
        aria-label="Write a new post"
      >
        <PenLine size={24} />
      </Link>
    </div>
  );
}
