import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getDesignPageData, getServices, getHomepageData } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Structural Design | Woodrock Engineering",
    description: "Innovative structural design for commercial and residential buildings, integrating timber, steel, and concrete.",
};

export default async function DesignPage() {
    const [pageData, services, homepageData] = await Promise.all([
        getDesignPageData(),
        getServices("Design"),
        getHomepageData()
    ]);

    if (!pageData || !services) {
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

                <section className="services-listing-section">
                    <div className="container">
                        <div className="services-grid">
                            {services.map((service, idx) => (
                                <div key={service.documentId} className="service-card reveal-up" style={{ "--delay": `${(idx % 3) * 0.1}s` } as React.CSSProperties}>
                                    {service.image?.url && (
                                        <div className="service-image">
                                            <Image
                                                src={service.image.url.startsWith('http') ? service.image.url : `${baseUrl}${service.image.url}`}
                                                alt={service.title}
                                                width={600}
                                                height={400}
                                            />
                                        </div>
                                    )}
                                    <div className={`service-info ${!service.image?.url ? 'no-img' : ''}`}>
                                        <h2 className="service-title">{service.title}</h2>
                                        <p className="service-text">{service.short_description}</p>
                                        <Link href={`/expertise/${service.slug}`} className="service-link">
                                            View Details <span className="arrow">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <TestimonialsSection data={{ ...homepageData, testimonials: pageData.testimonials } as any} />

                {/* Strategic Partnerships Section */}
                <section className="about-content-section reveal-up" style={{ background: "#f9f9f9" }}>
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-text-col">
                                <span className="section-label">STRATEGIC PARTNERSHIPS</span>
                                <h2 className="about-headline">Collaborating for Better Results</h2>
                                <p>We work closely with architects, builders, and developers to ensure that every structural
                                    plan is perfectly aligned with the project vision and budget requirements.</p>
                                <Link href="/marketers" className="service-link">Who We Work With &rarr;</Link>
                            </div>
                            <div className="about-image-col">
                                <Image
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                                    alt="Partnership"
                                    width={800}
                                    height={500}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <CtaBannerSection data={homepageData as any} />
            </main>
        </>
    );
}
