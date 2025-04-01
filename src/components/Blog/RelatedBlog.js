import { fetchRelatedBlogs } from "../../app/utils/fetchBlogs";
import Image from "next/image";
import Link from "next/link";

export default async function RelatedBlogs({ category, currentSlug }) {
  
  if (!category) return null; // Ensure category is provided

  const blogs = await fetchRelatedBlogs(category, currentSlug); // Fetch related blogs

  if (!blogs || blogs.length === 0) return null; // Don't render if no related blogs

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">You might also like</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        
        {blogs.map((blog) => (
          <div key={blog.id} className="group cursor-pointer">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Blog Image (if available) */}
              {blog.blogImage?.length > 0 && (
        <Image 
          src={blog.blogImage[0]} // Ensure it's an array before accessing
          alt={blog.title}
          
       
          width={500} // Decreased width
          height={300}
          className="w-full h-auto sm:h-48 object-cover"
          loading="lazy"
        />
      )}
            </div>
            <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`} className="block">
  <h3 className="mt-2 text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600">
    {blog.title}
  </h3>
</Link>


          </div>
        ))}
      </div>
    </div>
  );
}
