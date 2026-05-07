/**
 * CreatePostPage component.
 * Page for creating a new post.
 */
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCRUD } from '../hooks/useCRUD.js';
import PostForm from '../components/posts/PostForm.jsx';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { create, loading } = useCRUD();

  const handleSubmit = async (formData) => {
    try {
      const newPost = await create(formData);
      navigate(`/posts/${newPost.id}`);
    } catch (error) {
      // Error handled by useCRUD toast
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <Helmet>
        <title>Write a Post — MindRipple</title>
      </Helmet>
      
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-2">Write a New Post</h1>
        <p className="text-gray-600">Share your ideas with the world.</p>
      </header>

      <PostForm 
        onSubmit={handleSubmit} 
        loading={loading} 
        mode="create" 
      />
    </div>
  );
}
