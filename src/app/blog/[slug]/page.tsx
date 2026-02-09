import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api";
import { Metadata } from 'next';
import { BlogPost } from "@/types";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import StrapiBlocks from "@/components/BlocksRenderer";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    return {
        title: `${post?.title || 'Blog Post'} | Woodrock Engineering`,
        description: post?.excerpt || "Engineering insights and news.",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, allPosts] = await Promise.all([
        getBlogPostBySlug(slug),
        getBlogPosts()
    ]);

    if (!post) {
        return <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>Post not found</div>;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    // Find the next post for the "Up Next" section
    const currentIndex = allPosts?.findIndex((p: BlogPost) => p.slug === post.slug) ?? -1;
    const nextPost = allPosts && currentIndex !== -1 && currentIndex < allPosts.length - 1
        ? allPosts[currentIndex + 1]
        : (allPosts && allPosts.length > 1 ? allPosts[0] : null);

    const heroImage = post.image?.url
        ? (post.image.url.startsWith('http') ? post.image.url : `${baseUrl}${post.image.url}`)
        : 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2070&auto=format&fit=crop';

    return (
        <>
            <ScrollAnimations />
            <main>
                {/* Dynamic Hero Matching Static Style */}
                <section
                    className="subpage-hero blog-detail-hero"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                >
                    <div className="container">
                        <div className="subpage-hero-content">
                            <nav className="breadcrumb-white reveal-up">
                                <Link href="/blog">Blog</Link> / Engineering Insights
                            </nav>
                            <h1 className="hero-title reveal-up">{post.title}</h1>
                            <div className="post-meta-white reveal-up" style={{ "--delay": "0.1s" } as React.CSSProperties}>
                                <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase() : ""}</span> • <span>5 MIN READ</span> • <span>BY WOODROCK EDITORIAL</span>
                            </div>
                        </div>
                    </div>
                </section>

                <article className="blog-post-container">
                    <div className="container">
                        <div className="blog-layout">
                            {/* Sidebar / Share matching static version */}
                            <aside className="blog-sidebar reveal-up">
                                <div className="sticky-sidebar">
                                    <span className="sidebar-label">SHARE</span>
                                    <div className="share-links">
                                        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                        <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                                        <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                                    </div>
                                </div>
                            </aside>

                            <div className="blog-main-content reveal-up" style={{ "--delay": "0.1s" } as React.CSSProperties}>
                                {post.excerpt && <p className="lead-text">{post.excerpt}</p>}

                                <div className="blog-rich-text">
                                    {post.content ? (
                                        <StrapiBlocks content={post.content} />
                                    ) : (
                                        <p>Comprehensive article content coming soon...</p>
                                    )}
                                </div>

                                {/* Article Footer matching static version */}
                                <div className="article-tags">
                                    <span className="tag">Engineering</span>
                                    <span className="tag">Construction</span>
                                    <span className="tag">Woodrock</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related / Next Section matching static version */}
                {nextPost && (
                    <section className="next-article-section reveal-up">
                        <div className="container">
                            <span className="section-label">UP NEXT</span>
                            <div className="next-article-card">
                                <Link href={`/blog/${nextPost.slug}`} className="next-link">
                                    <h2 className="next-title">{nextPost.title} &rarr;</h2>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
