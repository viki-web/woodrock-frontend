"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { HomepageData } from "@/types";

const WeDoSection = ({ data }: { data: HomepageData }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="wedo-section" ref={sectionRef}>
            <div className="wedo-container">
                <span className="wedo-text text-left">WE</span>
                <div className="wedo-menu">
                    <ul>
                        {data.we_do_items.map((item) => (
                            <li key={item.id}>
                                <Link href={item.url}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="wedo-text text-right">DO</span>
            </div>
        </section>
    );
};

export default WeDoSection;
