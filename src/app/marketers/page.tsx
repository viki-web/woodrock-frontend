import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import LicensingMapSection from "@/components/LicensingMapSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getMarketPageData, getServices, getHomepageData, getMediaUrl } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Market Partnerships | Woodrock Engineering",
    description: "Partnership details and engineering support for marketers and developers across the United States.",
};

export default async function MarketersPage() {
    const [pageData, services, homepageData] = await Promise.all([
        getMarketPageData(),
        getServices("Market"),
        getHomepageData()
    ]);

    if (!pageData || !services) {
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

                <section className="services-listing-section">
                    <div className="container">
                        <div className="services-grid">
                            {services.map((service, idx) => (
                                <div key={service.documentId} className="service-card reveal-up" style={{ "--delay": `${(idx % 3) * 0.1}s` } as React.CSSProperties}>
                                    <div className="service-info no-img" style={{ background: service.background_color || '#231711', color: service.background_color === '#ffffff' || service.background_color === '#e6e6e6' ? '#000' : '#fff' }}>
                                        <h2 className="service-title" style={{ color: 'inherit' }}>{service.title}</h2>
                                        <p className="service-text" style={{ color: 'inherit', opacity: 0.8 }}>{service.short_description}</p>
                                        <Link href={`/expertise/${service.slug}`} className="service-link" style={{ color: 'inherit' }}>
                                            Partnership Details <span className="arrow">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {pageData.show_licensing_map && (
                    <LicensingMapSection data={homepageData as any} />
                )}

                {/* Strategic Vision Section */}
                <section className="about-content-section reveal-up">
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-image-col">
                                <Image
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                                    alt="Strategic Partnership"
                                    width={800}
                                    height={500}
                                />
                            </div>
                            <div className="about-text-col">
                                <span className="section-label">OUR MISSION</span>
                                <h2 className="about-headline">The #1 Post-Frame Firm in America</h2>
                                <p>Our goal is to redefine industry standards by providing accessible, high-quality, and
                                    building-ready engineering to every partner we work with.</p>
                                <Link href="/about" className="service-link">Learn More About Us &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <CtaBannerSection data={homepageData as any} />
            </main>
        </>
    );
}
