"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Function to get token from cookies
const getCookie = (name) => {
  if (typeof document === "undefined") return null; // Avoid SSR issues

  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [queries, setQueries] = useState([]); // Store user's queries
  const [showAll, setShowAll] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Edit Mode
  const [editedUser, setEditedUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie("myAccessToken"); // Get token

      if (!token) {
        console.error("No token found, user might not be authenticated.");
        return;
      }

      try {
        const res = await fetch("/api/v1/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
      
        setUser(data.user);
        setEditedUser(data.user); // Initialize editedUser with user data
      
        
        // Fetch full query details
        if (data.user.queries.length > 0) {
          const queryRes = await fetch(`/api/v1/queries?ids=${data.user.queries.join(",")}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!queryRes.ok) throw new Error("Failed to fetch queries.");

          const queryData = await queryRes.json();
          console.log("Fetched Queries:", queryData); // Debugging
          setQueries(queryData.queries); // Store queries
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);










  // Handle Input Change for Editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
// Save Edited Data
const handleSave = async () => {
  const token = getCookie("myAccessToken");
  try {
    const res = await fetch("/api/v1/users/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    });

    if (!res.ok) throw new Error("Failed to update profile");

    const updatedUser = await res.json();
    setUser(updatedUser.user);
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};











  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  const displayedQueries = showAll ? queries : queries.slice(0, 2);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex flex-col items-center text-center">
        <Image
          src={user.profileImage || "/default-avatar.png"}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300"
        />
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
            className="mt-2 text-center font-semibold text-xl border px-2 py-1 rounded-md"
          />
        ) : (
          <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
          
        )}
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="text-center text-gray-500 border px-2 py-1 rounded-md"
          />
        ) : (
          <p className="text-gray-500">{user.email}</p>
        )}
      </div>
{/* Editable User Info */}
<div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
        <p className="text-gray-800 font-semibold">
          📞 Phone:{" "}
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedUser.phone || ""}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded-md"
            />
          ) : (
            <span className="text-gray-600">{user.phone || "N/A"}</span>
          )}
        </p>
        <p className="text-gray-800 font-semibold">
          🆔 CNIC:{" "}
          {isEditing ? (
            <input
              type="text"
              name="cnic"
              value={editedUser.cnic || ""}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded-md"
            />
          ) : (
            <span className="text-gray-600">{user.cnic || "N/A"}</span>
          )}
        </p>
        <p className="text-gray-800 font-semibold">
          🏠 Address:{" "}
          {isEditing ? (
            <input
              type="text"
              name="currentAddress"
              value={editedUser.currentAddress || ""}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded-md w-full"
            />
          ) : (
            <span className="text-gray-600">{user.currentAddress || "N/A"}</span>
          )}
        </p>




        <p className="text-gray-800 font-semibold">
        🔗 Education Board Branch:{" "}
          {isEditing ? (
            <input
              type="text"
              name="branch"
              value={editedUser.branch}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded-md"
            />
          ) : (
            <span className="text-gray-600">{user.branch}</span>
          )}
        </p>
      </div>

      
      <div>


      {queries.length > 0 ? (
        <ul className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 space-y-4">
               <h3 className="text-2xl font-bold text-blue-700 mb-4">Submitted Queries  {queries.length}</h3>

          {displayedQueries.map((query, index) => (
            <li
              key={query._id}
              className="border-b last:border-b-0 py-4 px-4 rounded-md transition duration-300 hover:bg-blue-50 flex items-start gap-x-4"
            >
              <span className="text-blue-600 font-bold">{index + 1}.</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{query.title}</p>
                <p className="text-md text-gray-700">{query.description}</p>
                <p
                  className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
                    query.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : query.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {query.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        
                /* ✅ Updated No Query Submitted Message */
            <div className="text-center text-gray-500 mt-6">
            <p className="text-xl font-semibold">No Queries Submitted</p>
            <p className="text-sm">You haven't submitted any queries yet. Once you do, they will appear here.</p>
          </div>
      )}

      {/* Show More / Show Less Button */}
      {queries.length > 3 && (
        <button
          className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>

      {/* Edit & Save Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 px-6 py-2 rounded-lg">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-green-500 px-6 py-2 rounded-lg">
            Edit Profile
          </button>
        )}
      </div>

      
    </div>
  );
}
