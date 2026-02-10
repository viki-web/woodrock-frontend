import { MetadataRoute } from 'next';
import { getServices, getBlogPosts } from '@/lib/api';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://woodrockengineering.com';

    const services = await getServices();
    const blogPosts = await getBlogPosts();

    const serviceUrls = (services || []).map((service) => ({
        url: `${baseUrl}/expertise/${service.slug}`,
        lastModified: new Date(),
    }));

    const blogUrls = (blogPosts || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
    }));

    const staticUrls = [
        '',
        '/expertise',
        '/design',
        '/marketers',
        '/portfolio',
        '/about',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    return [...staticUrls, ...serviceUrls, ...blogUrls];
}
