import React from "react";
import SubpageHero from "@/components/SubpageHero";
import ContactForm from "@/components/ContactForm";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getContactPageData, getFooterData, getMediaUrl } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | Woodrock Engineering",
    description: "Ready to discuss your vision? Get in touch with our team for expert engineering support.",
};

export default async function ContactPage() {
    const [pageData, footerData] = await Promise.all([
        getContactPageData(),
        getFooterData()
    ]);

    if (!pageData) {
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

                <section className="contact-hero-section">
                    <div className="container">
                        <div className="contact-hero-grid">
                            <div className="contact-hero-text reveal-up">
                                <div className="contact-methods">
                                    <div className="contact-method">
                                        <h3>Office</h3>
                                        <p>{footerData?.address || "101 Cassidy Drive Suite C, Dover, DE 19901"}</p>
                                    </div>
                                    {footerData?.phone && (
                                        <div className="contact-method">
                                            <h3>Call Us</h3>
                                            <p>{footerData.phone}</p>
                                        </div>
                                    )}
                                    {footerData?.email && (
                                        <div className="contact-method">
                                            <h3>Email</h3>
                                            <p>{footerData.email}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="contact-form-col reveal-up" style={{ "--delay": "0.2s" } as React.CSSProperties}>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="locations-section">
                    <div className="container">
                        <div className="locations-grid">
                            {pageData.locations.map((loc, idx) => (
                                <div key={idx} className="location-card reveal-up" style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}>
                                    <h2>{loc.title}</h2>
                                    <p>{loc.address}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
