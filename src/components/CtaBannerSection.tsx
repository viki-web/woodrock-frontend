"use client";

import React from "react";
import { HomepageData } from "@/types";

const CtaBannerSection = ({ data }: { data: HomepageData }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    const bgImage = data?.cta_background?.url
        ? (data.cta_background.url.startsWith('http') ? data.cta_background.url : `${baseUrl}${data.cta_background.url}`)
        : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop";

    return (
        <section className="cta-banner-section reveal-up">
            <div className="container">
                <div
                    className="cta-banner-content"
                    style={{
                        backgroundImage: `url('${bgImage}')`,
                    }}
                >
                    <div className="cta-banner-overlay"></div>
                    <div className="cta-inner-text">
                        <h2 className="cta-title">{data.cta_title}</h2>
                        <p className="cta-subtitle">{data.cta_subtitle}</p>
                        <a href="#contact" className="cta-button">{data.cta_button_text}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaBannerSection;
