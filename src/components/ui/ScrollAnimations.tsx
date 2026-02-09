"use client";

import React, { useEffect } from "react";

const ScrollAnimations = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // We don't unobserve here if we want items to re-animate, 
                    // but the static version unobserved:
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal-up');
        revealElements.forEach(el => observer.observe(el));

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    return null;
};

export default ScrollAnimations;
