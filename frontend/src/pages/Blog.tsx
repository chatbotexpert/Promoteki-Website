import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../components/Marquee';
import { getStoredPosts, BlogPost } from '../utils/blogStorage';

const INITIAL_BLOGS = [
  {
    id: '1',
    title: 'DeepSeek Shakes the Tech World: How a Chinese Company Redefined AI with Its Open-Source R1 Model',
    excerpt: 'Last week, the global tech landscape was rocked by a groundbreaking announcement from Chinese company DeepSeek. The firm stunned the world by releasing its open-source R1 model, a move that not only overshadowed OpenAI\'s efforts but also redefined what\'s possible in artificial intelligence. The R1 model has already outperformed OpenAI\'s $200 GPT-4 model in reasoning tasks.',
    tags: ['Tech Updates', 'LLMs Utilization', 'OpenAI', 'DeepSeek R1'],
    date: 'January 28, 2026'
  },
];

const Blog = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const userPosts = getStoredPosts();
    // Merge static and dynamic posts
    const merged = [...userPosts, ...INITIAL_BLOGS as BlogPost[]];
    setAllPosts(merged);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <motion.section 
            key="single-post"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-40 pb-24 px-6 min-h-screen bg-white"
          >
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 hover:gap-4 transition-all"
              >
                ← Back to Insights
              </button>
              
              <div className="mb-16">
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedPost.tags.map((tag: string, ti: number) => (
                    <span key={ti} className="text-[10px] font-bold uppercase tracking-widest border border-black/20 px-4 py-1.5">{tag}</span>
                  ))}
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/20 mb-6">{selectedPost.date}</p>
                <h1 className="text-4xl md:text-7xl font-bold display-font tracking-tighter leading-[0.9] mb-12 uppercase">{selectedPost.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed italic border-l-4 border-[#D4FF3F] pl-8 py-4">
                  {selectedPost.excerpt}
                </p>
              </div>

              <div 
                className="blog-content-rich prose prose-xl prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }}
              />
            </div>
          </motion.section>
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
              <div className="max-w-4xl mx-auto px-6">
                {allPosts.map((post: BlogPost) => (
                  <article 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)}
                    className="group border-b border-black/10 pb-12 mb-12 last:border-b-0 cursor-pointer"
                  >
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag: string, ti: number) => (
                        <span key={ti} className="text-[10px] font-bold uppercase tracking-widest border border-black/20 px-3 py-1">{tag}</span>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 mb-4">{post.date}</p>
                    <h2 className="text-3xl md:text-4xl font-bold display-font tracking-tighter mb-6 group-hover:underline leading-tight uppercase">{post.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl font-medium">{post.excerpt}</p>
                    <span className="text-xs uppercase tracking-widest font-bold border-b-2 border-black pb-1 group-hover:pr-4 transition-all">
                      Read Article →
                    </span>
                  </article>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;
