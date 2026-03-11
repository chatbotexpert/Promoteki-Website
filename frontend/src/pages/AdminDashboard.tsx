import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, LogOut, Save } from 'lucide-react';
import { getStoredPosts, savePost, deletePost, BlogPost } from '../utils/blogStorage';

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('promoteki_admin_auth');
    navigate('/');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const postToSave: BlogPost = {
      ...currentPost,
      id: currentPost.id || Date.now().toString(),
      date: currentPost.date || new Date().toLocaleDateString(),
    } as BlogPost;
    
    savePost(postToSave);
    setPosts(getStoredPosts());
    setIsEditing(false);
    setCurrentPost({ title: '', excerpt: '', content: '', tags: [], date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this post?')) {
      deletePost(id);
      setPosts(getStoredPosts());
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0]">
      {/* Admin Header */}
      <header className="bg-black text-white px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/')} className="hover:text-[#D4FF3F] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold uppercase tracking-widest display-font">Control Center</h1>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#D4FF3F] text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            <Plus size={16} /> New Post
          </button>
          <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto bg-white p-12 border border-black/10">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-tighter display-font">Editor</h2>
              <button onClick={() => setIsEditing(false)} className="text-black/40 hover:text-black font-bold text-xs uppercase tracking-widest">Discard</button>
            </div>
            <form onSubmit={handleSave} className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Title</label>
                <input 
                  type="text" 
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  className="w-full text-4xl font-bold tracking-tighter display-font border-none focus:ring-0 placeholder:text-black/10 bg-transparent"
                  placeholder="The Future of RPA..."
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Excerpt</label>
                <textarea 
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full text-lg text-gray-600 leading-relaxed border-none focus:ring-0 min-h-[100px] bg-transparent"
                  placeholder="Short summary for the blog list..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-12 border-t border-black/5 pt-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={currentPost.tags?.join(', ')}
                    onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                    className="w-full bg-[#F4F4F0] border-none px-4 py-3 focus:ring-1 focus:ring-black outline-none transition-all font-mono text-sm"
                    placeholder="Tech, Automation, AI"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Date</label>
                  <input 
                    type="text" 
                    value={currentPost.date}
                    onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                    className="w-full bg-[#F4F4F0] border-none px-4 py-3 focus:ring-1 focus:ring-black outline-none transition-all font-mono text-sm"
                    placeholder="March 1, 2026"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-black text-[#D4FF3F] py-6 uppercase font-bold tracking-[0.2em] text-sm hover:gap-6 transition-all"
              >
                <Save size={18} /> Publish Insight
              </button>
            </form>
          </motion.div>
        ) : (
          <div>
            <div className="mb-12">
              <h2 className="text-5xl font-bold uppercase tracking-tighter display-font mb-4">Latest Insights</h2>
              <p className="text-black/40 font-medium">Manage your active publications.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {posts.length === 0 ? (
                <div className="bg-white p-24 text-center border border-dashed border-black/10">
                  <p className="text-black/30 font-bold uppercase tracking-widest text-xs">No user posts found. Start by creating one.</p>
                </div>
              ) : (
                posts.map(post => (
                  <motion.div 
                    layout
                    key={post.id}
                    className="bg-white p-8 group border border-black/5 hover:border-black/10 transition-all flex justify-between items-center"
                  >
                    <div>
                      <div className="flex gap-2 mb-2">
                        {post.tags.map(t => (
                          <span key={t} className="text-[8px] font-bold uppercase tracking-widest text-black/30 border border-black/5 px-2">{t}</span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold display-font uppercase tracking-tight">{post.title}</h3>
                      <p className="text-xs text-black/40 font-medium mt-1">{post.date}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="text-black/10 group-hover:text-red-500 transition-colors p-4"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
