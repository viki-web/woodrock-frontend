"use client";

import React from "react";
import Link from "next/link";
import RevealUp from "./ui/RevealUp";
import { getMediaUrl } from "@/lib/api";
import { HomepageData } from "@/types";

const HeroSection = ({ data }: { data: HomepageData }) => {
    const videoUrl = getMediaUrl(data.hero_video?.url, "/assets/videos/construction.mp4");

    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title reveal-up">
                        {data.hero_title.includes(' ')
                            ? data.hero_title.split(' ').map((word, i, arr) => (
                                <React.Fragment key={i}>
                                    {word}
                                    {i < arr.length - 1 && <br />}
                                </React.Fragment>
                            ))
                            : data.hero_title
                        }
                    </h1>
                    <div className="hero-description reveal-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                        <p>{data.hero_description}</p>
                        <Link href="/contact" className="cta-link">
                            Contact Us <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hero-image-wrapper reveal-up" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                <video className="hero-image" autoPlay muted loop playsInline key={videoUrl}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
};

export default HeroSection;
