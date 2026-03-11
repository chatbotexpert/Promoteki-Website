import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, LogOut, Save, Eye, Code, Image as ImageIcon, Bold, List, Heading2 } from 'lucide-react';
import { getStoredPosts, savePost, deletePost, BlogPost } from '../utils/blogStorage';

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
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
    setIsPreview(false);
    setCurrentPost({ title: '', excerpt: '', content: '', tags: [], date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this post?')) {
      deletePost(id);
      setPosts(getStoredPosts());
    }
  };

  const insertTag = (tag: string, closeTag?: string) => {
    const textarea = document.getElementById('post-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const selected = text.substring(start, end);

    let newText = '';
    if (tag === 'img') {
      const url = window.prompt('Enter Image URL:');
      if (url) {
        newText = `${before}<img src="${url}" alt="Blog Image" class="w-full h-auto my-8 border border-black/5 shadow-xl" />${after}`;
      } else {
        return;
      }
    } else {
      newText = `${before}<${tag}>${selected}</${closeTag || tag}>${after}`;
    }

    setCurrentPost({ ...currentPost, content: newText });
    
    // Focus back and set selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + tag.length + 2;
      textarea.setSelectionRange(newCursorPos, newCursorPos + selected.length);
    }, 10);
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
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#D4FF3F] text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
            >
              <Plus size={16} /> New Post
            </button>
          )}
          <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsPreview(false)}
                  className={`flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${!isPreview ? 'bg-black text-white' : 'bg-transparent text-black/40 hover:text-black border border-black/10'}`}
                >
                  <Code size={14} /> Editor
                </button>
                <button 
                  onClick={() => setIsPreview(true)}
                  className={`flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${isPreview ? 'bg-black text-white' : 'bg-transparent text-black/40 hover:text-black border border-black/10'}`}
                >
                  <Eye size={14} /> Live Preview
                </button>
              </div>
              <div className="flex gap-8 items-center">
                <button onClick={() => setIsEditing(false)} className="text-black/40 hover:text-black font-bold text-xs uppercase tracking-widest">Discard</button>
                <button onClick={handleSave} className="bg-[#D4FF3F] text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Publish</button>
              </div>
            </div>

            <div className="bg-white border border-black/10 p-12 min-h-[70vh]">
              <AnimatePresence mode="wait">
                {isPreview ? (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="prose prose-lg max-w-none"
                  >
                    <div className="mb-12">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 mb-4">{currentPost.date}</p>
                      <h1 className="text-5xl md:text-6xl font-bold display-font tracking-tighter leading-tight mb-8">
                        {currentPost.title || 'Untitled Post'}
                      </h1>
                      <p className="text-xl text-gray-500 font-medium italic border-l-4 border-[#D4FF3F] pl-6 py-2">
                        {currentPost.excerpt || 'Excerpt text will appear here...'}
                      </p>
                    </div>
                    <div 
                      className="blog-content-rich"
                      dangerouslySetInnerHTML={{ __html: currentPost.content || '<p class="text-black/20 italic">No content written yet...</p>' }} 
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="editor"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-12"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Post Title</label>
                          <input 
                            type="text" 
                            value={currentPost.title}
                            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                            className="w-full text-4xl font-bold tracking-tighter display-font border-b border-black/5 focus:border-black transition-colors bg-transparent pb-4 outline-none"
                            placeholder="The Future of RPA..."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Brief Excerpt</label>
                          <textarea 
                            value={currentPost.excerpt}
                            onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                            className="w-full text-sm text-gray-600 leading-relaxed border border-black/5 p-4 focus:border-black outline-none bg-[#F4F4F0]/50 h-32"
                            placeholder="A concise summary for the feed..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Tags</label>
                            <input 
                              type="text" 
                              value={currentPost.tags?.join(', ')}
                              onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                              className="w-full bg-[#F4F4F0] border-none px-4 py-3 font-mono text-xs uppercase"
                              placeholder="Tech, RPA..."
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Date</label>
                            <input 
                              type="text" 
                              value={currentPost.date}
                              onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                              className="w-full bg-[#F4F4F0] border-none px-4 py-3 font-mono text-xs uppercase"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Body Content (HTML Allowed)</label>
                        {/* Editor Toolbar */}
                        <div className="flex flex-wrap gap-2 border-b border-black/5 pb-4">
                          <button onClick={() => insertTag('h2')} className="p-2 hover:bg-[#F4F4F0] transition-colors rounded" title="Heading 2"><Heading2 size={16} /></button>
                          <button onClick={() => insertTag('b')} className="p-2 hover:bg-[#F4F4F0] transition-colors rounded" title="Bold"><Bold size={16} /></button>
                          <button onClick={() => insertTag('ul')} className="p-2 hover:bg-[#F4F4F0] transition-colors rounded" title="List"><List size={16} /></button>
                          <button onClick={() => insertTag('img')} className="p-2 hover:bg-[#F4F4F0] transition-colors rounded" title="Insert Image"><ImageIcon size={16} /></button>
                        </div>
                        <textarea 
                          id="post-content"
                          value={currentPost.content}
                          onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                          className="w-full font-mono text-sm leading-relaxed border-none focus:ring-0 min-h-[400px] bg-[#F4F4F0]/30 p-6"
                          placeholder="Paste your HTML code here or use the tools above..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div>
            <div className="mb-12 flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-bold uppercase tracking-tighter display-font mb-4">Latest Insights</h2>
                <p className="text-black/40 font-medium">Manage your active publications.</p>
              </div>
              <div className="text-right">
                <span className="text-[40px] font-black leading-none text-black/20 block">{posts.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Total Posts</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {posts.length === 0 ? (
                <div className="bg-white p-24 text-center border border-dashed border-black/10">
                  <p className="text-black/30 font-bold uppercase tracking-widest text-xs">No user posts found. Start by creating one.</p>
                </div>
              ) : (
                posts.map(post => (
                  <motion.div 
                    layout
                    key={post.id}
                    className="bg-white p-8 group border border-black/5 hover:border-black transition-all flex justify-between items-center"
                  >
                    <div className="flex gap-8 items-center">
                      <div className="hidden md:block w-12 h-12 bg-black flex-shrink-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{post.date.split(' ')[0][0]}</span>
                      </div>
                      <div>
                        <div className="flex gap-2 mb-2">
                          {post.tags.map(t => (
                            <span key={t} className="text-[8px] font-bold uppercase tracking-widest text-black/30 border border-black/5 px-2">{t}</span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold display-font uppercase tracking-tight group-hover:pl-2 transition-all">{post.title}</h3>
                        <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-1">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => {
                          setCurrentPost(post);
                          setIsEditing(true);
                        }}
                        className="text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-black/10 hover:text-red-500 transition-colors p-4"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
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
