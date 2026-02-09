"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderData } from "@/types";

const Header = ({ data }: { data?: HeaderData | null }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    const logoSrc = data?.logo?.url
        ? (data.logo.url.startsWith('http') ? data.logo.url : `${baseUrl}${data.logo.url}`)
        : "/assets/images/logo.png";

    const navItems = data?.navigation || [
        { label: "Engineering", url: "/expertise" },
        { label: "Design", url: "/design" },
        { label: "Markets", url: "/marketers" },
        { label: "Portfolio", url: "/portfolio" },
        { label: "About", url: "/about" },
        { label: "Blog", url: "/blog" },
        { label: "Contact", url: "/contact" }
    ];

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        if (isNavOpen) {
            document.body.classList.add("nav-open");
        } else {
            document.body.classList.remove("nav-open");
        }
    }, [isNavOpen]);

    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname]);

    return (
        <header className="site-header">
            <div className="container">
                <div className="logo">
                    <Link href="/">
                        <Image
                            src={logoSrc}
                            alt="WoodRock Engineering Logo"
                            width={200}
                            height={50}
                            priority
                        />
                    </Link>
                </div>
                <button
                    className={`mobile-toggle ${isNavOpen ? "active" : ""}`}
                    onClick={toggleNav}
                    aria-label="Toggle Navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav className={`main-nav ${isNavOpen ? "active" : ""}`}>
                    <ul>
                        {navItems.map((item, idx) => (
                            <li key={idx}>
                                <Link href={item.url} className={pathname === item.url ? "active" : ""}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

