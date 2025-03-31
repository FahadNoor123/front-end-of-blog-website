"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, CheckCircle, Save, Upload, Eye, Heart, MessageSquare, Share2, Bookmark, X } from "lucide-react";
import { useRouter } from "next/navigation";

const PreviewPost = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // desktop, mobile, tablet
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  
  useEffect(() => {
    const storedPost = localStorage.getItem("previewPost");
    if (storedPost) {
      try {
        const parsedPost = JSON.parse(storedPost);
        // Add default tags if none exist
        if (!parsedPost.tags || !Array.isArray(parsedPost.tags) || parsedPost.tags.length === 0) {
          parsedPost.tags = ["Blog", "Article"];
        }
        setPost(parsedPost);
      } catch (e) {
        console.error("Error parsing post data:", e);
      }
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handlePublish = async () => {
    if (!post) return;
    
    setLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with your actual API endpoint
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      
      if (!response.ok) {
        throw new Error("Failed to publish post");
      }
      
      // Clear preview from localStorage after successful publish
      localStorage.removeItem("previewPost");
      setSuccess(true);
      
      // Redirect to posts list after success message displays
      setTimeout(() => {
        router.push("/dashboard/posts");
      }, 2000);
      
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Eye size={36} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">No Preview Available</h1>
          <p className="text-gray-500 mb-6">Return to the editor to create your blog post</p>
          <button 
            onClick={handleBack} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Editor
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Post Published Successfully!</h1>
          <p className="text-gray-500 mb-4">Your blog post is now live and available to your readers.</p>
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div className="bg-green-500 h-1 rounded-full animate-progress"></div>
          </div>
          <p className="text-gray-500 mt-2 text-sm">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate estimated read time
  const calculateReadTime = () => {
    if (!post.content) return "2 min";
    // Strip HTML tags and count words
    const text = post.content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    // Average reading speed: 200 words per minute
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime} min`;
  };

  // Preview container classes based on selected view mode
  const getPreviewContainerClasses = () => {
    switch(viewMode) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-2xl mx-auto";
      default:
        return "max-w-4xl mx-auto";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Preview Header with Actions */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-3 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBack} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-xl text-gray-900">Post Preview</h2>
          </div>
          
          {/* Device View Toggles */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode("mobile")}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === "mobile" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"}`}
            >
              Mobile
            </button>
            <button 
              onClick={() => setViewMode("tablet")}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === "tablet" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"}`}
            >
              Tablet
            </button>
            <button 
              onClick={() => setViewMode("desktop")}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === "desktop" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"}`}
            >
              Desktop
            </button>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Edit Draft</span>
            </button>
            <button 
              onClick={handlePublish}
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span className="hidden sm:inline">Publish Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`${getPreviewContainerClasses()} mt-8 transition-all duration-300`}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Featured Image */}
          {post.images && post.images.length > 0 && (
            <div className="relative group">
              <img
                src={post.images[0]} 
                className="w-full h-96 object-cover cursor-pointer"
                alt="Blog Featured Image"
                onClick={() => openImageModal(post.images[0])}
              />
              {/* Overlay with action buttons on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  className="bg-white p-2 rounded-full shadow-lg mx-2"
                  onClick={() => openImageModal(post.images[0])}
                >
                  <Eye size={20} className="text-gray-700" />
                </button>
              </div>
              {/* Category Badge */}
              <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                {post.category}
              </span>
            </div>
          )}

          <div className="p-8">
            {/* Blog Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">{post.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center mt-4 text-gray-600">
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{formatDate()}</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{calculateReadTime()} read</span>
              </div>
            </div>
            
            {/* Author Section */}
            <div className="flex items-center mt-6 pb-6 border-b border-gray-200">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3">
                {/* Placeholder for author avatar */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Author Name</p>
                <p className="text-sm text-gray-600">Content Creator</p>
              </div>
            </div>
            
            {/* Blog Content */}
            <article className="prose prose-lg max-w-none mt-6">
  <div
    dangerouslySetInnerHTML={{ __html: post.content || "<p>No content available</p>" }}
    className="text-gray-800 leading-relaxed break-words space-y-4" // ✅ Add spacing between paragraphs
  />
</article>



            
            {/* Social Sharing & Engagement */}
            <div className="flex justify-between items-center mt-8 py-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                  <Heart size={18} />
                  <span className="text-sm">24</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                  <MessageSquare size={18} />
                  <span className="text-sm">12</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:text-blue-500">
                  <Share2 size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:text-yellow-500">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
            
            {/* Additional Images Gallery */}
            {post.images && post.images.length > 1 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.images.slice(1).map((image, index) => (
                    <div 
                      key={index} 
                      className="relative group overflow-hidden rounded-lg shadow-sm cursor-pointer"
                      onClick={() => openImageModal(image)}
                    >
                      <img
                        src={image}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={`Image ${index + 1}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <span className="text-white p-3 text-sm">View image</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
{Array.isArray(post.tags) && post.tags.length > 0 && (
  <div className="mt-8">
    <h4 className="text-sm font-semibold text-gray-500 mb-2">TAGS</h4>
    <div className="flex flex-wrap gap-2">
      {post.tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-sm text-gray-700"
        >
          #{tag}
        </span>
      ))}
    </div>
  </div>
)}

            
            {/* Related Posts Teaser */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">You might also like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <p className="text-sm text-blue-600 mb-1">{post.category}</p>
                  <h4 className="font-medium text-gray-900">Another interesting article about this topic</h4>
                  <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <p className="text-sm text-blue-600 mb-1">{post.category}</p>
                  <h4 className="font-medium text-gray-900">One more related article you might enjoy</h4>
                  <p className="text-sm text-gray-500 mt-1">Sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview Footer */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow text-center">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Eye size={18} />
            <p>Preview Mode - <span className="font-medium">Not visible to readers yet</span></p>
          </div>
          <button 
            onClick={handlePublish}
            disabled={loading}
            className={`mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Publishing...' : 'Publish Now'}
          </button>
        </div>
      </div>
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl w-full max-h-screen">
            <button 
              className="absolute top-0 right-0 m-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              onClick={closeImageModal}
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              className="max-w-full max-h-[90vh] mx-auto object-contain" 
              alt="Enlarged preview" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      
      {/* Add this to your global CSS for the animation */}
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PreviewPost;