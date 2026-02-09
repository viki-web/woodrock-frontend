"use client";

import React from "react";
import RevealUp from "./ui/RevealUp";

interface SubpageHeroProps {
    title: string;
    description: string;
    backgroundImage?: string;
}

const SubpageHero = ({ title, description, backgroundImage }: SubpageHeroProps) => {
    const defaultBg = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop";
    const bgUrl = backgroundImage || defaultBg;

    return (
        <section className="subpage-hero"
            style={{ backgroundImage: `url('${bgUrl}')` }}>
            <div className="container">
                <div className="subpage-hero-content">
                    <h1 className="hero-title reveal-up">
                        {title.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < title.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="hero-desc reveal-up" style={{ "--delay": "0.1s" } as React.CSSProperties}>
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SubpageHero;
