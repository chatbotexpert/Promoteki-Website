export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

const STORAGE_KEY = 'promoteki_blog_posts';

export const getStoredPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePost = (post: BlogPost) => {
  const posts = getStoredPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  if (existingIndex > -1) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deletePost = (id: string) => {
  const posts = getStoredPosts();
  const filtered = posts.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  // Remove HTML tags to count only text words
  const text = content.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (except spaces and hyphens)
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with a single hyphen
    .trim();                  // Trim whitespace from both ends
};
