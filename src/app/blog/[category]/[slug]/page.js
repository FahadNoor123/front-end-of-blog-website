import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { fetchBlogBySlug } from "../../../utils/fetchBlogs";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import RelatedBlogs from "../../../../components/Blog/RelatedBlog";
import remarkGfm from "remark-gfm"; // Enables tables, strikethrough, task lists, etc.
import Head from "next/head";

export default async function BlogDetails({ params }) {
  const blog = await fetchBlogBySlug(params.slug);
  const category = blog.category; // Get category from the blog

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Blog not found</h1>
          <p className="text-gray-500 mb-6">The blog you are looking for does not exist.</p>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format date in a more readable way
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate read time
  const readTime = Math.ceil(blog.content.split(" ").length / 200);
  
  // Extract categories/tags if they exist (assuming they might be in the blog object)
  const categories = blog.categories || blog.tags || [];
  
  // Author info (assuming it might exist in the blog object)
  const author = blog.author || "Admin";
  const authorImage = blog.authorImage || "/default-avatar.png";
  
  const images = blog.blogImage || [];
  const secondImage = images.length > 1 ? images[1] : null;
  const lastImage = images.length > 0 ? images[images.length - 1] : null;
  
  // 🟢 Append images naturally in Markdown format
  let formattedContent = blog.content;
  
  // ✅ Insert second image at a meaningful position
  if (secondImage) {
    let paragraphs = formattedContent.split(/\n\s*\n/); // Split on actual paragraph breaks
    console.log("Formatted Content:", paragraphs);

    if (paragraphs.length > 1) {
      const insertPosition = Math.floor(paragraphs.length / 2);
      paragraphs.splice(insertPosition, 0, `![middle-image](${secondImage})`);
      formattedContent = paragraphs.join("\n\n");
    } else {
      // If only one paragraph, insert after first full stop
      formattedContent = formattedContent.replace(
        /\.(\s|$)/, 
        `.\n\n![middle-image](${secondImage})\n\n`
      );
    }
  }
  
  // ✅ Append last image at the end (if available)
  if (lastImage) {
    formattedContent += `\n\n![last-image](${lastImage})\n\n`;
  }
  
  console.log("Formatted Content:");



  return (
    <>
    {/* SEO Meta Tags */}
    <Head>
    <title>{blog.title} | My Blog</title>
    <meta name="description" content={blog.excerpt || blog.content.slice(0, 150)} />
    <meta property="og:title" content={blog.title} />
    <meta property="og:description" content={blog.excerpt || blog.content.slice(0, 150)} />
    <meta property="og:image" content={blog.blogImage?.[0] || "/default.jpg"} />
    <meta property="og:url" content={`https://yourdomain.com/blog/${blog.slug}`} />
    <link rel="canonical" href={`https://yourdomain.com/blog/${blog.slug}`} />
  </Head>
    <div className="min-h-screen bg-gray-50 pb-8 sm:pb-16">
      {/* Fancy Header with Full-width Image */}
      <div className="w-full h-56 sm:h-64 md:h-96 relative">
        <Image 
          src={blog.blogImage[0]} 
          alt={blog.title}
          fill
       
          className="object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft size={16} /> Back to blogs
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 line-clamp-2">{blog.title}</h1>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        {/* Meta info card */}
      

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-8">
          {/* If there are multiple images, display them in a grid */}
          {blog.blogImage && blog.blogImage.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
             {blog.blogImage.length > 0 && (
              <div className="rounded-lg overflow-hidden aspect-[16/9] col-span-1 sm:col-span-2">
                <Image 
                  src={blog.blogImage[0]}  // Only render the first image
                  alt={`${blog.title} first image`}
                  width={500} 
                  height={300} 
                  className="w-full h-full object-cover"
                  loading="eager" // Standard HTML

                />
              </div>
            )}

            </div>
          )}

          {/* Blog content with responsive typography */}
          <article className="prose prose-sm sm:prose lg:prose-lg max-w-none p-4 sm:p-6 md:p-8">
          <ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, children, ...props }) => {
      // Check if paragraph contains an image
      if (
        node.children &&
        node.children.some(child => 
          child.tagName === "img" || 
          (child.properties && child.properties.src)
        )
      ) {
        // Return just the children without wrapping in a <p> tag
        return <>{children}</>;
      }
      // Normal paragraph without images
      return (
        <p className="mb-4 sm:mb-6 text-gray-700 leading-relaxed text-base sm:text-lg" {...props}>
          {children}
        </p>
      );
    },
    img: ({ node, ...props }) => {
      console.log("Rendered Image URL             :", props.src);
     
      return (
        <div className="my-6 flex justify-center">
          <Image
            src={props.src}
            alt={blog.title}
            width={1200} 
            height={600}  
            className="rounded-lg max-w-full h-auto"
            loading="lazy"

          />
        </div>
      );
    },
    // Add other component overrides here...
    h2: ({ node, ...props }) => <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-gray-800" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3 text-gray-800" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-gray-700" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 sm:pl-6 mb-4 sm:mb-6 text-gray-700" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1 sm:mb-2" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="pl-3 sm:pl-4 border-l-4 border-gray-200 italic my-4 sm:my-6 text-gray-600" {...props} />,
    table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-gray-200" {...props} /></div>,
    pre: ({ node, ...props }) => <pre className="bg-gray-50 rounded-lg p-3 sm:p-4 overflow-x-auto text-sm my-4 sm:my-6" {...props} />
  }}
>
  {formattedContent }
</ReactMarkdown>
           

          </article>

          {/* Tags section at bottom if there are more tags */}
          {categories.length > 2 && (
            <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 border-t border-gray-100 pt-3 sm:pt-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Topics</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((category, index) => (
                  <span key={index} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Posts Section */}
          <RelatedBlogs category={category} currentSlug={blog.slug} prefetch={false} />
        
      </div>
    </div>
    </>
  );
}