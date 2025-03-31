"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BranchForm from "./BranchForm.jsx";

const ManageBranches = () => {
  const [branches, setBranches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch("/api/v1/admin/education_board_branch/get_all_branches");
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const openModal = (branch) => {
    setEditingBranch(branch || null);
    setIsModalOpen(true);
  };

  const deleteBranch = async (branchId) => {
    // ✅ SWEETALERT2 CONFIRMATION
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/v1/admin/education_board_branch/delete/${branchId}`, {
            method: "DELETE",
          });

          setBranches((prev) => prev.filter((branch) => branch._id !== branchId));

          // ✅ SUCCESS ALERT
          Swal.fire("Deleted!", "The branch has been successfully deleted.", "success");
        } catch (error) {
          console.error("Error deleting branch:", error);

          // ❌ ERROR ALERT
          Swal.fire("Error", "Failed to delete the branch. Try again!", "error");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add Branch
      </button>

      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">S.no</th>
            <th className="border p-2">Branch Name</th>
            <th className="border p-2">Branch City</th>
            <th className="border p-2">Branch Address</th>
            <th className="border p-2">Contact No</th>
            <th className="border p-2">Manager Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={branch._id} className="border">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{branch.name}</td>
              <td className="p-2">{branch.location?.city || "N/A"}</td>
              <td className="p-2">{branch.location?.address || "N/A"}</td>
              <td className="p-2">{branch.contactNumber}</td>
              <td className="p-2">{branch.managerId?.username || "N/A"}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => openModal(branch)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBranch(branch._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <BranchForm
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          editingBranch={editingBranch}
          refreshBranches={fetchBranches}
        />
      )}
    </div>
  );
};

export default ManageBranches;
