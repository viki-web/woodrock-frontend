import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getBlogPageData, getBlogPosts, getMediaUrl } from "@/lib/api";
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

    return (
        <>
            <ScrollAnimations />
            <main>
                <SubpageHero
                    title={pageData.hero_title}
                    description={pageData.hero_description}
                    backgroundImage={getMediaUrl(pageData.hero_image?.url)}
                />

                <section className="blog-listing-section">
                    <div className="container">
                        <div className="blog-grid">
                            {posts.map((post, idx) => (
                                <article key={post.id} className="blog-card reveal-up" style={{ "--delay": `${(idx % 3) * 0.1}s` } as React.CSSProperties}>
                                    <div className="blog-image">
                                        <Image
                                            src={getMediaUrl(post.image?.url, "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop")}
                                            alt={post.title}
                                            width={600}
                                            height={400}
                                        />
                                    </div>
                                    <div className="blog-content">
                                        <span className="blog-date">{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                                        <h2 className="blog-title">{post.title}</h2>
                                        <p className="blog-excerpt">{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`} className="read-more">Read More &rarr;</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
