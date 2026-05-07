/**
 * PostsContext provides global state for the blog posts.
 * Uses useReducer for state management.
 */
import { createContext, useReducer } from 'react';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

function postsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    default:
      return state;
  }
}

export const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Expose state and dispatch to consumers
  const value = {
    ...state,
    dispatch,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}
