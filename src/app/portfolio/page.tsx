import React from "react";
import Image from "next/image";
import SubpageHero from "@/components/SubpageHero";
import CtaBannerSection from "@/components/CtaBannerSection";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getPortfolioPageData, getProjects, getHomepageData } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Project Portfolio | Woodrock Engineering",
    description: "Discover our expertly crafted projects that showcase innovation and precision across various industries.",
};

export default async function PortfolioPage() {
    const [pageData, projects, homepageData] = await Promise.all([
        getPortfolioPageData(),
        getProjects(),
        getHomepageData()
    ]);

    if (!pageData || !projects) {
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

                <section className="portfolio-listing-section">
                    <div className="container">
                        <div className="portfolio-grid">
                            {projects.map((project, idx) => (
                                <div key={project.id} className="portfolio-item reveal-up" style={{ "--delay": `${(idx % 3) * 0.1}s` } as React.CSSProperties}>
                                    <div className="portfolio-image">
                                        <Image
                                            src={project.image?.url ? (project.image.url.startsWith('http') ? project.image.url : `${baseUrl}${project.image.url}`) : "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2070&auto=format&fit=crop"}
                                            alt={project.title}
                                            width={800}
                                            height={600}
                                        />
                                    </div>
                                    <div className="portfolio-info">
                                        <span className="project-cat">{project.category}</span>
                                        <h2 className="project-title">{project.title}</h2>
                                        <p className="project-desc">{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="stats-section reveal-up" style={{ background: "#000", color: "#fff", padding: "100px 0" }}>
                    <div className="container">
                        <div className="stats-grid" style={{ borderTop: "none" }}>
                            {pageData.stats.map((stat, idx) => (
                                <div key={idx} className="stat-item">
                                    <span className="stat-number" style={{ color: "#fff" }}>{stat.value}</span>
                                    <p className="stat-text" style={{ color: "rgba(255,255,255,0.7)" }}>{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="about-content-section reveal-up">
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-text-col">
                                <span className="section-label">HOW WE WORK</span>
                                <h2 className="about-headline">{pageData.methodology_title}</h2>
                                <p>{pageData.methodology_description}</p>
                                <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
                                    {pageData.methodology_steps.map((step, idx) => (
                                        <li key={idx} style={{ marginBottom: "20px", display: "flex", gap: "15px", alignItems: "flex-start" }}>
                                            <span style={{ fontWeight: 700, color: "#000" }}>{step.step_number}.</span>
                                            <div>
                                                <strong>{step.label}:</strong> {step.description}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="about-image-col">
                                <Image
                                    src={pageData.methodology_image?.url ? (pageData.methodology_image.url.startsWith('http') ? pageData.methodology_image.url : `${baseUrl}${pageData.methodology_image.url}`) : "https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=2070&auto=format&fit=crop"}
                                    alt="Methodology"
                                    width={800}
                                    height={1000}
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
