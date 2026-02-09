"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealUpProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const RevealUp: React.FC<RevealUpProps> = ({ children, delay = 0, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const delayStyle = { "--delay": `${delay}s` } as React.CSSProperties;

    return (
        <div
            ref={ref}
            className={`reveal-up ${isVisible ? "active" : ""} ${className}`}
            style={delayStyle}
        >
            {children}
        </div>
    );
};

export default RevealUp;
