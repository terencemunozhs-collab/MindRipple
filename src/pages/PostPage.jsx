/**
 * PostPage component.
 * Fetches and displays a single post, handles delete confirmation.
 */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePost } from '../hooks/usePost.js';
import { useCRUD } from '../hooks/useCRUD.js';
import PostDetail from '../components/posts/PostDetail.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import ConfirmModal from '../components/ui/ConfirmModal.jsx';

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading: fetchLoading, error } = usePost(id);
  const { remove, loading: deleteLoading } = useCRUD();
  
  // State to control the visibility of the delete confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      await remove(id);
      setIsModalOpen(false);
      navigate('/');
    } catch (err) {
      // Error is handled by useCRUD toast
      setIsModalOpen(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-12">
        <ErrorMessage 
          message={error || "Post not found. It may have been deleted."} 
          onRetry={() => navigate('/')} 
        />
      </div>
    );
  }

  return (
    <div className="py-8">
      <Helmet>
        <title>{post.title} — MindRipple</title>
        <meta name="description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
      </Helmet>

      <PostDetail 
        post={post} 
        onDeleteClick={() => setIsModalOpen(true)} 
      />

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen(false)}
        loading={deleteLoading}
      />
    </div>
  );
}
