// "use client";
"use client";

// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const dummyData = [
//   { name: "Jan", applications: 4000, approved: 2400 },
//   { name: "Feb", applications: 3000, approved: 1398 },
//   { name: "Mar", applications: 2000, approved: 9800 },
//   { name: "Apr", applications: 2780, approved: 3908 },
//   { name: "May", applications: 1890, approved: 4800 },
//   { name: "Jun", applications: 2300, approved: 3800 },
// ];

// const pieData = [
//   { name: "Approved", value: 400 },
//   { name: "Pending", value: 300 },
//   { name: "Rejected", value: 200 },
 
// ];

// const tableData = [
//   { id: 1, name: "John Doe", applicationType: "Degree Attestation", status: "Approved", date: "2023-10-01" },
//   { id: 2, name: "Jane Smith", applicationType: "Migration Certificate", status: "Pending", date: "2023-10-02" },
//   { id: 3, name: "Alice Johnson", applicationType: "Paper Scrutiny", status: "Rejected", date: "2023-10-03" },
// ];

// const COLORS = ["#4F46E5", "#82ca9d", "#FF8042"];
// const sindhBoards = ["Hyderabad", "Karachi", "Mirpurkhas", "Dadu", "Sakhar", "Ghotki", "Sukkur"];

// export default function AdminDashboard() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBoard, setSelectedBoard] = useState("");

//   const filteredData = tableData.filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-2xl font-bold text-[#4F46E5] text-center">Super Admin Dashboard</h1>
//       </header>

//       <div className="mb-6">
//         <label className="block text-lg font-medium text-gray-700 mb-2">Select Board</label>
//         <select
//           value={selectedBoard}
//           onChange={(e) => setSelectedBoard(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5]"
//         >
//           <option value="">Select a board</option>
//           {sindhBoards.map((board, index) => (
//             <option key={index} value={board}>{board}</option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5]"
//         />
//       </div>

//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-bold text-[#4F46E5] mb-4">Application Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <BarChart width={500} height={300} data={dummyData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="applications" fill="#4F46E5" />
//             <Bar dataKey="approved" fill="#82ca9d" />
//           </BarChart>
//           <PieChart width={500} height={300}>
//             <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value" label>
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>
//       </div>

//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-[#4F46E5] mb-4">Recent Applications</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">ID</th>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Application Type</th>
//                 <th className="py-2 px-4 border-b">Status</th>
//                 <th className="py-2 px-4 border-b">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row) => (
//                 <tr key={row.id}>
//                   <td className="py-2 px-4 border-b">{row.id}</td>
//                   <td className="py-2 px-4 border-b">{row.name}</td>
//                   <td className="py-2 px-4 border-b">{row.applicationType}</td>
//                   <td className="py-2 px-4 border-b">
//                     <span className={`px-2 py-1 rounded-full text-sm ${
//                       row.status === "Approved" ? "bg-green-100 text-green-700" :
//                       row.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
//                       "bg-red-100 text-red-700"
//                     }`}>{row.status}</span>
//                   </td>
//                   <td className="py-2 px-4 border-b">{row.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }






















"use client";
import { useState } from "react";
import { BarChart3, TrendingUp, Eye, ThumbsUp, Edit, MessageCircle, Clock } from "lucide-react";

export default function Dashboard() {
  // Dashboard stats
  const stats = [
    { title: "Total Posts", value: 128, icon: Edit, change: "+12%", color: "blue" },
    { title: "Total Views", value: "32.4K", icon: Eye, change: "+8%", color: "green" },
    { title: "Comments", value: 642, icon: MessageCircle, change: "+24%", color: "purple" },
    { title: "Avg. Time on Page", value: "3:42", icon: Clock, change: "+2%", color: "orange" },
  ];
  
  // Recent posts data
  const recentPosts = [
    { id: 1, title: "10 Tips for Better Blog Writing", views: 1240, likes: 87, comments: 32, published: "2 days ago" },
    { id: 2, title: "How to Grow Your Blog Traffic", views: 980, likes: 63, comments: 24, published: "4 days ago" },
    { id: 3, title: "SEO Strategies for 2025", views: 1540, likes: 112, comments: 48, published: "1 week ago" },
    { id: 4, title: "Content Creation Tools for Bloggers", views: 756, likes: 42, comments: 18, published: "1 week ago" },
  ];
  
  // Traffic source data for the chart
  const trafficSources = [
    { source: "Direct", value: 35 },
    { source: "Search", value: 40 },
    { source: "Social", value: 15 },
    { source: "Referral", value: 10 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <span className={`text-sm text-${stat.color}-500 mt-1 inline-block`}>
                  {stat.change} from last month
                </span>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon size={24} className={`text-${stat.color}-500`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4">Post Title</th>
                    <th className="text-center pb-4"><Eye size={16} className="inline" /></th>
                    <th className="text-center pb-4"><ThumbsUp size={16} className="inline" /></th>
                    <th className="text-center pb-4"><MessageCircle size={16} className="inline" /></th>
                    <th className="text-right pb-4">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 font-medium">{post.title}</td>
                      <td className="py-4 text-center text-gray-500">{post.views}</td>
                      <td className="py-4 text-center text-gray-500">{post.likes}</td>
                      <td className="py-4 text-center text-gray-500">{post.comments}</td>
                      <td className="py-4 text-right text-gray-500">{post.published}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-500 hover:text-blue-700 font-medium">
                View All Posts →
              </button>
            </div>
          </div>
        </div>
        
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Traffic Sources</h2>
          </div>
          <div className="p-6">
            {trafficSources.map((source, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{source.source}</span>
                  <span>{source.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-blue-${500 - index * 100} h-2 rounded-full`} 
                    style={{ width: `${source.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-6 text-center">
              <button className="text-blue-500 hover:text-blue-700 font-medium">
                View Detailed Analytics →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
