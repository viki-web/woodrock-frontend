import { HomepageData, HeaderData, FooterData, Service, ExpertisePageData, DesignPageData, MarketPageData, AboutPageData, Project, PortfolioPageData, ContactPageData, BlogPost, BlogPageData } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

async function fetchData(endpoint: string) {
    const url = `${baseUrl}/api/${endpoint}`;
    console.log("Fetching from:", url);

    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`API Error Body for ${endpoint}:`, errorBody);
            return null;
        }

        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

export const getHomepageData = async (): Promise<HomepageData | null> => {
    return fetchData("homepage?populate=*");
};

export const getHeaderData = async (): Promise<HeaderData | null> => {
    return fetchData("header?populate=*");
};

export const getFooterData = async (): Promise<FooterData | null> => {
    return fetchData("footer?populate=*");
};

export const getExpertisePageData = async (): Promise<ExpertisePageData | null> => {
    return fetchData("expertise-page?populate=*");
};

export const getDesignPageData = async (): Promise<DesignPageData | null> => {
    return fetchData("design-page?populate=*");
};

export const getMarketPageData = async (): Promise<MarketPageData | null> => {
    return fetchData("market-page?populate=*");
};

export const getAboutPageData = async (): Promise<AboutPageData | null> => {
    return fetchData("about-page?populate=*");
};

export const getPortfolioPageData = async (): Promise<PortfolioPageData | null> => {
    return fetchData("portfolio-page?populate=*");
};

export const getContactPageData = async (): Promise<ContactPageData | null> => {
    return fetchData("contact-page?populate=*");
};

export const getBlogPageData = async (): Promise<BlogPageData | null> => {
    return fetchData("blog-page?populate=*");
};

export const getBlogPosts = async (): Promise<BlogPost[] | null> => {
    return fetchData("blog-posts?populate=*&sort=date:desc");
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const data = await fetchData(`blog-posts?filters[slug][$eq]=${slug}&populate=*`);
    return data && data.length > 0 ? data[0] : null;
};

export const submitContactForm = async (data: any): Promise<any> => {
    const response = await fetch(`${baseUrl}/api/contact-messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
    });
    if (!response.ok) {
        throw new Error("Failed to submit contact form");
    }
    return response.json();
};

export const getProjects = async (): Promise<Project[] | null> => {
    return fetchData("projects?populate=*");
};

export const getServices = async (category?: string): Promise<Service[] | null> => {
    const query = category ? `services?filters[category][$eq]=${category}&populate=*` : "services?populate=*";
    return fetchData(query);
};

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
    const data = await fetchData(`services?filters[slug][$eq]=${slug}&populate=*`);
    return data && data.length > 0 ? data[0] : null;
};
