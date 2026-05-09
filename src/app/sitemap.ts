import type { MetadataRoute } from 'next';
import propertiesData from '../../data/properties.json';
import blogData from '../../data/blog.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shineasiaestate.co';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/properties`,
      changeFrequency: 'daily',
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sell-your-property`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/destinations`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
  ];

  // Dynamic property routes
  const properties = propertiesData as Array<{ slug: string }>;
  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${baseUrl}/property/${property.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  // Dynamic blog routes
  const blogs = blogData as Array<{ slug: string }>;
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
