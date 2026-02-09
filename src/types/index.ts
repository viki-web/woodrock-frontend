export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    image?: { url: string };
    content?: any;
}

export interface BlogPageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
}

export interface Location {
    title: string;
    address: string;
}

export interface ContactPageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
    locations: Location[];
}

export interface LinkItem {
    id: number;
    label: string;
    url: string;
}

export interface Stat {
    id: number;
    value: string;
    description: string;
}

export interface ProcessStep {
    id: number;
    step_number: string;
    label: string;
    description?: string;
    position: "low" | "high";
}

export interface Testimonial {
    id: number;
    quote: string;
    author_name: string;
    author_role: string;
    author_avatar?: {
        data: {
            attributes: {
                url: string;
            };
        };
    };
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
}

export interface HeaderData {
    logo?: {
        url: string;
    };
    navigation: LinkItem[];
}

export interface FooterData {
    logo?: {
        url: string;
    };
    cta_title: string;
    cta_button: LinkItem;
    address: string;
    phone: string;
    email: string;
    quick_links: LinkItem[];
    copyright: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    image?: { url: string };
    content?: any;
}

export interface PortfolioPageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
    stats: Stat[];
    methodology_title: string;
    methodology_description: string;
    methodology_image?: { url: string };
    methodology_steps: ProcessStep[];
}

export interface Service {
    documentId: string;
    title: string;
    slug: string;
    short_description: string;
    image?: { url: string };
    banner_image?: { url: string };
    content?: any;
    category: "Engineering" | "Design" | "Market";
    background_color?: string;
}

export interface DesignPageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
    testimonials: Testimonial[];
}

export interface MarketPageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
    show_licensing_map: boolean;
}

export interface AboutPageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
    mission_title: string;
    mission_description: string;
    mission_image?: { url: string };
}

export interface ExpertisePageData {
    hero_title: string;
    hero_description: string;
    hero_image?: { url: string };
    process_title: string;
    process_description: string;
    process_steps: ProcessStep[];
    faqs: Faq[];
}

export interface HomepageData {
    hero_title: string;
    hero_description: string;
    hero_video?: { url: string };
    stats_title: string;
    stats_description: string;
    how_it_works_title: string;
    how_it_works_description: string;
    projects_heading: string;
    map_title: string;
    map_subtitle: string;
    marquee_line_1: string;
    marquee_line_2: string;
    marquee_line_3: string;
    cta_title: string;
    cta_subtitle: string;
    cta_button_text: string;
    cta_background?: { url: string };
    stats: Stat[];
    we_do_items: LinkItem[];
    how_it_works_steps: ProcessStep[];
    projects_list: LinkItem[];
    testimonials: Testimonial[];
    faqs: Faq[];
}
