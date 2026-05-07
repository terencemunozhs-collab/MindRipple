/**
 * Custom hook to fetch and manage all posts.
 * Consumes PostsContext to update global state.
 */
import { useEffect, useContext, useCallback, useRef } from 'react';
import { PostsContext } from '../context/PostsContext.jsx';
import { getAllPosts } from '../services/api.js';

export function usePosts() {
  const context = useContext(PostsContext);
  
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }

  const { posts, loading, error, dispatch } = context;

  // Track if we have already attempted to fetch
  const hasFetchedRef = useRef(false);

  const fetchPosts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await getAllPosts();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      dispatch({ type: 'FETCH_SUCCESS', payload: sortedData });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Failed to fetch posts' });
    }
  }, [dispatch]);

  useEffect(() => {
    // Now it checks if we haven't fetched yet before running!
    if (posts.length === 0 && !loading && !error && !hasFetchedRef.current) {
      hasFetchedRef.current = true; // Mark as fetched immediately
      fetchPosts();
    }
  }, [posts.length, loading, error, fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}