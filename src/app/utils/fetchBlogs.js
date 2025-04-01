// utils/fetchBlogs.js

export async function fetchBlogsData(category = "", page = 1, limit = 10) {
  try {
    const categoryParam = category ? `&category=${encodeURIComponent(category)}` : "";

    const res = await fetch(`https://backend-of-blog-website.vercel.app/api/v1/blog/getblogs?page=${page}&limit=${limit}${categoryParam}`, {
      cache: "no-store", // Prevent caching for fresh data
    });
    const data = await res.json();
    const uniqueCategories = [...new Set(data?.latest?.map(blog => blog.category))].map(category => ({
      id: category,
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"), // Convert to slug format
    }));
    
// Extract featured blog (assuming only one featured blog is needed)
const featuredBlog = data?.latest?.find(blog => blog.isFeatured) || null;
console.log("Image URL:", featuredBlog.blogImage?.[1]);
process.stdout.writ("Theses are unique categories",uniqueCategories)

    return {
      news: {
          featured: featuredBlog, // ✅ Extracted featured blog
        latest: data?.latest || [],
        totalPages: data?.totalPages || 1,  // Add total pages for frontend navigation

      },
      categories: uniqueCategories || [], // ✅ Fix: Use uniqueCategories
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      news: { featured: null, latest: [], totalPages: 1 },
      categories: [],
    };
  }
}



// ✅ Fetch a specific blog by its slug
export async function fetchBlogBySlug(slug) {
try {
  const res = await fetch(`https://backend-of-blog-website.vercel.app/api/v1/blog/getblog/${slug}`, {
    cache: "no-store", // Ensures fresh data
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch Error:", res.status, errorText);
    throw new Error(`Failed to fetch blog: ${res.status}`);
  }

  return await res.json(); // Return the fetched blog data
} catch (error) {
  console.error("Error fetching blog by slug:", error);
  return null;
}
}

//
export async function fetchRelatedBlogs(category, currentSlug) {
const res = await fetch(`https://backend-of-blog-website.vercel.app/api/v1/blog/related?category=${category}&slug=${currentSlug}`);
const blogs = await res.json();

// Exclude the current blog from related blogs
return blogs.filter(blog => blog.slug !== currentSlug);
}
