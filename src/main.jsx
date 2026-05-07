/**
 * Application entry point.
 * Sets up React, React Router, HelmetProvider, and PostsContext.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { PostsProvider } from './context/PostsContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <PostsProvider>
          <App />
        </PostsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
