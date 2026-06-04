import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';
import { ChevronLeft, Share2 } from 'lucide-react';
import type { BlogPostFrontmatter } from './BlogList';

const markdownModules = import.meta.glob('/public/content/blog/*.md', { 
    query: '?raw', 
    import: 'default',
    eager: true 
}) as Record<string, string>;

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostFrontmatter | null>(null);

    useEffect(() => {
        let foundPost: BlogPostFrontmatter | null = null;

        for (const key of Object.keys(markdownModules)) {
            const rawContent = markdownModules[key];
            const parsed = frontMatter<any>(rawContent);
            
            const filenameMatch = key.match(/\/([^/]+)\.md$/);
            const filenameSlug = filenameMatch ? filenameMatch[1] : '';
            const postSlug = parsed.attributes.slug || filenameSlug;

            if (postSlug === slug) {
                foundPost = {
                    slug: postSlug,
                    title: parsed.attributes.title || 'Untitled',
                    date: parsed.attributes.date || new Date().toISOString(),
                    author: parsed.attributes.author || 'Utilo Team',
                    excerpt: parsed.attributes.excerpt || '',
                    img: parsed.attributes.img || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?width=800',
                    tags: parsed.attributes.tags || [],
                    content: parsed.body
                };
                break;
            }
        }

        if (foundPost) {
            document.title = `${foundPost.title} | Utilo Blog`;
            setPost(foundPost);
        } else {
            document.title = "Post Not Found | Utilo Blog";
        }
    }, [slug]);

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Post not found</h1>
                <Link to="/blog" className="text-teal-600 hover:underline font-medium">Return to blog</Link>
            </div>
        );
    }

    const shareUrl = window.location.href;

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
            <Link to="/blog" className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm mb-8 hover:text-teal-700 transition-colors bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                <ChevronLeft size={16} />
                Back to Blog
            </Link>
            
            {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                    {post.tags.map((t, idx) => (
                        <span key={t} className="text-teal-600 text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                            {t}
                            {idx < post.tags.length - 1 && <span className="text-slate-300">•</span>}
                        </span>
                    ))}
                </div>
            )}
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mb-10 pb-10 border-b border-slate-100">
                <span>By {post.author}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden mb-12 bg-slate-100 shadow-sm border border-slate-200">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
            </div>
            
            <article className="prose prose-slate prose-teal lg:prose-lg max-w-none prose-headings:font-extrabold prose-a:font-bold prose-img:rounded-xl">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
            
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-bold text-slate-900">Share this article</p>
                <div className="flex gap-3">
                    <button 
                        onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link copied!'); }} 
                        className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 transition-colors shadow-sm"
                        title="Copy Link"
                    >
                        <Share2 size={16} />
                    </button>
                    <button 
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(document.title)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-colors shadow-sm font-bold"
                        title="Share on Twitter"
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
}
