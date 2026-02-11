import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import FAQSection from "@/components/FaqSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getExpertisePageData, getServices, getHomepageData, getMediaUrl } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Engineering Expertise | Woodrock Engineering",
    description: "Our engineering process covers everything from foundation design to residential post-frame landmarks.",
};

export default async function ExpertisePage() {
    const [pageData, services, homepageData] = await Promise.all([
        getExpertisePageData(),
        getServices("Engineering"),
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
                                    <div className="service-image">
                                        <Image
                                            src={getMediaUrl(service.image?.url, "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop")}
                                            alt={service.title}
                                            width={600}
                                            height={400}
                                        />
                                    </div>
                                    <div className="service-info">
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

                <section className="how-it-works-section reveal-up">
                    <div className="container">
                        <div className="how-header">
                            <span className="section-label">OUR PROCESS</span>
                            <h2 className="how-title">{pageData.process_title}</h2>
                            <p className="how-description">{pageData.process_description}</p>
                        </div>

                        <div className="steps-grid-premium">
                            {pageData.process_steps.map((step, idx) => (
                                <div key={idx} className="step-card reveal-up" style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}>
                                    <span className="step-number">{step.step_number}</span>
                                    <div className="step-content">
                                        <h3 className="step-label">{step.label}</h3>
                                        <p className="step-description">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* We Re-use the FAQ component but pass the page specific FAQs */}
                <FAQSection data={{ ...homepageData, faqs: pageData.faqs } as any} title="Engineering FAQ" label="COMMON QUESTIONS" />

                {/* We Re-use the CTA Banner but pass homepage data as fallback */}
                <CtaBannerSection data={homepageData as any} />
            </main>
        </>
    );
}
