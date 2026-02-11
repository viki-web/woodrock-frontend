"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomepageData } from "@/types";
import { getMediaUrl } from "@/lib/api";

const ProjectsSection = ({ data }: { data: HomepageData }) => {
    return (
        <section className="projects-section">
            <div className="projects-container">
                <div className="projects-content">
                    <span className="section-label reveal-up">OUR PROJECTS</span>
                    <h2 className="projects-heading reveal-up" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                        {data.projects_heading}
                    </h2>

                    <div className="project-list reveal-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                        {data.projects_list.map((project) => (
                            <Link href={project.url} key={project.id} className="project-item">
                                {project.label}
                            </Link>
                        ))}
                    </div>

                    <div className="current-project-info reveal-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                        <h3 className="current-project-title">
                            {data.projects_list[0]?.label || "Featured Project"}
                        </h3>
                        <p className="current-project-type">Commercial Structural Support</p>
                    </div>
                </div>
                <div className="projects-image reveal-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                    <Image
                        src={getMediaUrl(data.projects_image?.url, "/assets/images/project_barn.jpg")}
                        alt="Featured Project"
                        width={800}
                        height={600}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
