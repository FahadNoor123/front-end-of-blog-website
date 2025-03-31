import { fetchBlogsData } from "../../utils/fetchBlogs";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = params; // Extract category from URL
  const page = parseInt(searchParams?.page) || 1;
  const { news } = await fetchBlogsData();

  // Filter blogs by category
  const filteredNews = news.latest.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  const limit = 6; // Number of blogs per page
  const totalPages = Math.ceil(filteredNews.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + limit);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Title */}
      <div className="bg-gray-800 text-white py-4 text-center">
        <h2 className="text-2xl font-bold">
          Latest News in {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {paginatedNews.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {paginatedNews.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={article.blogImage[0]}
                  alt={article.title}
                  width={500}
                  height={300}
                  className="w-full h-auto sm:h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {article.category}
                  </span>
                  <Link
                    href={`/blog/${article.category}/${article.slug}`}
                    className="block mt-2 text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {article.title}
                  </Link>

                  <div className="mt-2 text-gray-600 text-sm">
                    <div className="block sm:hidden" dangerouslySetInnerHTML={{ __html: article.content.split(" ").slice(0, 5).join(" ") + "..." }} />
                    <div className="hidden sm:block" dangerouslySetInnerHTML={{ __html: article.content.split(" ").slice(0, 20).join(" ") + "..." }} />
                    <Link href={`/blog/${article.slug}`} className="text-blue-600 hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No news available in this category.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-4">
            {page > 1 && (
              <Link href={`?page=${page - 1}`} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link href={`?page=${page + 1}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Next
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
