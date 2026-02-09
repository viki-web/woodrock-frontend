"use client";

import React from "react";
import Image from "next/image";
import { HomepageData } from "@/types";

const StatsSection = ({ data }: { data: HomepageData }) => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-header">
                    <h2 className="stats-title reveal-up">
                        {data.stats_title.split(' ').map((word, i, arr) => (
                            <React.Fragment key={i}>
                                {word}
                                {i === Math.floor(arr.length / 2) - 1 && <br />}
                                {i < arr.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </h2>
                    <p className="stats-description reveal-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                        {data.stats_description}
                    </p>
                </div>

                <div className="stats-divider"></div>

                <div className="stats-grid">
                    {data.stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="stat-item reveal-up"
                            style={{ '--delay': `${0.3 + index * 0.15}s` } as React.CSSProperties}
                        >
                            <span className="stat-number">{stat.value}</span>
                            <p className="stat-text">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="watermark-logo">
                <Image src="/assets/images/logo_grey.png" alt="" width={500} height={500} />
            </div>
        </section>
    );
};

export default StatsSection;
