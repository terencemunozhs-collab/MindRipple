import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, orderBy, query, setDoc } from "firebase/firestore";
import initialData from '../../db.json';

const firebaseConfig = {
  apiKey: "AIzaSyAVzXDwnbzz5hZBygfBATihkpsMmMEmw6E",
  authDomain: "mindripple-7f231.firebaseapp.com",
  projectId: "mindripple-7f231",
  storageBucket: "mindripple-7f231.firebasestorage.app",
  messagingSenderId: "95465625608",
  appId: "1:95465625608:web:f53059bc1faaa8ccb259bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsCollection = collection(db, "posts");

// Auto-seed database if empty
let initialized = false;
async function initializeDbIfNeeded() {
  if (initialized) return;
  initialized = true;
  try {
    const snapshot = await getDocs(postsCollection);
    if (snapshot.empty && initialData.posts && initialData.posts.length > 0) {
      console.log('Seeding initial data into Firestore...');
      for (const post of initialData.posts) {
        // We use setDoc to specify the document ID explicitly
        await setDoc(doc(db, "posts", post.id), post);
      }
      console.log('Database seeded successfully.');
    }
  } catch (e) {
    console.error('Failed to seed database:', e);
  }
}

export async function getAllPosts() {
  await initializeDbIfNeeded();
  try {
    const q = query(postsCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    // If indexing or permissions fail, fallback to local fetch
    throw error;
  }
}

export async function getPostById(id) {
  try {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error(`Post not found`);
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}

export async function createPost(data) {
  try {
    const newPost = {
      ...data,
      date: new Date().toISOString().split('T')[0],
    };
    const docRef = await addDoc(postsCollection, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id, data) {
  try {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, data);
    
    // Fetch the updated post to return it
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}
