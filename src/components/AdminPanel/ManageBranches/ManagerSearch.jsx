import React, { useState, useEffect } from "react";

const ManagerSearch = ({ setSelectedManager }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const delaySearch = setTimeout(fetchManagers, 300); // Delay API call
      return () => clearTimeout(delaySearch);
    } else {
      setManagers([]);
    }
  }, [searchQuery]);

  const fetchManagers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/admin/education_board_branch/get_manager_names?query=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setManagers(data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
    setIsLoading(false);
  };

  const selectManager = (manager) => {
    setSelectedManager(manager); // Store selected manager
    setSearchQuery(manager.username); // Display selected name in input
    setManagers([]); // Hide dropdown
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search manager by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      {isLoading && <p className="text-gray-500 text-sm">Searching...</p>}

      {managers.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-md max-h-40 overflow-y-auto shadow-md z-10">
          {managers.map((manager) => (
            <li
              key={manager._id}
              onClick={() => selectManager(manager)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {manager.username} ({manager.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagerSearch;
