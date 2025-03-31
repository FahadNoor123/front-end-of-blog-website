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
import { IconBold, IconItalic } from '@tabler/icons-react';
import "react-datepicker/dist/react-datepicker.css";

const EditBlog = ({ existingBlog }) => {
  const [formData, setFormData] = useState({
    title: existingBlog?.title || "",
    category: existingBlog?.category || "",
    slug: existingBlog?.slug || "",
    metaTitle: existingBlog?.metaTitle || "",
    metaDescription: existingBlog?.metaDescription || "",
    keywords: existingBlog?.keywords || [],
    tags: existingBlog?.tags || [],
    blogImage: existingBlog?.blogImage || [],
    status: existingBlog?.status || "Publish",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "tags" || name === "keywords" ? value.split(",").map(tag => tag.trim()) : value,
    }));
  };

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
    content: existingBlog?.content || "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => formDataObject.append(key, item));
      } else {
        formDataObject.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`/api/v1/blog/edit/${existingBlog.id}`, {
        method: "PUT",
        body: formDataObject,
      });
      const result = await response.json();
      alert(response.ok ? "Blog Updated Successfully!" : result.message);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="w-2/3 p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className="w-full border p-2 rounded" required />
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="News">News</option>
          </select>
          {editor && <RichTextEditor editor={editor} variant="subtle" />}
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Blog Slug" className="w-full border p-2 rounded" required />
          <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="Meta Title" className="w-full border p-2 rounded" required />
          <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} placeholder="Meta Description" className="w-full border p-2 rounded" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
