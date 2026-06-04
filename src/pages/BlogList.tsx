import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import frontMatter from 'front-matter';

// Extract raw string content from all .md files in the blog folder at build/dev time
const markdownModules = import.meta.glob('/public/content/blog/*.md', { 
    query: '?raw', 
    import: 'default',
    eager: true 
}) as Record<string, string>;

export type BlogPostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  img: string;
  tags: string[];
  content: string;
};

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPostFrontmatter[]>([]);

    useEffect(() => {
        document.title = "Blog - Utilo";
        
        const loadedPosts = Object.keys(markdownModules).map(key => {
            const rawContent = markdownModules[key];
            const parsed = frontMatter<any>(rawContent);
            
            const filenameMatch = key.match(/\/([^/]+)\.md$/);
            const filenameSlug = filenameMatch ? filenameMatch[1] : '';
            
            return {
                slug: parsed.attributes.slug || filenameSlug,
                title: parsed.attributes.title || 'Untitled',
                date: parsed.attributes.date || new Date().toISOString(),
                author: parsed.attributes.author || 'Utilo Team',
                excerpt: parsed.attributes.excerpt || '',
                img: parsed.attributes.img || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                tags: parsed.attributes.tags || [],
                content: parsed.body
            };
        });

        // Sort posts dynamically by newest date
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(loadedPosts);
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10 text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                Utilo Blog
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                Tips, guides, and updates from the Utilo team.
              </p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-[2rem] shadow-sm border border-slate-200">
                    <p className="text-slate-500 font-medium text-lg">No blog posts found.</p>
                    <p className="text-slate-400 text-sm mt-2">Publish a post via the Decap CMS admin panel.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link 
                            key={post.slug} 
                            to={`/blog/${post.slug}`} 
                            className="group bg-white rounded-[1.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200 hover:shadow-[0_8px_30px_rgb(20,184,166,0.12)] hover:border-teal-300 transition-all duration-500 flex flex-col hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="h-48 overflow-hidden bg-slate-100">
                                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex gap-2 mb-3 flex-wrap">
                                        {post.tags.map(t => (
                                            <span key={t} className="bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-md">{t}</span>
                                        ))}
                                    </div>
                                )}
                                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-teal-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-sm font-medium text-slate-500 mb-6 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="text-[13px] font-bold text-slate-400 mt-auto flex justify-between items-center">
                                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    <span>3 min read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
