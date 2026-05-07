/**
 * Custom hook to fetch a single post by ID.
 * Uses local state since we don't need to store single posts globally.
 */
import { useState, useEffect } from 'react';
import { getPostById } from '../services/api.js';

export function usePost(id) {
  // State to hold the fetched post data
  const [post, setPost] = useState(null);
  // State to track the loading status of the fetch operation
  const [loading, setLoading] = useState(true);
  // State to hold any error messages from the fetch operation
  const [error, setError] = useState(null);

  // Effect to fetch the post data when the id changes
  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPostById(id);
        if (isMounted) {
          setPost(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch post');
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { post, loading, error };
}
