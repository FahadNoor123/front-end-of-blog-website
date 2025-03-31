"use client";
import Cookies from "js-cookie";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconBold, IconItalic } from '@tabler/icons-react';
import { useParams } from "next/navigation";

const EditBlog = () => {
    const params = useParams();
    const slug = params?.slug;  // Use 'slug' instead of 'id'

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    tags: [],
    blogImage: [], // Store existing and new images
    status: "Publish",
    scheduleDate: new Date(),
    content: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return; // Ensure slug exists
     
      try {
        setIsLoading(true);
        document.cookie.split(";").forEach(cookie => console.log("Browser Cookie:", cookie));

        const token= Cookies.get("myAccessToken");
        

        const response = await fetch(`/api/v1/blog/admin/getblog/${slug}`, {
            method: "GET",
            credentials: "include", // 🔥 Ensures cookies are sent automatically
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // ✅ Adds Bearer token

                
            },
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch blog post");
        }
    
  
        const blogPost = await response.json(); // Parse response JSON
        console.log(blogPost); // Debugging output
  
        // ✅ Update form state safely
        setFormData({
          title: blogPost?.title || "",
          category: blogPost?.category || "",
          slug: blogPost?.slug || "",
          metaTitle: blogPost?.metaTitle || "",
          metaDescription: blogPost?.metaDescription || "",
          keywords: blogPost?.keywords || [],
          tags: blogPost?.tags || [],
          status: blogPost?.status || "Publish",
          scheduleDate: blogPost?.scheduleDate ? new Date(blogPost?.scheduleDate) : new Date(),
          content: blogPost?.content || "",
        });
  
        // ✅ Set existing images
        setExistingImages(blogPost?.blogImage || []);
      
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setIsLoading(false); // ✅ Ensure loading state resets
      }
    };
  
    fetchBlogPost();
  }, [slug]); 
  
  // Rich Text Editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, content: editor.getHTML() });
    },
  });
  useEffect(() => {
    if (editor && formData.content !== undefined) {
      const currentText = editor.getText().trim();
      if (currentText === '' || currentText === '<p></p>') {
        editor.commands.setContent(formData.content);
      }
    }
  }, [editor, formData.content]); // Ensure it runs when content changes
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "tags" || name === "keywords" ? value.split(",").map(tag => tag.trim()) : value, 
    }));
  };

  // Handle image changes
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Store actual files in formData
    setFormData((prevData) => ({
      ...prevData,
      blogImage: [...(prevData.blogImage || []), ...files],
    }));

    
    const newPreviews = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    // Append new images to existing previews
    Promise.all(newPreviews).then((newImages) => {
      setImagePreviews((prevImages) => [...prevImages, ...newImages]);
    });
  };

  // Remove existing image
  const removeExistingImage = (indexToRemove) => {
    setExistingImages(existingImages.filter((_, index) => index !== indexToRemove));
  };

  // Remove preview image
  const removePreviewImage = (indexToRemove) => {
    const updatedFiles = formData.blogImage.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);

    setFormData((prevData) => ({
      ...prevData,
      blogImage: updatedFiles,
    }));
    setImagePreviews(updatedPreviews);
  };

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = new FormData();

    // Append text fields
    formDataObject.append("title", formData.title);
    formDataObject.append("category", formData.category);
    formDataObject.append("slug", formData.slug);
    formDataObject.append("metaTitle", formData.metaTitle);
    
    formData.tags.forEach((tag) => {
      formDataObject.append("tags", tag);
    });
    formData.keywords.forEach((keyword) => {
      formDataObject.append("keywords[]", keyword);
    });
    
    formDataObject.append("metaDescription", formData.metaDescription);
    formDataObject.append("content", editor.getHTML());
    formDataObject.append("status", formData.status);
    formDataObject.append("scheduleDate", formData.scheduleDate.toISOString());

    // Append existing images to retain
    // Append existing images as files
    // Function to fetch and convert an image URL to a File object
