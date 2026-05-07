/**
 * Custom hook for CRUD operations.
 * Handles API calls, global state updates, and toast notifications.
 */
import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { PostsContext } from '../context/PostsContext.jsx';
import { createPost, updatePost, deletePost } from '../services/api.js';

export function useCRUD() {
  // State to track the loading status of CRUD operations
  const [loading, setLoading] = useState(false);
  // Access global posts context to update state after CRUD operations
  const context = useContext(PostsContext);
  
  if (!context) {
    throw new Error('useCRUD must be used within a PostsProvider');
  }

  const { dispatch } = context;

  const create = async (data) => {
    setLoading(true);
    try {
      const newPost = await createPost(data);
      dispatch({ type: 'ADD_POST', payload: newPost });
      toast.success('Post published!');
      return newPost;
    } catch (error) {
      toast.error('Failed to publish. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    try {
      const updatedPost = await updatePost(id, data);
      dispatch({ type: 'UPDATE_POST', payload: updatedPost });
      toast.success('Post updated!');
      return updatedPost;
    } catch (error) {
      toast.error('Failed to update. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await deletePost(id);
      dispatch({ type: 'REMOVE_POST', payload: id });
      toast.success('Post deleted.');
      return true;
    } catch (error) {
      toast.error('Failed to delete. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
}
