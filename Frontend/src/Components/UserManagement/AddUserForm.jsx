import { useState } from "react";
import { ChevronUp } from "lucide-react";
import backicon from "../../assets/Images/backicon.svg";
import useUserForm from "../../Hooks/UseUserForm";
import ImageUploader from "../../Common/ImageUploader";
import FormField from "../../Common/FormField";
import FeatureChips from "../../Common/FeatureChips";

export default function AddUserForm({ onUserAdded, onCancel }) {
  const [userDetailsOpen, setUserDetailsOpen] = useState(true);
  const [roleDetailsOpen, setRoleDetailsOpen] = useState(false);
  
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleFileChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleSubmit
  } = useUserForm({
    name: "",
    phone: "",
    email: "",
    location: "",
    designation: "",
    note: "",
    role: "",
    features: []
  }, onUserAdded);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit();
    } catch (err) {
    }
  };

  return (
    <div className="rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onCancel} className="p-2">
          <img src={backicon} alt="Back" className="h-7 w-7" />
        </button>
        <h2 className="text-lg font-semibold">Add New User</h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={onFormSubmit} className="space-y-4">
        <div className="shadow-sm border border-gray-200 rounded-xl">
          <button
            type="button"
            onClick={() => setUserDetailsOpen(!userDetailsOpen)}
            className="flex justify-between items-center w-full p-3 font-medium text-left"
          >
            User Details
            <ChevronUp size={16} className={`transition-transform ${userDetailsOpen ? "rotate-180" : ""}`} />
          </button>
          
          {userDetailsOpen && (
            <div className="p-4 space-y-4 text-sm">
              <FormField label="Name" >
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter User Name" className="w-full focus:outline-none border border-gray-200 rounded-lg p-2"  />
              </FormField>

              <FormField label="Mobile Number" >
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter Mobile Number" className="w-full focus:outline-none border border-gray-200 rounded-lg p-2"  />
              </FormField>

              <FormField label="Profile Image">
                <ImageUploader image={formData.avatar} onImageChange={handleFileChange} />
              </FormField>

              <FormField label="Email Address" >
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email Address" className="w-full focus:outline-none border border-gray-200 rounded-lg p-2"  />
              </FormField>

              <FormField label="Address" >
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter Address" className="w-full focus:outline-none border border-gray-200 rounded-lg p-2"  />
              </FormField>

              <FormField label="Designation" >
                <select name="designation" value={formData.designation} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2" >
                  <option value="">Choose Designation</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                  <option value="Intern">Intern</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                </select>
              </FormField>

              <FormField label="Note">
                <textarea name="note" value={formData.note} onChange={handleInputChange} placeholder="Add Note" rows={4} className="w-full border border-gray-200 rounded-lg p-2" />
              </FormField>
            </div>
          )}
        </div>

        <div className="shadow-sm border border-gray-200 rounded-xl">
          <button
            type="button"
            onClick={() => setRoleDetailsOpen(!roleDetailsOpen)}
            className="flex justify-between items-center w-full p-3 font-medium text-left"
          >
            Role Details
            <ChevronUp size={16} className={`transition-transform ${roleDetailsOpen ? "rotate-180" : ""}`} />
          </button>
          
          {roleDetailsOpen && (
            <div className="p-4 space-y-4 text-sm">
              <FormField label="Role" >
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2" >
                  <option value="">Choose Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </FormField>

              <FormField label="Feature Name">
                <select onChange={(e) => handleFeatureAdd(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2">
                  <option value="">Choose Feature</option>
                  <option value="Room Booking Services">Room Booking Services</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Reports">Reports</option>
                </select>
                <FeatureChips features={formData.features} onRemove={handleFeatureRemove} />
              </FormField>
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onCancel} className="flex-1 text-sm border border-yellow-400 rounded-lg py-2 text-yellow-600 hover:bg-yellow-50">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 text-sm bg-yellow-500 text-white rounded-lg py-2 hover:bg-yellow-600 disabled:opacity-50">
            {loading ? "Creating..." : "Publish this Service"}
          </button>
        </div>
      </form>
    </div>
  );
}