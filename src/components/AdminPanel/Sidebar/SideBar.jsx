"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Menu, X, LayoutDashboard, Users, LogOut, 
  BookOpen, FileText, Folder, Tag, MessageCircle, 
  BarChart3, Settings, Image, Search, Bookmark, 
  Bell, Edit, ThumbsUp, Calendar, Clock, Globe, Mail, 
  HelpCircle, TrendingUp, Eye
} from "lucide-react";

export default function BlogSidebar({ role }) {
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState({}); // State to track expanded parent items
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery state

  // Sidebar items
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Create Post", path: "/admin/create-post", icon: Edit },
    { 
      name: "Content Management", 
      icon: Folder, 
      children: [
        { name: "All Posts", path: "/admin/all-blog", icon: FileText },
        { name: "Categories", path: "/admin/categories", icon: Folder },
        { name: "Tags", path: "/admin/tags", icon: Tag },
        { name: "Media Library", path: "/admin/media", icon: Image },
        { name: "Drafts", path: "/admin/drafts", icon: BookOpen },
        { name: "Featured Posts", path: "/admin/featured", icon: ThumbsUp },
        { name: "Scheduled Posts", path: "/admin/scheduled", icon: Calendar },
      ]
    },
    { 
      name: "Comments", 
      icon: MessageCircle, 
      children: [
        { name: "All Comments", path: "/admin/comments", icon: MessageCircle },
        { name: "Pending Approval", path: "/admin/comments/pending", icon: Clock },
        { name: "Reported Comments", path: "/admin/comments/reported", icon: Bell },
      ]
    },
    { 
      name: "User Management", 
      icon: Users, 
      roles: ["admin", "editor"],
      children: [
        { name: "Authors", path: "/admin/authors", icon: Edit },
        { name: "Subscribers", path: "/admin/subscribers", icon: Bookmark },
        { name: "Invite Users", path: "/admin/users/invite", icon: Mail },
      ]
    },
    { 
      name: "Analytics", 
      icon: BarChart3, 
      children: [
        { name: "Traffic Overview", path: "/admin/analytics/traffic", icon: TrendingUp },
        { name: "Post Performance", path: "/admin/analytics/posts", icon: Eye },
        { name: "Audience Insights", path: "/admin/analytics/audience", icon: Users },
        { name: "Search Terms", path: "/admin/analytics/search", icon: Search },
      ]
    },
    { 
      name: "Marketing", 
      icon: Globe, 
      roles: ["admin", "marketer"],
      children: [
        { name: "SEO Settings", path: "/admin/seo", icon: Search },
        { name: "Social Media", path: "/admin/social", icon: Globe },
        { name: "Newsletter", path: "/admin/newsletter", icon: Mail },
      ]
    },
    { name: "Settings", path: "/admin/settings", icon: Settings, roles: ["admin"] },
    { name: "Help & Support", path: "/admin/help", icon: HelpCircle },
  ];

  const toggleExpanded = (name) => {
    setExpanded(prevState => ({
      ...prevState,
      [name]: !prevState[name], // Toggle the expansion state for the clicked item
    }));
  };

  // Filter items based on search query
  const filteredItems = searchQuery 
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.children && item.children.some(child => 
          child.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      )
    : menuItems;

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isOpen ? "w-64" : "w-16"} transition-all duration-300 flex flex-col`}>
      {/* Toggle Button */}
      <button className="p-3 text-gray-300 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Search Bar */}
      {isOpen && (
        <div className="px-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
      )}

      {/* Sidebar Items */}
      <nav className="mt-2 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 px-2">
          {filteredItems.map(({ name, path, icon: Icon, roles, children }) => {
            // If there are roles and the current role is not in the allowed roles, return null
            if (roles && !roles.includes(role)) return null;

            return (
              <div key={name} className="mb-1">
                {/* If the item has children (sub-items), render the parent and its children */}
                {children ? (
                  <div>
                    {/* Parent item */}
                    <div 
                      className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => toggleExpanded(name)}
                    >
                      <Icon size={18} />
                      {isOpen && (
                        <div className="flex justify-between items-center w-full">
                          <span>{name}</span>
                          <span>{expanded[name] ? '−' : '+'}</span>
                        </div>
                      )}
                    </div>

                    {/* Render children if expanded */}
                    {isOpen && (
                      <div
                        className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${expanded[name] ? "max-h-96 mt-1" : "max-h-0"}`}
                      >
                        {children.map(({ name, path, icon: ChildIcon }) => (
                          <Link 
                            href={path} 
                            key={name} 
                            className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm ${pathname === path ? "bg-blue-600" : "hover:bg-gray-700"}`}
                          >
                            <ChildIcon size={16} />
                            <span>{name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // If no children, just render the single item
                  <Link 
                    href={path} 
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${pathname === path ? "bg-blue-600" : "hover:bg-gray-800"}`}
                  >
                    <Icon size={18} />
                    {isOpen && <span>{name}</span>}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto mb-4 px-4">
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-400 hover:bg-red-700 hover:text-white transition"
          onClick={() => console.log("Logging out...")}
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}