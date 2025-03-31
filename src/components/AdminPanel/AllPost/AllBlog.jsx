'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


const AllBlog = () => {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
       

        const res = await fetch('/api/v1/blog/getblogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        console.log("admun blog",data)
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter & search logic
  const filteredBlogs = (Array.isArray(blogs?.latest) ? blogs.latest : []).filter((blog) => {
    return (
      (filter === 'all' ||
        (filter === 'published' && blog.isPublished) ||
        (filter === 'scheduled' && blog.scheduledDate && !blog.isPublished)) &&
      blog.title?.toLowerCase().includes(search.toLowerCase())
    );
  });
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Blog Management</h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          className="border px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Blogs</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
            <th className="text-left px-4 py-2">S.No</th>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Author</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Published Date</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading blogs...</td>
              </tr>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog,index) => (
                <tr key={blog._id} className="border-b">
                      <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{blog.title}</td>
                  <td className="px-4 py-2">{blog.author}</td>
                  <td className="px-4 py-2">
                    {blog.isPublished ? (
                      <span className="text-green-600 font-semibold">Published</span>
                    ) : (
                      <span className="text-orange-500 font-semibold">Scheduled</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <Link href={`/blog/${blog.slug}`} className="text-blue-600 hover:underline">View</Link>
                    <Link href={`/admin/blog/edit/${blog.slug}`} className="text-yellow-600 hover:underline">Edit</Link>
                    <button className="text-red-600 hover:underline" onClick={() => alert('Delete feature coming soon')}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">No blogs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlog;
