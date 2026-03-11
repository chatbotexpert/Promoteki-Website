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
