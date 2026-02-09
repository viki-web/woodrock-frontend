import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import CtaBannerSection from "@/components/CtaBannerSection";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getAboutPageData, getHomepageData } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | Woodrock Engineering",
    description: "Learn about our mission to redefine industry standards by providing accessible, high-quality engineering.",
};

export default async function AboutPage() {
    const [pageData, homepageData] = await Promise.all([
        getAboutPageData(),
        getHomepageData()
    ]);

    if (!pageData) {
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

                <section className="about-content-section reveal-up">
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-image-col">
                                <Image
                                    src={pageData.mission_image?.url ? (pageData.mission_image.url.startsWith('http') ? pageData.mission_image.url : `${baseUrl}${pageData.mission_image.url}`) : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"}
                                    alt="About Woodrock"
                                    width={800}
                                    height={600}
                                />
                            </div>
                            <div className="about-text-col">
                                <span className="section-label">OUR MISSION</span>
                                <h2 className="about-headline">{pageData.mission_title}</h2>
                                <p>{pageData.mission_description}</p>
                                <Link href="/contact" className="service-link">Work With Us &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional sections for About page can be added here */}

                <CtaBannerSection data={homepageData as any} />
            </main>
        </>
    );
}