async function urlToFile(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }
if (existingImages.length > 0) {
    const imagePromises = existingImages.map(async (url, index) => {
      const file = await urlToFile(url, `existingImage${index}.jpg`);
      formDataObject.append("blogImage", file);
    });
  
    await Promise.all(imagePromises); // Wait for all images to be processed
  }
    // Append new images
    if (Array.isArray(formData.blogImage)) {
      formData.blogImage.forEach((file) => {
        if (file instanceof File) {
          formDataObject.append("blogImage", file);
        }
      });
    }
    const token= Cookies.get("myAccessToken");

    try {
      const response = await fetch(`/api/v1/blog/admin/editblog/${slug}`, {
        method: "PUT", // Use PUT for updates
        headers: {
            "Authorization": `Bearer ${token}`, // ✅ Adds Bearer token

            
        },
        body: formDataObject,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Blog Updated Successfully!");
        // router.push('/blogs'); // Redirect to blogs list
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Conditional rendering for loading state
  if (isLoading) {
    return <div>Loading blog post...</div>;
  }

  return (
    <div className="flex max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Left Side: Blog Form & Editor */}
      <div className="w-2/3 p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Title */}
          <label className="block font-semibold mb-2">Blog Title

          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Blog Title" 
            className="w-full border p-2 rounded" 
            required 
          />
</label>

          {/* Category */}
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="w-full border p-2 rounded" 
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="News">News</option>
          </select>

          {/* Content Editor */}
          <div className="mb-4">
            {editor ? (
              <RichTextEditor editor={editor} variant="subtle">
                {/* Editor toolbar and content (same as CreateBlog) */}
                {/* ... (copy the same RichTextEditor configuration)
                 */}
                     <RichTextEditor.Toolbar sticky stickyOffset={60}>
                         <RichTextEditor.ControlsGroup>
                           <RichTextEditor.Bold />
                           <RichTextEditor.Italic/>
                           <RichTextEditor.Underline />
                           <RichTextEditor.Strikethrough />
                           <RichTextEditor.ClearFormatting />
                           <RichTextEditor.Highlight />
                           <RichTextEditor.Code />
                         </RichTextEditor.ControlsGroup>
                 
                         <RichTextEditor.ControlsGroup>
                           <RichTextEditor.H1 />
                           <RichTextEditor.H2 />
                           <RichTextEditor.H3 />
                           <RichTextEditor.H4 />
                         </RichTextEditor.ControlsGroup>
                 
                         <RichTextEditor.ControlsGroup>
                           <RichTextEditor.Blockquote />
                           <RichTextEditor.Hr />
                           <RichTextEditor.BulletList />
                           <RichTextEditor.OrderedList />
                           <RichTextEditor.Subscript />
                           <RichTextEditor.Superscript />
                         </RichTextEditor.ControlsGroup>
                 
                         <RichTextEditor.ControlsGroup>
                           <RichTextEditor.Link />
                           <RichTextEditor.Unlink />
                         </RichTextEditor.ControlsGroup>
                 
                         <RichTextEditor.ControlsGroup>
                           <RichTextEditor.AlignLeft />
                           <RichTextEditor.AlignCenter />
                           <RichTextEditor.AlignJustify />
                           <RichTextEditor.AlignRight />
                         </RichTextEditor.ControlsGroup>
                 
                         <RichTextEditor.ControlsGroup>
                           <RichTextEditor.Undo />
                           <RichTextEditor.Redo />
                         </RichTextEditor.ControlsGroup>
                       </RichTextEditor.Toolbar>
                     
                         {/* Placeholder handling */}
                         <div className="relative">
        {editor && editor.getText()?.length === 0 && (
          <p className="absolute top-3 left-4 text-gray-400 pointer-events-none">
            Start writing your content here...
          </p>
        )}
        <RichTextEditor.Content 
          className="min-h-[320px] resize-y overflow-auto whitespace-pre-wrap"  
          value={editor.getHTML()} 
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>
                       
              </RichTextEditor>
            ) : (
              <p>Loading editor...</p>
            )}
          </div>

          {/* SEO Fields */}
          <input 
            type="text" 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
            placeholder="Blog Slug" 
            className="w-full border p-2 rounded" 
            required 
          />
 
          <input 
            type="text" 
            name="metaTitle" 
            value={formData.metaTitle} 
            onChange={handleChange} 
            placeholder="Meta Title" 
            className="w-full border p-2 rounded" 
            required 
          />

          <textarea 
            name="metaDescription" 
            value={formData.metaDescription} 
            onChange={handleChange} 
            placeholder="Meta Description" 
            className="w-full border p-2 rounded" 
            required 
          />

          <input 
            type="text" 
            name="keywords" 
            value={Array.isArray(formData.keywords) ? formData.keywords.join(", ") : ""} 
            onChange={handleChange} 
            placeholder="Keywords (comma separated)" 
            className="w-full border p-2 rounded" 
            required 
          />

          {/* Submit Button */}
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Update Blog
          </button>
        </form>
      </div>

      {/* Right Side: Extra Features */}
      <div className="w-1/3 p-4 ml-4 bg-white rounded-lg shadow">
        {/* Feature Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Feature Images
            <input
              name="blogImage"
              type="file"
              accept="image/*"
              multiple
              className="w-full border p-2 rounded"
              onChange={handleImageChange}
            />
          </label>
          {existingImages.length > 0 && (
  <div className="mt-3 grid grid-cols-3 gap-2">
    {existingImages.map((image, index) => (
      <div key={index} className="relative">
<Image
          src={image}
          alt={`Existing blog ${index}`}
          width={128} // Fixed width (should match w-32)
          height={128} // Fixed height (should match h-32)
          className="object-cover rounded border"
          name="blogImage"
          loading="lazy"

        />        <button
          type="button"
          onClick={() => removeExistingImage(index)}
          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
          onChange={handleImageChange}

        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}


          {/* New Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {imagePreviews.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-cover border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removePreviewImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags Input */}
        <label className="block font-semibold mb-2">SEO Tags</label>
        <input
          type="text"
          name="tags"
          value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""} 
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded mb-4"
          required
        />

        {/* Publish Settings */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Publish Settings</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            className="w-full border p-2 rounded"
          >
            <option value="Publish">Publish</option>
            <option value="Draft">Save as Draft</option>
            <option value="Schedule">Schedule</option>
          </select>

          {/* Show Date Picker if "Schedule" is selected */}
          {formData.status === "Schedule" && (
            <div className="mt-3">
              <label className="block font-semibold mb-2">Select Date & Time</label>
              <DatePicker 
                selected={formData.scheduleDate} 
                onChange={(date) => setFormData({ ...formData, scheduleDate: date })} 
                showTimeSelect 
                dateFormat="Pp" 
                className="w-full border p-2 rounded" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;