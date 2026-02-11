import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import { getServiceBySlug, getServices, getMediaUrl } from "@/lib/api";
import { Metadata } from 'next';
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import StrapiBlocks from "@/components/BlocksRenderer";

export const dynamicParams = false;

export async function generateStaticParams() {
    const services = await getServices();
    if (!services) return [];
    return services.map((service) => ({
        slug: service.slug,
    }));
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    return {
        title: `${service?.title || 'Service'} | Woodrock Engineering`,
        description: service?.short_description || "Expert engineering services.",
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return <div>Service not found</div>;
    }

    return (
        <>
            <ScrollAnimations />
            <main>
                <SubpageHero
                    title={service.title}
                    description={service.short_description || ""}
                    backgroundImage={getMediaUrl(service.banner_image?.url || service.image?.url)}
                />

                <section className="detail-content-section">
                    <div className="container">
                        <div className="detail-grid">
                            <div className="detail-text-col reveal-up">
                                {service.content ? (
                                    <StrapiBlocks content={service.content} />
                                ) : (
                                    <>
                                        <h2 className="detail-subheadline">Foundation for Success</h2>
                                        <p>{service.short_description}</p>
                                    </>
                                )}
                            </div>

                            <div className="detail-image-col reveal-up" style={{ "--delay": "0.2s" } as React.CSSProperties}>
                                <div className="sticky-image">
                                    <Image
                                        src={getMediaUrl(service.banner_image?.url || service.image?.url, "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop")}
                                        alt={service.title}
                                        width={800}
                                        height={1000}
                                    />
                                    <div className="image-caption">High-Performance {service.title} Design</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
