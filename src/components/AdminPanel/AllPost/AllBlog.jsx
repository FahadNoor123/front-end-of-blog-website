'use client';
import Cookies from "js-cookie";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEye, FaEdit, FaPlay, FaFileAlt, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import { FcCalendar  } from "react-icons/fc";

const AllBlog = () => {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [statusModal, setStatusModal] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(new Date());

  // Update scheduledDate when opening modal for a specific blog
  const openScheduleModal = (blogSlug) => {
    const blog = blogs?.blogs?.find(b => b.slug === blogSlug);
    if (blog?.scheduledAt) {
      setScheduledDate(new Date(blog.scheduledAt));
    } else {
      setScheduledDate(new Date());
    }
    setStatusModal(blogSlug);
  };

  // Lightweight table spinner for loading state
  const TableLoader = () => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
     
    </div>
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = Cookies.get("myAccessToken");
      const res = await fetch('/api/v1/blog/admin/getblogs', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      console.log("admin blog", data)
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update blog status
  const handleStatusUpdate = async (slug, newStatus) => {
    const token = Cookies.get("myAccessToken");
    const updates = {
      postStatus: newStatus,
      ...(newStatus === 'Scheduled' && { scheduledAt: scheduledDate.toISOString() })
    };

    try {
      const res = await fetch(`/api/v1/blog/admin/updatestatus/${slug}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      // Refresh blogs list
      fetchBlogs();
      setStatusModal(null);
      alert(`Blog ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };
  
  const handleDelete = async (slug) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const token = Cookies.get("myAccessToken");
    try {
      const res = await fetch(`/api/v1/blog/admin/deleteblog/${slug}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete blog');

      // Remove deleted blog from UI
      setBlogs((prev) => ({
        ...prev,
        blogs: prev.blogs.filter((blog) => blog.slug !== slug),
      }));

      alert('Blog deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Something went wrong while deleting.');
    }
  };

  // Filter & search logic
  const filteredBlogs = (Array.isArray(blogs?.blogs) ? blogs.blogs : []).filter((blog) => {
    return (
      (filter === 'all' ||
        (filter === 'published' && blog.postStatus === 'Published') ||
        (filter === 'draft' && blog.postStatus === 'Draft') ||
        (filter === 'scheduled' && blog.postStatus === 'Scheduled')) &&
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
          <option value="draft">Draft</option>
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
              <th className="text-left px-4 py-2">Scheduled Date</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <TableLoader />
                </td>
              </tr>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog,index) => (
                <tr key={blog._id} className="border-b">
                      <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{blog.title}</td>
                  <td className="px-4 py-2">{blog.author?.name || blog.author?.email || 'Unknown'}</td>
                  <td className="px-4 py-2">
                    {blog.postStatus === 'Published' ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Published</span>
                    ) : blog.postStatus === 'Scheduled' ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        new Date(blog.scheduledAt) <= new Date() 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {new Date(blog.scheduledAt) <= new Date() ? 'Overdue' : 'Scheduled'}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {blog.publishedAt ? (
                      <div>
                        <div>{new Date(blog.publishedAt).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs">{new Date(blog.publishedAt).toLocaleTimeString()}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not published</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {blog.scheduledAt ? (
                      <div>
                        <div className={new Date(blog.scheduledAt) <= new Date() ? 'text-red-600 font-medium' : ''}>
                          {new Date(blog.scheduledAt).toLocaleDateString()}
                        </div>
                        <div className={`text-xs ${new Date(blog.scheduledAt) <= new Date() ? 'text-red-500' : 'text-gray-500'}`}>
                          {new Date(blog.scheduledAt).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not scheduled</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1 items-center">
                      <Link
                        href={`/blog/${blog.category}/${blog.slug}`}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors"
                        title="View Blog"
                      >
                        <FaEye size={16} />
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${blog.slug}`}
                        className="text-yellow-600 hover:text-yellow-800 p-2 rounded transition-colors"
                        title="Edit Blog"
                      >
                        <FaEdit size={16} />
                      </Link>
                      
                      {/* Status-based actions */}
                      {blog.postStatus === 'Draft' && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-800 p-2 rounded transition-colors"
                            onClick={() => handleStatusUpdate(blog.slug, 'Published')}
                            title="Publish Now"
                          >
                            <FaPlay size={16} />
                          </button>
                          <button
                            className="text-purple-600 hover:text-purple-800 p-2 rounded transition-colors"
                            onClick={() => openScheduleModal(blog.slug)}
                            title="Schedule Post"
                          >
                            <FcCalendar size={16} />
                          </button>
                        </>
                      )}
                      
                      {blog.postStatus === 'Scheduled' && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-800 p-2 rounded transition-colors"
                            onClick={() => handleStatusUpdate(blog.slug, 'Published')}
                            title="Publish Now"
                          >
                            <FaPlay size={16} />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-800 p-2 rounded transition-colors"
                            onClick={() => handleStatusUpdate(blog.slug, 'Draft')}
                            title="Move to Draft"
                          >
                            <FaFileAlt size={16} />
                          </button>
                          <button
                            className="text-purple-600 hover:text-purple-800 p-2 rounded transition-colors"
                            onClick={() => openScheduleModal(blog.slug)}
                            title="Reschedule"
                          >
                            <FcCalendar size={16} />
                          </button>
                        </>
                      )}
                      
                      {blog.postStatus === 'Published' && (
                        <button
                          className="text-gray-600 hover:text-gray-800 p-2 rounded transition-colors"
                          onClick={() => handleStatusUpdate(blog.slug, 'Draft')}
                          title="Unpublish"
                        >
                          <FaFileAlt size={16} />
                        </button>
                      )}
                      
                      <button
                        className="text-red-600 hover:text-red-800 p-2 rounded transition-colors"
                        onClick={() => handleDelete(blog.slug)}
                        title="Delete Blog"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-600">No blogs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Schedule Modal */}
      {statusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">
              {blogs?.blogs?.find(b => b.slug === statusModal)?.scheduledAt ? 'Reschedule Post' : 'Schedule Post'}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                value={scheduledDate.toISOString().slice(0, 16)}
                onChange={(e) => setScheduledDate(new Date(e.target.value))}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => handleStatusUpdate(statusModal, 'Scheduled')}
                disabled={scheduledDate <= new Date()}
              >
                {blogs?.blogs?.find(b => b.slug === statusModal)?.scheduledAt ? 'Reschedule' : 'Schedule'}
              </button>
              <button
                className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                onClick={() => setStatusModal(null)}
              >
                Cancel
              </button>
            </div>
            {scheduledDate <= new Date() && (
              <p className="text-red-500 text-sm mt-2">Please select a future date and time.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlog;
