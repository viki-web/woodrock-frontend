import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://woodrockengineering.com';
    const baseUrl = rawBaseUrl.replace(/\/+$/, "");

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
