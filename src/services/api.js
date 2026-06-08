/**
 * API service layer using LocalStorage.
 * Replaces json-server for static deployment on Vercel.
 */
import initialData from '../../db.json';

const STORAGE_KEY = 'mindripple_posts';

// Initialize local storage if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.posts || []));
}

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getPostsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function savePostsToStorage(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export async function getAllPosts() {
  await delay(300);
  try {
    const posts = getPostsFromStorage();
    // Sort by date descending to mimic ?_sort=-date
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostById(id) {
  await delay(300);
  try {
    const posts = getPostsFromStorage();
    const post = posts.find(p => p.id === String(id));
    if (!post) throw new Error(`Post not found`);
    return post;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}

export async function createPost(data) {
  await delay(300);
  try {
    const posts = getPostsFromStorage();
    const newPost = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    posts.push(newPost);
    savePostsToStorage(posts);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id, data) {
  await delay(300);
  try {
    const posts = getPostsFromStorage();
    const index = posts.findIndex(p => p.id === String(id));
    if (index === -1) throw new Error(`Post not found`);
    
    posts[index] = { ...posts[index], ...data };
    savePostsToStorage(posts);
    return posts[index];
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
}

export async function deletePost(id) {
  await delay(300);
  try {
    const posts = getPostsFromStorage();
    const filteredPosts = posts.filter(p => p.id !== String(id));
    savePostsToStorage(filteredPosts);
    return true;
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}
