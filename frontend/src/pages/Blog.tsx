import React from 'react';
import Marquee from '../components/Marquee';

const blogs = [
  {
    title: 'DeepSeek Shakes the Tech World: How a Chinese Company Redefined AI with Its Open-Source R1 Model',
    excerpt: 'Last week, the global tech landscape was rocked by a groundbreaking announcement from Chinese company DeepSeek. The firm stunned the world by releasing its open-source R1 model, a move that not only overshadowed OpenAI\'s efforts but also redefined what\'s possible in artificial intelligence. The R1 model has already outperformed OpenAI\'s $200 GPT-4 model in reasoning tasks.',
    tags: ['Tech Updates', 'LLMs Utilization', 'OpenAI', 'DeepSeek R1'],
  },
];

const Blog = () => {
  return (
    <>
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
          {blogs.map((post, i) => (
            <article key={i} className="group border-b border-black/10 pb-12 mb-12 last:border-b-0 cursor-pointer">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, ti) => (
                  <span key={ti} className="text-[10px] font-bold uppercase tracking-widest border border-black/20 px-3 py-1">{tag}</span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold display-font tracking-tighter mb-6 group-hover:underline leading-tight">{post.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>
              <span className="text-xs uppercase tracking-widest font-bold border-b-2 border-black pb-1 group-hover:pr-4 transition-all">
                Read Article →
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
