import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getBlogPageData, getBlogPosts } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Woodrock Blog | Engineering Insights",
    description: "Insights, updates, and expert advice on post-frame engineering and construction trends.",
};

export default async function BlogPage() {
    const [pageData, posts] = await Promise.all([
        getBlogPageData(),
        getBlogPosts()
    ]);

    if (!pageData || !posts) {
        return <div>Loading...</div>;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    return (
        <>
            <ScrollAnimations />
            <main>
                <SubpageHero
                    title={pageData.hero_title}
                    description={pageData.hero_description}
                    backgroundImage={pageData.hero_image?.url ? (pageData.hero_image.url.startsWith('http') ? pageData.hero_image.url : `${baseUrl}${pageData.hero_image.url}`) : undefined}
                />

                <section className="blog-listing-section">
                    <div className="container">
                        <div className="blog-grid">
                            {posts.map((post, idx) => (
                                <article key={post.id} className="blog-card reveal-up" style={{ "--delay": `${(idx % 3) * 0.1}s` } as React.CSSProperties}>
                                    {post.image?.url ? (
                                        <div className="blog-image">
                                            <Image
                                                src={post.image.url.startsWith('http') ? post.image.url : `${baseUrl}${post.image.url}`}
                                                alt={post.title}
                                                width={600}
                                                height={400}
                                            />
                                        </div>
                                    ) : (
                                        <div className="blog-content no-img" style={{ background: "#231711", color: "#fff" }}>
                                            <span className="blog-date">{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                                            <h2 className="blog-title" style={{ color: "#fff" }}>{post.title}</h2>
                                            <p className="blog-excerpt" style={{ color: "rgba(255,255,255,0.7)" }}>{post.excerpt}</p>
                                            <Link href={`/blog/${post.slug}`} className="read-more" style={{ color: "#fff" }}>Read More &rarr;</Link>
                                        </div>
                                    )}
                                    {post.image?.url && (
                                        <div className="blog-content">
                                            <span className="blog-date">{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                                            <h2 className="blog-title">{post.title}</h2>
                                            <p className="blog-excerpt">{post.excerpt}</p>
                                            <Link href={`/blog/${post.slug}`} className="read-more">Read More &rarr;</Link>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
