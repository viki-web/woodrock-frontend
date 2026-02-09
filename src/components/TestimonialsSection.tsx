"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HomepageData } from "@/types";

const TestimonialsSection = ({ data }: { data: HomepageData }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="work-with-section">
            <div className="container">
                <div className="work-with-grid">
                    <div className="work-with-left">
                        <h2 className="section-title reveal-up">
                            WHAT IT&apos;S LIKE<br />TO WORK WITH<br />WOODROCK
                        </h2>
                        <p className="section-desc reveal-up" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                            Builders, contractors, and designers choose Woodrock because our drawings are clear,
                            practical, and built for the realities of the job site.
                        </p>
                        <a href="#contact" className="contact-link reveal-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                            Contact Us <span className="arrow">→</span>
                        </a>

                        {data.testimonials.length > 1 && (
                            <div className="slider-nav reveal-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                                <div className="swiper-btn-prev" ref={prevRef}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </div>
                                <div className="swiper-btn-next" ref={nextRef}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14m-7 7 7-7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="work-with-right">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            loop={data.testimonials.length > 1}
                            speed={800}
                            spaceBetween={40}
                            slidesPerView={1.3}
                            grabCursor={true}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                // @ts-ignore
                                swiper.params.navigation.prevEl = prevRef.current;
                                // @ts-ignore
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 1.1, spaceBetween: 30 },
                                1200: { slidesPerView: 1.3, spaceBetween: 40 },
                            }}
                            className="testimonial-swiper"
                        >
                            {data.testimonials.map((t) => (
                                <SwiperSlide key={t.id}>
                                    <div className="testimonial-card">
                                        <div className="testimonial-img-box">
                                            <Image
                                                src="/assets/images/construction_interior_testimonial_1770293774612.png"
                                                alt="Woodrock Project"
                                                width={400}
                                                height={500}
                                            />
                                        </div>
                                        <div className="testimonial-info-box">
                                            <p className="testimonial-quote">"{t.quote}"</p>
                                            <div className="testimonial-user">
                                                <div className="user-avatar">
                                                    <Image
                                                        src="/assets/images/contractor_avatar_testimonial_1770293791242.png"
                                                        alt={t.author_name}
                                                        width={70}
                                                        height={70}
                                                    />
                                                </div>
                                                <div className="user-details">
                                                    <h4 className="user-name">{t.author_name}</h4>
                                                    <p className="user-role">{t.author_role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
