/**
 * PostForm component.
 * Handles creating and editing posts with validation.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';

const CATEGORIES = ['Productivity', 'Mindset', 'Learning', 'Other'];

export default function PostForm({ initialValues, onSubmit, loading, mode = 'create' }) {
  // State to hold the form data fields
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Productivity',
    coverImage: '',
    excerpt: '',
    content: '',
    readTime: 5,
  });

  // State to track validation errors for each field
  const [errors, setErrors] = useState({});
  // State to track which fields have been touched by the user
  const [touched, setTouched] = useState({});

  // Populate form if editing an existing post
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = null;
    
    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Title is required';
        else if (value.length > 100) error = 'Title must be less than 100 characters';
        break;
      case 'author':
        if (!value.trim()) error = 'Author is required';
        else if (value.length > 60) error = 'Author must be less than 60 characters';
        break;
      case 'excerpt':
        if (!value.trim()) error = 'Excerpt is required';
        else if (value.length > 200) error = 'Excerpt must be less than 200 characters';
        break;
      case 'content':
        if (!value.trim()) error = 'Content is required';
        else if (value.length < 100) error = 'Content must be at least 100 characters';
        break;
      case 'readTime':
        if (!value || value < 1 || value > 60) error = 'Read time must be between 1 and 60 minutes';
        break;
      case 'coverImage':
        if (value && !value.startsWith('http')) error = 'Must be a valid URL starting with http:// or https://';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const isFieldValid = validateField(key, formData[key]);
      if (!isFieldValid) isValid = false;
    });
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isSubmitDisabled = loading || Object.values(errors).some(err => err !== null);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans ${
            touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter a compelling title..."
        />
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-red-500" role="alert">{touched.title && errors.title}</span>
          <span className={`text-gray-500 ${formData.title.length > 100 ? 'text-red-500' : ''}`}>
            {formData.title.length}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-700 mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans ${
              touched.author && errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your name"
          />
          <div className="flex justify-between mt-1 text-xs">
            <span className="text-red-500" role="alert">{touched.author && errors.author}</span>
            <span className={`text-gray-500 ${formData.author.length > 60 ? 'text-red-500' : ''}`}>
              {formData.author.length}/60
            </span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans bg-white"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cover Image URL */}
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700 mb-1">
          Cover Image URL
        </label>
        <input
          type="url"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans ${
            touched.coverImage && errors.coverImage ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="https://images.unsplash.com/..."
        />
        {touched.coverImage && errors.coverImage && (
          <p className="mt-1 text-xs text-red-500" role="alert">{errors.coverImage}</p>
        )}
        
        {/* Image Preview */}
        {formData.coverImage && !errors.coverImage && (
          <div className="mt-3 relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img 
              src={formData.coverImage} 
              alt="Cover preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                setErrors(prev => ({ ...prev, coverImage: 'Failed to load image from URL' }));
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows="2"
          value={formData.excerpt}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans resize-y ${
            touched.excerpt && errors.excerpt ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="A short summary of the post..."
        />
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-red-500" role="alert">{touched.excerpt && errors.excerpt}</span>
          <span className={`text-gray-500 ${formData.excerpt.length > 200 ? 'text-red-500' : ''}`}>
            {formData.excerpt.length}/200
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans resize-y ${
            touched.content && errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Write your full article here..."
        />
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-red-500" role="alert">{touched.content && errors.content}</span>
          <span className={`text-gray-500 ${formData.content.length < 100 ? 'text-red-500' : ''}`}>
            {formData.content.length} chars (min 100)
          </span>
        </div>
      </div>

      {/* Read Time */}
      <div className="w-1/3 min-w-[150px]">
        <label htmlFor="readTime" className="block text-sm font-medium text-slate-700 mb-1">
          Estimated read time (minutes) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="readTime"
          name="readTime"
          min="1"
          max="60"
          value={formData.readTime}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow font-sans ${
            touched.readTime && errors.readTime ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {touched.readTime && errors.readTime && (
          <p className="mt-1 text-xs text-red-500" role="alert">{errors.readTime}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
        <Link 
          to={mode === 'edit' && initialValues?.id ? `/posts/${initialValues.id}` : '/'}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit" variant="primary" loading={loading} disabled={isSubmitDisabled}>
          {mode === 'create' ? 'Publish Post' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
