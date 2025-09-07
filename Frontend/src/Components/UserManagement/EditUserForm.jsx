import { useRef } from "react";
import { X, ChevronLeft } from "lucide-react";
import JoditEditor from "jodit-react";
import useUserForm from "../../Hooks/UseUserForm";
import FormField from "../../Common/FormField";
import FeatureChips from "../../Common/FeatureChips";
import ImageUploader from "../../Common/ImageUploader";

export default function EditUserForm({ user, onUserUpdated, onBack }) {
  const editor = useRef(null);
  
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
    name: user.name,
    phone: user.phone,
    email: user.email,
    location: user.location,
    designation: Array.isArray(user.designation) ? user.designation[0] : user.designation,
    note: user.note || "",
    avatar: user.avatar,
    role: user.role || "Administrator",
    features: Array.isArray(user.features) ? user.features : [],
    status: user.status || "Active"
  }, onUserUpdated);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(user._id);
    } catch (err) {
      
    }
  };

  
  const getImageUrl = (avatarPath) => {
    if (!avatarPath) return "/default-avatar.png";
    if (avatarPath.startsWith('http') || avatarPath.startsWith('data:') || avatarPath.startsWith('blob:')) {
      return avatarPath;
    }
    if (avatarPath.startsWith('/uploads/')) {
      return `http://localhost:5000${avatarPath}`;
    }
    if (!avatarPath.includes('/') && !avatarPath.includes('\\')) {
      return `http://localhost:5000/uploads/${avatarPath}`;
    }
    return avatarPath;
  };

  
  const handleImageError = (e) => {
    e.target.src = "/default-avatar.png";
    e.target.onerror = null;
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-50 hover:bg-yellow-100 text-yellow-500">
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-lg font-semibold">Edit User Details</h2>
      </div>

      <form onSubmit={onFormSubmit}>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-semibold mb-4">User Details</h3>

          <div className="space-y-4">
            <FormField label="Name" >
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border focus:outline-none border-gray-200 rounded-lg p-2 text-sm"  />
            </FormField>

            <FormField label="Mobile Number" >
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm"  />
            </FormField>

            <FormField label="Profile Image">
              <div className="relative w-24 h-24 mt-1">
                {formData.avatar ? (
                  <>
                    <img src={getImageUrl(formData.avatar)} alt="Profile" className="w-24 h-24 rounded-lg object-cover border" onError={handleImageError} />
                    <button type="button" className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100" onClick={() => handleInputChange({ target: { name: 'avatar', value: '' } })}>
                      <X size={14} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <ImageUploader onImageChange={handleFileChange} />
                )}
              </div>
            </FormField>

            <FormField label="Email Address" >
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm"  />
            </FormField>

            <FormField label="Address" >
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm"  />
            </FormField>

            <FormField label="Designation" >
              <select name="designation" value={formData.designation} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm" >
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Intern">Intern</option>
              </select>
            </FormField>

            <FormField label="Note">
              <JoditEditor
                ref={editor}
                value={formData.note}
                config={{ readonly: false, placeholder: "Add Note", height: 150, toolbarSticky: false }}
                onBlur={(newContent) => handleInputChange({ target: { name: 'note', value: newContent } })}
              />
            </FormField>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Role Details</h3>

          <FormField label="Role" >
            <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm" >
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </FormField>

          <FormField label="Status" >
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm" >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </FormField>

          <FormField label="Feature Name">
            <select onChange={(e) => handleFeatureAdd(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm">
              <option value="">Choose Feature</option>
              <option value="Room Booking">Room Booking</option>
              <option value="Utilities">Utilities</option>
              <option value="Reports">Reports</option>
              <option value="Room Booking Services">Room Booking Services</option>
            </select>
            <FeatureChips features={formData.features} onRemove={handleFeatureRemove} />
          </FormField>
        </div>

        <div className="flex gap-3 pt-4 w-full">
          <button type="button" onClick={onBack} className="flex-1 px-3 py-1 cursor-pointer border border-yellow-500 rounded-lg text-yellow-600 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 px-3 py-1 cursor-pointer bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 disabled:opacity-50">
            {loading ? "Saving..." : "Save the Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}