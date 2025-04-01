import { fetchBlogsData } from "./utils/fetchBlogs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/NormalUsers/ADs/Banner.js";
import DOMPurify from "dompurify";
import Footer from "../components/NormalUsers/Footer/Footer"; // Import Footer component

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const category = searchParams?.category || ""; // Get category from URL


  const { news, categories } = await fetchBlogsData(); 
  console.log("These are Categories", categories)
  
  
  // ✅ Fetch categories properly
  const limit = 6; // Number of blogs per page
  const totalPages = Math.ceil(news.latest.length / limit);
  const featuredNews = news.featured;
  const startIndex = (page - 1) * limit;
const paginatedNews = news.latest.slice(startIndex, startIndex + limit);

  console.log("Featured News:", featuredNews);

  return (
    <div className="min-h-screen bg-gray-50">
          {/* Categories Navigation */}
          <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center overflow-x-auto whitespace-nowrap">
            <span className="mr-6 font-semibold">Categories:</span>
            <Link
              href={`/blog`}
              className={`mr-6 hover:text-blue-300 transition duration-200 ${!category ? "text-blue-400 font-bold" : ""}`}
            >
              All
            </Link>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog/${cat.slug}`}
                  className={`mr-6 hover:text-blue-300 transition duration-200 ${
                    category === cat.slug ? "text-blue-400 font-bold" : ""
                  }`}
                >
                  {cat.name}
                </Link>
              ))
            ) : (
              <span className="text-gray-400">No categories available</span>
            )}
          </div>
        </div>
      </div>

      {/* AD Area */}
      {/* <Banner/> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Featured News */}
        {featuredNews ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-300">
              Featured Story
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Featured Image */}
                {featuredNews.blogImage?.length > 0 && (
                  <div className="md:flex-shrink-0 md:w-1/2">
                    <Image
                      src={featuredNews.blogImage[0]}
                      alt={featuredNews.title}
                      width={500}
                      height={300}
                      className="h-auto w-full object-cover md:h-[300px]"
                      priority={true}
                    />
                  </div>
                )}

                {/* Featured Content */}
                <div className="p-6 md:w-1/2">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                    {featuredNews.category}
                  </div>
                  <Link
                    href={`/blog/${featuredNews.category.toLowerCase()}/${featuredNews.slug}`}
                    className="block mt-2 text-2xl font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {featuredNews.title}
                  </Link>
                  <div className="mt-3 text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: featuredNews.content.split(" ").slice(0, 20).join(" ") + "..." }} />
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <span>{new Date(featuredNews.publishedAt).toDateString()}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredNews.category.toLowerCase()}/${featuredNews.slug}`}
                    className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p className="text-gray-500">No featured news available</p>
        )}

        {/* Latest News */}
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-300">
            Latest News
          </h2>
          
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
                    href={`/blog/${article.category.toLowerCase()}/${article.slug}`}
                    className="block mt-2 text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {article.title}
                  </Link>

                  <div className="mt-2 text-gray-600 text-sm">
                    {/* Small Screens (Less Content) */}
                    <div className="block sm:hidden" dangerouslySetInnerHTML={{ __html: article.content.split(" ").slice(0, 5).join(" ") + "..." }} />

                    {/* Larger Screens (More Content) */}
                    <div className="hidden sm:block" dangerouslySetInnerHTML={{ __html: article.content.split(" ").slice(0, 20).join(" ") + "..." }} />

                    <Link href={`/blog/${article.slug}`} className="text-blue-600 hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          {page > 1 && (
            <Link href={`/?page=${page - 1}`} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/?page=${page + 1}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Next
            </Link>
          )}
        </div>

        </section>
      </main>
    </div>
  );
}
