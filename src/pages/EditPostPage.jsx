/**
 * EditPostPage component.
 * Page for editing an existing post.
 */
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePost } from '../hooks/usePost.js';
import { useCRUD } from '../hooks/useCRUD.js';
import PostForm from '../components/posts/PostForm.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading: fetchLoading, error } = usePost(id);
  const { update, loading: updateLoading } = useCRUD();

  const handleSubmit = async (formData) => {
    try {
      await update(id, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      // Error handled by useCRUD toast
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
    <div className="py-8 max-w-4xl mx-auto">
      <Helmet>
        <title>Edit Post — MindRipple</title>
      </Helmet>
      
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-2">Edit Post</h1>
        <p className="text-gray-600">Update your ideas.</p>
      </header>

      <PostForm 
        initialValues={post}
        onSubmit={handleSubmit} 
        loading={updateLoading} 
        mode="edit" 
      />
    </div>
  );
}
