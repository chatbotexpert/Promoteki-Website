import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Share2, ArrowLeft, Check, Copy } from 'lucide-react';
import Marquee from '../components/Marquee';
import { getStoredPosts, BlogPost, calculateReadingTime } from '../utils/blogStorage';

const INITIAL_BLOGS = [
  {
    id: 'deepseek-shakes-tech-world-chinese-company-redefined-ai-open-source-r1-model',
    title: 'DeepSeek Shakes the Tech World: How a Chinese Company Redefined AI with Its Open-Source R1 Model',
    excerpt: 'Last week, the global tech landscape was rocked by a groundbreaking announcement from Chinese company DeepSeek. The firm stunned the world by releasing its open-source R1 model, a move that not only overshadowed OpenAI\'s efforts but also redefined what\'s possible in artificial intelligence.',
    content: `
      <p>Last week, the global tech landscape was rocked by a groundbreaking announcement from Chinese company DeepSeek. The firm stunned the world by releasing its open-source R1 model, a move that not only overshadowed OpenAI's efforts but also redefined what's possible in artificial intelligence. The R1 model has already outperformed OpenAI's $200 GPT-4 model in reasoning tasks.</p>
      <p>This development marks a significant shift in the AI power balance. While Silicon Valley giants have largely kept their most advanced models behind proprietary API walls, DeepSeek's decision to go open-source challenges the "closed garden" approach and democratizes access to high-tier reasoning capabilities.</p>
      <h2>The Performance Gap</h2>
      <p>Early benchmarks suggest that DeepSeek R1 rivals or even surpasses GPT-4 in complex mathematical reasoning and coding tasks. This isn't just a minor improvement; it's a statement that specialized, efficient models can compete with the massive, generic architectures favored by US-based firms.</p>
      <blockquote>"DeepSeek isn't just following; they are leading a new wave of efficient, specialized AI that respects the open-source ethos."</blockquote>
      <p>For businesses looking to integrate AI, this means lower costs and more control. The open-weights nature of R1 allows for local deployment, addressing privacy concerns that have plagued enterprise adoption of LLMs.</p>
      <p>As we move further into 2026, the question isn't just who has the biggest model, but who can provide the most accessible, capable, and efficient intelligence. DeepSeek has firmly placed itself at the center of that conversation.</p>
    `,
    tags: ['Tech Updates', 'LLMs Utilization', 'OpenAI', 'DeepSeek R1'],
    date: 'January 28, 2026'
  },
];

const ArrowIcon = () => (
  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userPosts = getStoredPosts();
    const merged = [...userPosts, ...INITIAL_BLOGS as BlogPost[]];
    setAllPosts(merged);

    if (id) {
      const post = merged.find(p => p.id === id);
      if (post) {
        setSelectedPost(post);
      } else {
        navigate('/blog', { replace: true });
      }
    } else {
      setSelectedPost(null);
    }
  }, [id, navigate]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <motion.article 
            key="single-post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-24"
          >
            {/* Post Hero */}
            <header className="relative pt-32 pb-16 px-6 border-b border-black/10 overflow-hidden bg-[#FDFCF7]">
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              <div className="max-w-7xl mx-auto relative z-10 w-full">
                <Link 
                  to="/blog"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors mb-8 sm:mb-16 group"
                >
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                  Return to Feed
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start lg:items-end">
                  <div className="w-full lg:col-span-8">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedPost.tags.map((tag, ti) => (
                        <span key={ti} className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold display-font tracking-tighter leading-[1.1] md:leading-[0.9] uppercase break-words">
                      {selectedPost.title}
                    </h1>
                  </div>

                  <div className="lg:col-span-4 flex lg:flex-col justify-between items-start lg:items-end gap-6 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-12">
                    <div className="text-left lg:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/20 mb-1">Published</p>
                      <p className="text-sm font-bold uppercase">{selectedPost.date}</p>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/20 mb-1">Reading time</p>
                      <p className="text-sm font-bold uppercase">{calculateReadingTime(selectedPost.content || '')} min read</p>
                    </div>
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-widest bg-white border border-black/10 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                      {copied ? 'Link Copied' : 'Share Story'}
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-24">
              <aside className="lg:col-span-3 hidden lg:block">
                <div className="sticky top-32">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/20 mb-6">Briefing</p>
                  <p className="text-gray-500 font-medium leading-relaxed italic border-l-2 border-[#D4FF3F] pl-6 py-2">
                    {selectedPost.excerpt}
                  </p>
                </div>
              </aside>

              <div className="w-full lg:col-span-7 lg:col-start-5">
                <div 
                  className="blog-content-rich prose prose-stone max-w-none w-full md:prose-lg lg:prose-xl
                    prose-h2:display-font prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:md:text-4xl prose-h2:uppercase prose-h2:tracking-tighter prose-h2:mt-16 prose-h2:mb-8
                    prose-h3:display-font prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:md:text-3xl prose-h3:uppercase prose-h3:tracking-tighter prose-h3:mt-12 prose-h3:mb-6
                    prose-p:text-black/70 prose-p:leading-relaxed prose-p:mb-8
                    prose-blockquote:border-l-[#D4FF3F] prose-blockquote:bg-[#F4F4F0] prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:my-12 prose-blockquote:rounded-r-lg
                    prose-strong:text-black prose-strong:font-bold
                    prose-li:text-black/70
                  "
                  dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }}
                />

                {/* Footer Engagement */}
                <footer className="mt-32 pt-16 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-12">
                  <div>
                    <h4 className="display-font text-2xl font-bold uppercase tracking-tighter mb-2">Thoughts on this?</h4>
                    <p className="text-gray-500 text-sm">We'd love to hear how automation is scaling your workflows.</p>
                  </div>
                  <Link 
                    to="/contact"
                    className="group flex items-center gap-8 bg-black text-white px-10 py-5 uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-[#D4FF3F] hover:text-black transition-all"
                  >
                    Start the conversation
                    <ArrowLeft className="rotate-180 group-hover:translate-x-2 transition-transform" size={16} />
                  </Link>
                </footer>
              </div>
            </div>
          </motion.article>
        ) : (
          <motion.div 
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Page Hero */}
            <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end">
              <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Insights</p>
              <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
                The Blog
              </h1>
              <div className="mt-8 b-top pt-8 max-w-3xl">
                <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
                  Explore ideas, trends, and news shaping our industry.
                </p>
              </div>
            </section>

            <Marquee text="IDEAS × TRENDS × INSIGHTS —" dark={false} />

            {/* Blog Posts */}
            <section className="py-24 bg-white border-t border-black/10">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="border-t border-black/10">
                  {allPosts.map((post) => (
                    <Link 
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="group border-b border-black/10 py-12 flex flex-col md:flex-row justify-between md:items-center gap-8 cursor-pointer hover:bg-[#F4F4F0] transition-colors px-6 -mx-6"
                    >
                      <div className="flex flex-col md:flex-row items-start gap-8 flex-grow">
                        <div className="flex-shrink-0 pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">{post.date}</p>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, ti) => (
                              <span key={ti} className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{tag}</span>
                            ))}
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold display-font tracking-tighter uppercase mb-4 group-hover:pl-4 transition-all duration-300">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 max-w-2xl group-hover:pl-4 transition-all duration-300 delay-75 text-sm md:text-base line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 hidden md:block">
                          Read Article
                        </span>
                        <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 group-hover:-rotate-45">
                          <ArrowIcon />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
