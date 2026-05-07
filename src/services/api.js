/**
 * API service layer.
 * Handles all fetch requests to the json-server backend.
 */
const BASE_URL = '/api'; // Proxied to http://localhost:3001 in vite.config.js

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllPosts() {
  await delay(300);
  try {
    const response = await fetch(`${BASE_URL}/posts?_sort=-date`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostById(id) {
  await delay(300);
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}

export async function createPost(data) {
  await delay(300);
  try {
    const newPost = {
      ...data,
      // Replaced crypto.randomUUID() with a timestamp so the browser won't block it!
      id: Date.now().toString(), 
      date: new Date().toISOString().split('T')[0],
    };
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id, data) {
  await delay(300);
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
}

export async function deletePost(id) {
  await delay(300);
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return true;
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}
