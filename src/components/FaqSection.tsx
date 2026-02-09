"use client";

import React, { useState } from "react";
import { HomepageData } from "@/types";

interface FaqSectionProps {
    data: { faqs: { question: string, answer: string, id?: any }[] };
    title?: string;
    label?: string;
}

const FaqSection = ({ data, title, label }: FaqSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number>(1);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="faq-accordion-section reveal-up">
            <div className="container">
                {title && (
                    <div className="text-center mb-60">
                        {label && <span className="section-label">{label}</span>}
                        <h2 className="about-headline">{title}</h2>
                    </div>
                )}
                <div className="accordion-group">
                    {data.faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`accordion-item ${openIndex === index ? "active" : ""}`}
                        >
                            <h3 className="accordion-trigger" onClick={() => toggleItem(index)}>
                                {faq.question}
                            </h3>
                            <div className="accordion-content">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;

