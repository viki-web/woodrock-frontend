"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { HomepageData } from "@/types";

const LicensingMapSection = ({ data }: { data: HomepageData }) => {
    const [activeState, setActiveState] = useState<{ id: string; name: string } | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [activeMarquees, setActiveMarquees] = useState([false, false, false]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    setAnimationStarted(true);

                    // Trigger marquee animations with staggered delays
                    [0, 1.5, 3].forEach((delay, index) => {
                        setTimeout(() => {
                            setActiveMarquees(prev => {
                                const next = [...prev];
                                next[index] = true;
                                return next;
                            });
                        }, delay * 1000);
                    });

                    // Reveal map after animation sequence
                    setTimeout(() => {
                        setAnimationComplete(true);
                    }, 5500);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [animationStarted]);

    useLayoutEffect(() => {
        if (!chartRef.current) return;

        let root = am5.Root.new(chartRef.current);

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "none",
                panY: "none",
                projection: am5map.geoAlbersUsa(),
                wheelY: "none"
            })
        );

        let polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_usaLow,
            })
        );

        const licensedStates = [
            "US-WA", "US-ID", "US-MT", "US-WY", "US-NV", "US-UT", "US-CO", "US-AZ",
            "US-NE", "US-KS", "US-OK", "US-TX", "US-MN", "US-IA", "US-MO", "US-WI",
            "US-MI", "US-IN", "US-OH", "US-KY", "US-TN", "US-GA", "US-FL", "US-SC",
            "US-NC", "US-VA", "US-PA", "US-NY", "US-VT", "US-ME", "US-MA", "US-CT",
            "US-NJ", "US-DE", "US-MD"
        ];

        const licensedFill = am5.color(0x1F1410);
        const unlicensedFill = am5.color(0xffffff);

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            interactive: true,
            stroke: am5.color(0x000000),
            strokeWidth: 0.5,
            templateField: "polygonSettings",
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0x4a3a33),
        });

        polygonSeries.mapPolygons.template.events.on("click", function (ev) {
            if (ev.target.dataItem?.dataContext) {
                const stateData = ev.target.dataItem.dataContext as any;
                if (licensedStates.includes(stateData.id)) {
                    setActiveState({ id: stateData.id, name: stateData.name });
                }
            }
        });

        // Initialize data - ensuring all states have a fill inside polygonSettings
        polygonSeries.data.setAll(am5geodata_usaLow.features.map(feature => {
            const id = feature.id as string;
            return {
                id: id,
                name: (feature.properties as any).name,
                polygonSettings: {
                    fill: licensedStates.includes(id) ? licensedFill : unlicensedFill
                }
            };
        }));

        if (root._logo) {
            root._logo.dispose();
        }

        return () => {
            root.dispose();
        };
    }, []);

    const marqueeLines = [
        data.marquee_line_1 || "LICENSED TO",
        data.marquee_line_2 || "BUILD ACROSS",
        data.marquee_line_3 || "THE UNITED STATES"
    ];

    return (
        <section className="licensing-map-section" ref={sectionRef}>
            <div className={`licensing-text-section ${animationComplete ? 'animation-complete' : ''}`}>
                {marqueeLines.map((text, index) => (
                    <div
                        key={index}
                        className={`marquee-wrapper reveal-side ${activeMarquees[index] ? 'active' : ''}`}
                        style={{ '--delay': `${index * 1.5}s` } as React.CSSProperties}
                    >
                        <div className="marquee-line">
                            <span className="marquee-text">{text}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="map-header">
                    <h2 className="map-title reveal-up">{data.map_title || "STATE LICENSING & AUTHORIZATIONS"}</h2>
                    <p className="map-subtitle reveal-up" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                        {data.map_subtitle || "Licensing varies by state. Explore where we're authorized to provide engineering services."}
                    </p>
                </div>
                <div className="map-container reveal-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                    <div id="map-svg-placeholder" className="map-svg-wrapper">
                        <div ref={chartRef} style={{ width: "100%", height: "650px" }}></div>
                    </div>

                    <div className="map-legend">
                        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span className="legend-color licensed" style={{ backgroundColor: '#1F1410', width: '20px', height: '20px', display: 'inline-block' }}></span>
                            <span className="legend-label">Licensed</span>
                        </div>
                        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className="legend-color unlicensed" style={{ backgroundColor: '#ffffff', border: '1px solid #000', width: '20px', height: '20px', display: 'inline-block' }}></span>
                            <span className="legend-label">Unlicensed</span>
                        </div>
                    </div>

                    {activeState && (
                        <div id="state-modal" className="state-modal" style={{ display: 'block' }}>
                            <div className="state-modal-content">
                                <span className="close-modal" onClick={() => setActiveState(null)}>×</span>
                                <h3 id="modal-state-name">{activeState.name}</h3>
                                <ul className="licensing-list">
                                    <li>Professional Engineer (PE / SE) license</li>
                                    <li>Certificate of Authorization (engineering firm registration)</li>
                                    <li>Structural Engineering license (if separate)</li>
                                    <li>Reciprocal or limited scope approval</li>
                                </ul>
                                <button className="view-all-btn">View All</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LicensingMapSection;
