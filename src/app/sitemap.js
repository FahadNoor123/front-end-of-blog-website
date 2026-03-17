import { fetchBlogsData } from "../app/utils/fetchBlogs";

export default async function sitemap() {
  const baseUrl = 'https://warnnews.com'; // Replace with your actual domain

  // Get all blogs
  const { news } = await fetchBlogsData();
  const blogs = news.latest || [];

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic blog pages
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.category}/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Category pages
  const categories = [...new Set(blogs.map(blog => blog.category))];
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/blog/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...blogPages];
}