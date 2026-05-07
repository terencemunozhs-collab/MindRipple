/**
 * Main App component.
 * Sets up React Router with lazy-loaded pages and global layout.
 */
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PageWrapper from './components/layout/PageWrapper.jsx';
import Spinner from './components/ui/Spinner.jsx';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const PostPage = lazy(() => import('./pages/PostPage.jsx'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage.jsx'));
const EditPostPage = lazy(() => import('./pages/EditPostPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  // Effect runs whenever the pathname changes to scroll window to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <PageWrapper>
        <Suspense fallback={<div className="flex justify-center py-20"><Spinner size="lg" /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageWrapper>
    </>
  );
}
