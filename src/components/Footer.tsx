import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FooterData } from "@/types";
import { getMediaUrl } from "@/lib/api";

const Footer = ({ data }: { data?: FooterData | null }) => {
    const logoSrc = getMediaUrl(data?.logo?.url, "/assets/images/logo_footer.png");

    const quickLinks = data?.quick_links || [
        { label: "Engineering", url: "/expertise" },
        { label: "Design", url: "/design" },
        { label: "Markets", url: "/marketers" },
        { label: "Portfolio", url: "/portfolio" },
        { label: "About", url: "/about" },
        { label: "Blog", url: "/blog" },
        { label: "Contact", url: "/contact" }
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-main">
                    <div className="footer-column brand-col">
                        <Image
                            src={logoSrc}
                            alt="Woodrock Engineering"
                            width={170}
                            height={50}
                            className="footer-logo"
                            style={{ height: 'auto' }}
                        />
                    </div>

                    <div className="footer-column cta-col">
                        <h3 className="footer-message">{data?.cta_title || "Let’s Discuss Your Vision"}</h3>
                        <Link href={data?.cta_button?.url || "/contact"} className="footer-outline-btn">
                            {data?.cta_button?.label || "Contact Us"}
                        </Link>
                    </div>

                    <div className="footer-column info-col">
                        <div className="info-item">
                            <h4 className="footer-label">Our Office</h4>
                            <p className="footer-text">
                                {(data?.address || "101 Cassidy Drive Suite C\nDover, DE 19901").split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < (data?.address || "").split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                        <div className="info-item links-item">
                            <h4 className="footer-label">Quick Links</h4>
                            <div className="footer-nav">
                                {quickLinks.map((link, idx) => (
                                    <Link key={idx} href={link.url}>{link.label}</Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="footer-column contact-col">
                        <div className="info-item">
                            <h4 className="footer-label">Contact</h4>
                            <p className="footer-text">
                                {data?.phone || "(302) 342–0027"}<br />
                                {data?.email || "office@woodrockengineering.com"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright-text">
                        {data?.copyright || `© Copyright ${new Date().getFullYear()} Woodrock Engineering. All Right Reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

