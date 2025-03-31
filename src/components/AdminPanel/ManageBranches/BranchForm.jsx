import React, { useState, useEffect } from "react";
import ManagerSearch from "./ManagerSearch";

const BranchForm = ({ isOpen, closeModal, editingBranch, refreshBranches }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: { address: "", city: "" }, // Added city
    contactNumber: "",
    managerId: ""
  });

  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    if (editingBranch) {
      setFormData({
        name: editingBranch.name,
        location: {
          address: editingBranch.location.address,
          city: editingBranch.location.city // Fix
        },
        contactNumber: editingBranch.contactNumber,
        managerId: editingBranch.managerId?._id || ""
      });

      setSelectedManager(editingBranch.managerId
        ? {
            _id: editingBranch.managerId._id,
            name: editingBranch.managerId.username,
            contactNumber: editingBranch.managerId.contactNumber
          }
        : null);
    }
  }, [editingBranch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name.split(".")[1]]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData); // Debugging line
    try {
      const method = editingBranch ? "PUT" : "POST";
      const url = editingBranch
        ? `/api/v1/admin/education_board_branch/update_branch/${editingBranch._id}`
        : "/api/v1/admin/education_board_branch/add_branch";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      refreshBranches();
      closeModal();
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{editingBranch ? "Edit Branch" : "Add Branch"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Branch Name" required className="w-full p-2 border rounded-md" />

          <ManagerSearch selectedManager={selectedManager} setSelectedManager={(manager) => {
            setSelectedManager(manager);
            setFormData((prev) => ({ ...prev, managerId: manager?._id || "" }));
          }} />

          <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} placeholder="Address" required className="w-full p-2 border rounded-md" />

          <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} placeholder="City" required className="w-full p-2 border rounded-md" />

          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required className="w-full p-2 border rounded-md" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
            {editingBranch ? "Update Branch" : "Create Branch"}
          </button>
        </form>
        <button onClick={closeModal} className="mt-4 text-red-500">Cancel</button>
      </div>
    </div>
  );
};

export default BranchForm;
