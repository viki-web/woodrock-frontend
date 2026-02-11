"use client";

import React from "react";
import { HomepageData } from "@/types";
import { getMediaUrl } from "@/lib/api";

const HowItWorksSection = ({ data }: { data: HomepageData }) => {
    const videoUrl = getMediaUrl(data.how_it_works_video?.url, "/assets/videos/overlay.mp4");

    return (
        <section className="how-it-works-section">
            <div className="container">
                <div className="how-header">
                    <h2 className="how-title">{data.how_it_works_title}</h2>
                    <p className="how-description">{data.how_it_works_description}</p>
                </div>

                <div className="steps-grid-wrapper">
                    <div className="steps-video-bg">
                        <video autoPlay muted loop playsInline key={videoUrl}>
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    </div>

                    <div className="steps-grid">
                        {data.how_it_works_steps.map((step) => (
                            <div
                                key={step.id}
                                className={`step-card step-card-${step.position}`}
                            >
                                <span className="step-number">{step.step_number}</span>
                                <span className="step-label">{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
