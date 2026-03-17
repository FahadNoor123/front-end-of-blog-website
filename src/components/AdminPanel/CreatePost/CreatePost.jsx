"use client";

import { useState } from "react";
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

const CreateBlog = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    slug:"",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    tags: [],
    blogImage: [], // ✅ Initialize as an empty array

    status: "Publish",
    scheduleDate: new Date(),
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const [imagePreviews, setImagePreviews] = useState([]);
 // ✅ Handle input changes, including converting "tags" from string to array
 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: name === "tags" || name === "keywords" ? value.split(",").map(tag => tag.trim()) : value, 
  }));
};
const ItalicIcon = () => <IconItalic size={16} stroke={3.5} />;


  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Store actual files in formData
   // Append multiple images
  
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

    // Append new images to existing state
    Promise.all(newPreviews).then((newImages) => {
      setImagePreviews((prevImages) => [...prevImages, ...newImages]);
    });
  };


  const handlePreview = () => {
    if (!editor) return;
    let formattedContent = editor.getHTML();

    // Replace empty <p></p> tags with <br>
    formattedContent = formattedContent.replace(/<p><\/p>/g, "<br>");
    const postData = {
      title: formData.title || "Untitled Blog",
      category: formData.category || "No category",
      content: String(formattedContent || ""), // ✅ Ensure it's a string
      images: imagePreviews || [],
      tags: Array.isArray(formData.tags) ? formData.tags : [], // ✅ Ensure tags are always an array

    };
  
    // Store post data in localStorage
    localStorage.setItem("previewPost", JSON.stringify(postData));
  
    // Open a new tab for preview
    window.open("/preview", "_blank");
  };



// Lightweight table spinner for loading state
  const TableLoader = () => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
     
    </div>
  );





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
    content: "",
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, content: editor.getHTML() });
    },
  });

  // Handle input change
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  console.log("Blog images:", formData.blogImage);

  // Handle form submission
  const handleSubmit = async (e, status = null) => {
    e.preventDefault();
    const formDataObject = new FormData(); // ✅ Use a different name to avoid conflicts
    
    // Determine the status to use
    const finalStatus = status || formData.status;
  
    // ✅ Append text fields
    formDataObject.append("title", formData.title);
    formDataObject.append("category", formData.category);
    formDataObject.append("slug", formData.slug);
    formDataObject.append("metaTitle", formData.metaTitle);
    console.log("this is slug",formData.slug)
    formData.tags.forEach((tag) => {
      formDataObject.append("tags", tag);
    });
    formData.keywords.forEach((keyword) => {
      formDataObject.append("keywords[]", keyword);
    });
    formDataObject.append("metaDescription", formData.metaDescription);
    formDataObject.append("content", editor.getHTML());
    formDataObject.append("postStatus", finalStatus); // Changed from "status" to "postStatus"
    if (finalStatus === "Scheduled") {
      formDataObject.append("scheduledAt", formData.scheduleDate.toISOString()); // Convert date to string
    }
    
    // ✅ Ensure `blogImage` is an array before appending files
    // ✅ Ensure `blogImage` is an array before appending files
if (Array.isArray(formData.blogImage)) {
  formData.blogImage.forEach((file) => {
    if (file instanceof File) {
      formDataObject.append("blogImage", file); // ✅ Use formDataObject, not formData
    }
  });
}


    try {
      const response = await fetch("/api/v1/blog/createblog", {
        method: "POST",
        body: formDataObject,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Blog Created Successfully!");
        setFormData({ title: "", category: "", metaTitle: "", metaDescription: "", keywords: "", tags: "",slug: "", status: "Publish" });
        editor.commands.setContent("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Left Side: Blog Form & Editor */}
      <div className="w-2/3 p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
        <form id="blog-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className="w-full border p-2 rounded" required />

          {/* Category */}
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="News">News</option>
          </select>

          <div className="mb-4">
  <label className="block font-semibold mb-2">Blog Content Section</label>
  {editor ? (
    <RichTextEditor editor={editor} variant="subtle">
      
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic icon={ItalicIcon}/>
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
        {editor.getText().length === 0 && (
          <p className="absolute top-3 left-4 text-gray-400 pointer-events-none">
            Start writing your content here...
          </p>
        )}
        <RichTextEditor.Content className="min-h-[320px] resize-y overflow-auto whitespace-pre-wrap" />
      </div>
      
    </RichTextEditor>
  ) : (
     <TableLoader />
  )}
</div>

          {/* SEO Fields */}
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Wite Blog Slug here..." className="w-full border p-2 rounded" required />

          <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="Meta Title" className="w-full border p-2 rounded" required />
          <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} placeholder="Meta Description" className="w-full border p-2 rounded" required />
          <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Keywords (comma separated)" className="w-full border p-2 rounded" required />

          {/* Tags Input */}
          <label className="block font-semibold mb-2">SEO Tags</label>
          <input
            type="text"
            name="tags"
            value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags || ""}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full border p-2 rounded"
            required
          />
        </form>
      </div>

      {/* Right Side: Extra Features */}
      <div className="w-1/3 p-4 ml-4 bg-white rounded-lg shadow">
        {/* Top Right Buttons - Fixed Layout for Long Text */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, 'Published')}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold truncate"
          >
            Publish
          </button>
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, 'Draft')}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded text-sm font-semibold truncate"
          >
            Save Draft
          </button>
        </div>

        {/* Feature Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Feature Images</label>
          <input
            name="blogImage"
            type="file"
            accept="image/*"
            multiple
            className="w-full border p-2 rounded"
            onChange={handleImageChange}
          />
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {imagePreviews.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-32 h-32 object-cover border rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Publish Settings */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Publish Settings</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            className="w-full border p-2 rounded"
          >
            <option value="Published">Publish Now</option>
            <option value="Draft">Save as Draft</option>
            <option value="Scheduled">Schedule Post</option>
          </select>

          {/* Show Date Picker if "Scheduled" is selected */}
          {formData.status === "Scheduled" && (
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
       
        {/* Preview & Submit Buttons */}
        <div className="flex gap-2">
          <button 
            type="button"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button 
            type="submit"
            form="blog-form"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold">{formData.title || "Untitled Blog"}</h2>
            <p className="text-gray-500">{formData.category || "No category selected"}</p>
            <div dangerouslySetInnerHTML={{ __html: formData.content }} className="border p-4 mt-4 bg-gray-50 rounded" />
            
            {/* Preview Images */}
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imagePreviews.map((image, index) => (
                  <img key={index} src={image} className="w-32 h-32 object-cover border rounded" />
                ))}
              </div>
            )}
            
            <button className="bg-gray-500 text-white px-4 py-2 rounded mt-4" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
