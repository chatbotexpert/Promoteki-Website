import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, LogOut, Save, Eye, Code, Image as ImageIcon, Bold, List, Heading2, Heading3, Quote, ListOrdered } from 'lucide-react';
import { getStoredPosts, savePost, deletePost, BlogPost, calculateReadingTime, createSlug } from '../utils/blogStorage';

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
    if (!currentPost.title) {
      alert('Title is required to generate a slug.');
      return;
    }

    const slug = createSlug(currentPost.title);
    
    const postToSave: BlogPost = {
      ...currentPost,
      id: currentPost.id || slug,
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
        newText = `${before}<img src="${url}" alt="Blog Image" class="w-full h-auto my-12 border border-black/5 shadow-2xl rounded-sm" />${after}`;
      } else {
        return;
      }
    } else if (tag === 'blockquote') {
      newText = `${before}<blockquote>${selected || 'Quote text goes here...'}</blockquote>${after}`;
    } else if (tag === 'ul') {
      newText = `${before}<ul>\n  <li>${selected || 'List item'}</li>\n</ul>${after}`;
    } else {
      newText = `${before}<${tag}>${selected || (tag === 'h2' ? 'Section Header' : 'Text')}</${closeTag || tag}>${after}`;
    }

    setCurrentPost({ ...currentPost, content: newText });
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + tag.length + 2;
      textarea.setSelectionRange(newCursorPos, newCursorPos + (selected ? selected.length : (tag === 'ul' ? 9 : 0)));
    }, 10);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      {/* Admin Header */}
      <header className="bg-black text-white px-4 md:px-10 py-5 flex justify-between items-center sticky top-0 z-50 border-b border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition-all active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="hidden sm:block h-8 w-[1px] bg-white/10 mx-2" />
          <div className="flex flex-col">
            <h1 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.3em] display-font leading-none">Studio OS</h1>
            <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1 ml-0.5">Build v1.0.84</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-6">
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="group flex items-center gap-3 bg-[#D4FF3F] text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 border border-[#D4FF3F]"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden xs:inline">New Publication</span>
              <span className="xs:hidden">New</span>
            </button>
          )}
          <button 
            onClick={handleLogout} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-red-500 hover:border-red-500/50 transition-all active:scale-90"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 lg:p-20">
        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
            {/* Editor Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-6 md:gap-8 border-b-2 border-black pb-8 md:pb-12">
              <div className="flex bg-black/[0.05] p-1 w-full sm:w-auto">
                <button 
                  onClick={() => setIsPreview(false)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${!isPreview ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
                >
                  <Code size={12} /> Source
                </button>
                <button 
                  onClick={() => setIsPreview(true)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${isPreview ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
                >
                  <Eye size={12} /> Render
                </button>
              </div>
              <div className="flex gap-8 md:gap-12 items-center w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => setIsEditing(false)} className="text-black/40 hover:text-black font-black text-[10px] uppercase tracking-[0.2em] transition-colors">Discard</button>
                <button onClick={handleSave} className="bg-black text-white px-8 md:px-12 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#D4FF3F] hover:text-black transition-all border-2 border-black active:scale-95 shadow-[4px_4px_0px_0px_rgba(212,255,63,1)] hover:shadow-none">Commit</button>
              </div>
            </div>

            <div className="bg-white border-2 border-black min-h-[85vh] flex flex-col">
              <AnimatePresence mode="wait">
                {isPreview ? (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-y-auto bg-[#FDFCF7]"
                  >
                    {/* Public Design Preview Implementation */}
                    <div className="pt-20 pb-20">
                      <header className="px-12 mb-16 max-w-5xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-8">
                          {currentPost.tags?.map((tag: string, ti: number) => (
                            <span key={ti} className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-3 py-1">{tag}</span>
                          ))}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold display-font tracking-tighter leading-[0.9] uppercase mb-8">
                          {currentPost.title || 'Draft Article'}
                        </h1>
                        <div className="flex items-center gap-8 py-6 border-y border-black/10">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Read Time</span>
                            <span className="text-xs font-bold">{calculateReadingTime(currentPost.content || '')} MIN</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Status</span>
                            <span className="text-xs font-bold text-[#D4FF3F] bg-black px-2 py-0.5">READY</span>
                          </div>
                        </div>
                      </header>
                      <div className="max-w-5xl mx-auto px-6 md:px-12 prose prose-sm md:prose-lg prose-stone max-w-none 
                        prose-h2:display-font prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:uppercase prose-h2:tracking-tighter prose-h2:mt-10 md:prose-h2:mt-16 prose-h2:mb-6 md:prose-h2:mb-8
                        prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-black/[0.03] prose-blockquote:py-6 md:prose-blockquote:py-8 prose-blockquote:px-8 md:prose-blockquote:px-10 prose-blockquote:italic
                      ">
                        <div dangerouslySetInnerHTML={{ __html: currentPost.content || '<p class="text-black/20">Awaiting source code...</p>' }} />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="editor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col md:flex-row"
                  >
                    <aside className="w-full md:w-80 border-b-2 md:border-b-0 md:border-r-2 border-black p-8 md:p-10 bg-black/[0.02] space-y-12">
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-black/30 mb-4">Brief Excerpt</label>
                        <textarea 
                          value={currentPost.excerpt}
                          onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                          className="w-full text-xs text-black leading-relaxed border-2 border-black p-5 focus:bg-white outline-none bg-white md:bg-transparent h-40 md:h-48 resize-none transition-all placeholder:text-black/10"
                          placeholder="Hook the reader with a brief summary..."
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-black/30 mb-4">Index Tags</label>
                        <input 
                          type="text" 
                          value={currentPost.tags?.join(', ')}
                          onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                          className="w-full bg-white border-2 border-black px-5 py-4 font-mono text-xs uppercase focus:bg-[#D4FF3F] focus:text-black outline-none transition-all placeholder:text-black/10"
                          placeholder="TECH, AUTOMATION, RPA..."
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-black/30 mb-4">Release Date</label>
                        <input 
                          type="text" 
                          value={currentPost.date}
                          onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                          className="w-full bg-white border-2 border-black px-5 py-4 font-mono text-xs uppercase outline-none"
                        />
                      </div>
                    </aside>

                    {/* Content Main */}
                    <main className="flex-1 flex flex-col min-w-0">
                      <div className="p-6 md:p-10 border-b-2 border-black bg-white">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/20 mb-4">Headline</label>
                        <input 
                          type="text" 
                          value={currentPost.title}
                          onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                          className="w-full text-3xl md:text-6xl font-bold tracking-tighter display-font focus:text-black outline-none placeholder:text-black/5 uppercase"
                          placeholder="ENTER HEADLINE..."
                        />
                      </div>

                      {/* Tool Palette */}
                      <div className="flex flex-wrap items-center gap-1 p-2 bg-black text-white border-b-2 border-black">
                        <ToolbarButton onClick={() => insertTag('h2')} icon={Heading2} label="SEC" />
                        <ToolbarButton onClick={() => insertTag('h3')} icon={Heading3} label="SUB" />
                        <div className="w-[1px] h-6 bg-white/20 mx-3" />
                        <ToolbarButton onClick={() => insertTag('b')} icon={Bold} label="BOLD" />
                        <ToolbarButton onClick={() => insertTag('blockquote')} icon={Quote} label="QUOTE" />
                        <div className="w-[1px] h-6 bg-white/20 mx-3" />
                        <ToolbarButton onClick={() => insertTag('ul')} icon={List} label="LIST" />
                        <div className="w-[1px] h-6 bg-white/20 mx-3" />
                        <button 
                          onClick={() => insertTag('img')} 
                          className="flex items-center gap-3 px-6 py-2.5 hover:bg-[#D4FF3F] hover:text-black transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                          <ImageIcon size={14} /> Attach Media
                        </button>
                      </div>

                      <div className="flex-1 relative bg-white">
                        <textarea 
                          id="post-content"
                          value={currentPost.content}
                          onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                          className="w-full font-mono text-sm leading-relaxed border-none focus:ring-0 h-full p-6 md:p-12 bg-transparent resize-none placeholder:text-black/5 selection:bg-[#D4FF3F]"
                          placeholder="Init system write. HTML environment active..."
                        />
                      </div>
                    </main>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="w-full md:max-w-3xl">
                <div className="flex items-center gap-4 mb-6 opacity-30">
                  <div className="h-[1px] w-12 bg-black" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">Inventory System</span>
                </div>
                <h2 className="text-[12vw] sm:text-[10vw] md:text-9xl font-bold uppercase tracking-tighter display-font leading-[0.85] mb-8">
                  PUBLICATION <br className="hidden sm:block" />
                  <span className="bg-black text-[#D4FF3F] px-4 py-1 inline-block -rotate-1 sm:rotate-0">INDEX</span>
                </h2>
                <p className="text-black/60 font-medium tracking-tight max-w-sm uppercase text-[10px] md:text-[11px] leading-relaxed border-l-2 border-black/10 pl-6 py-2">
                  Systematic management of the studio's technical briefs, creative insight, and intellectual output.
                </p>
              </div>
              <div className="flex items-end gap-6 border-t-2 border-black/5 pt-10 md:pt-0 md:border-t-0 w-full md:w-auto justify-between md:justify-end">
                <div className="flex flex-col items-start md:items-end group">
                  <span className="text-7xl md:text-9xl font-black leading-none display-font tracking-tighter group-hover:text-[#D4FF3F] transition-colors">{posts.length}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mt-2">Active Records</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 border-t-2 border-black">
              {posts.length === 0 ? (
                <div className="bg-white py-40 text-center group border-x-2 border-b-2 border-black">
                  <p className="text-black/30 group-hover:text-black/50 font-black uppercase tracking-[0.5em] text-[10px] mb-12 italic">Archive database is empty</p>
                  <button onClick={() => setIsEditing(true)} className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-[#D4FF3F] hover:text-black transition-all border-2 border-black active:scale-95">Create Primary Record</button>
                </div>
              ) : (
                posts.map((post: BlogPost, index: number) => (
                  <motion.div 
                    layout
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 md:p-12 group border-x-2 border-b-2 border-black last:border-b-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 hover:bg-[#FDFCF7] transition-all relative overflow-hidden"
                  >
                    {/* Hover Decoration */}
                    <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-black transition-all duration-300" />
                    
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center flex-1 w-full">
                      <div className="hidden lg:flex flex-col min-w-[100px]">
                        <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-1">Record ID</span>
                        <span className="text-2xl font-bold display-font tracking-tighter">#{post.id.slice(0, 4)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((t: string) => (
                            <span key={t} className="text-[8px] font-black uppercase tracking-[0.3em] bg-black text-white px-3 py-1.5">{t}</span>
                          ))}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold display-font uppercase tracking-tighter leading-[0.9] group-hover:translate-x-4 transition-transform duration-500 max-w-3xl">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-12 mt-8 opacity-40 group-hover:opacity-100 transition-opacity">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-widest mb-1">Release</span>
                            <span className="text-xs font-bold uppercase tracking-tight">{post.date}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-widest mb-1">Metric</span>
                            <span className="text-xs font-bold uppercase tracking-tight">{calculateReadingTime(post.content)} MIN READ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto pt-6 md:pt-0 border-t md:border-0 border-black/5 mt-4 md:mt-0">
                      <button 
                        onClick={() => {
                          setCurrentPost(post);
                          setIsEditing(true);
                        }}
                        className="flex-1 md:flex-none bg-black text-white px-10 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-[#D4FF3F] hover:text-black transition-all border-2 border-black active:scale-95"
                      >
                        Modify
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="w-16 h-16 flex items-center justify-center border-2 border-black/5 hover:bg-red-500 hover:text-white hover:border-black transition-all group/del active:scale-90"
                      >
                        <Trash2 size={20} className="group-hover/del:scale-110 transition-transform" />
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

const ToolbarButton = ({ onClick, icon: Icon, label }: { onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick} 
    className="p-3 hover:bg-black hover:text-[#D4FF3F] transition-all rounded flex flex-col items-center gap-1 min-w-[50px] group"
  >
    <Icon size={14} />
    <span className="text-[7px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100">{label}</span>
  </button>
);

export default AdminDashboard;
