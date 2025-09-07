import { useState, useRef } from "react";
import { Copy, Pencil, X } from "lucide-react";
import JoditEditor from "jodit-react";
import { usersAPI } from "../../Services/api";
import useUserForm from "../../Hooks/UseUserForm";
import FormField from "../../Common/FormField";
import FeatureChips from "../../Common/FeatureChips";
import ImageUploader from "../../Common/ImageUploader";

export default function UserDetails({ user, onUserUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [copied, setCopied] = useState(false);
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
    role: user.role,
    features: Array.isArray(user.features) ? user.features : [],
    status: user.status || "Active"
  }, onUserUpdated);

  const config = {
    readonly: false, placeholder: "Add Note", height: 200, toolbarSticky: false,
    toolbarAdaptive: false, showCharsCounter: false, showWordsCounter: false,
    showXPathInStatusbar: false, buttons: ["fontsize", "bold", "italic", "underline",
    "strikethrough", "eraser", "ul", "ol", "outdent", "indent", "link", "image", "table", "align"],
    style: { borderRadius: "0.75rem" }
  };

  const getImageUrl = (avatarPath) => {
    if (!avatarPath) return "/default-avatar.png";
    if (avatarPath.startsWith('http') || avatarPath.startsWith('data:')) return avatarPath;
    if (avatarPath.startsWith('/')) return `http://localhost:5000${avatarPath}`;
    return `/uploads/${avatarPath}`;
  };

  const handleSave = async () => {
    try {
      await handleSubmit(user._id);
      setIsEditing(false);
    } catch (err) {
    }
  };

  const handleSaveRole = async () => {
    try {
      const response = await usersAPI.update(user._id, {
        role: formData.role,
        features: formData.features
      });
      if (onUserUpdated) onUserUpdated(response.data);
      setIsEditingRole(false);
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await usersAPI.delete(user._id);
        if (onUserUpdated) onUserUpdated(null);
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.userId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="w-full">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="flex items-center gap-4">
        <img src={getImageUrl(user.avatar)} alt={user.name} className="w-10 h-10 rounded-full object-cover" onError={(e) => e.target.src = "/default-avatar.png"} />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{user.userId}</p>
            <div className="relative">
              <Copy size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={copyToClipboard} />
              {copied && <div className="absolute -top-8 -left-4 bg-green-400 text-white text-xs px-2 py-1 rounded-md">ID Copied!</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl p-3 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold">Basic Info</h4>
          {!isEditing && <Pencil size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setIsEditing(true)} />}
        </div>

        {!isEditing ? (
          <div className="space-y-2 text-gray-800 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-400 text-xs">Email Address</p><p>{user.email}</p></div>
              <div><p className="text-gray-400 text-xs">Mobile Number</p><p>{user.phone}</p></div>
            </div>
            <div><p className="text-gray-400 text-xs">Address</p><p>{user.location}</p></div>
          </div>
        ) : (
          <div className="space-y-3">
            <FormField label="Name"><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full focus:outline-noneborder border-gray-200 rounded-lg p-2 text-sm" /></FormField>
            <FormField label="Mobile Number"><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm" /></FormField>
            
            <FormField label="Profile Image">
              <div className="relative w-24 h-24 mt-1">
                {formData.avatar ? (
                  <>
                    <img src={getImageUrl(formData.avatar)} alt="Profile" className="w-24 h-24 rounded-lg object-cover border" onError={(e) => e.target.src = "/default-avatar.png"} />
                    <button type="button" className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100" onClick={() => handleInputChange({ target: { name: 'avatar', value: '' } })}>
                      <X size={14} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <ImageUploader onImageChange={handleFileChange} />
                )}
              </div>
            </FormField>

            <FormField label="Email Address"><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm" /></FormField>
            <FormField label="Address"><input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm" /></FormField>
            
            <FormField label="Designation">
              <select name="designation" value={formData.designation} onChange={handleInputChange} className="w-full focus:outline-none border border-gray-200 rounded-lg p-2 text-sm">
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Intern">Intern</option>
              </select>
            </FormField>

            <FormField label="Note">
              <JoditEditor ref={editor} value={formData.note} config={config} onBlur={(newContent) => handleInputChange({ target: { name: 'note', value: newContent } })} />
            </FormField>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-3 pt-4 w-full">
          <button className="flex-1 px-3 py-1 cursor-pointer border border-yellow-500 rounded-lg text-yellow-600 hover:bg-gray-100" onClick={() => setIsEditing(false)} disabled={loading}>Cancel</button>
          <button className="flex-1 px-3 cursor-pointer py-1 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 disabled:opacity-50" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
        </div>
      )}

      <div className="mt-4 bg-white rounded-xl p-3 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold">Role Details</h4>
          {!isEditingRole && <Pencil size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setIsEditingRole(true)} />}
        </div>

        {!isEditingRole ? (
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div><p className="text-gray-400 text-xs">Role</p><p className="text-gray-800">{user.role}</p></div>
            <div><p className="text-gray-400 text-xs">Feature Name</p><p className="text-gray-800">{Array.isArray(user.features) ? user.features.join(", ") : user.features}</p></div>
          </div>
        ) : (
          <div className="space-y-4">
            <FormField label="Role">
              <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm">
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </FormField>

            <FormField label="Feature Name">
              <select onChange={(e) => handleFeatureAdd(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm">
                <option value="">Select feature</option>
                <option value="Room Booking">Room Booking</option>
                <option value="Utilities">Utilities</option>
                <option value="Reports">Reports</option>
                <option value="Room Booking Services">Room Booking Services</option>
              </select>
              <FeatureChips features={formData.features} onRemove={handleFeatureRemove} />
            </FormField>
          </div>
        )}
      </div>

      {isEditingRole && (
        <div className="flex gap-3 pt-4 w-full">
          <button className="flex-1 px-3 py-1 cursor-pointer border border-yellow-500 rounded-lg text-yellow-600 hover:bg-gray-100" onClick={() => setIsEditingRole(false)} disabled={loading}>Cancel</button>
          <button className="flex-1 px-3 py-1 cursor-pointer bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 disabled:opacity-50" onClick={handleSaveRole} disabled={loading}>{loading ? "Saving..." : "Save the Changes"}</button>
        </div>
      )}

      <div className="mt-4 bg-white shadow-sm rounded-xl text-center p-3">
        <h4 className="text-xs text-gray-400 mb-2">Designation</h4>
        <p className="font-semibold">{Array.isArray(user.designation) ? user.designation.join(", ") : user.designation}</p>
      </div>

      <div className="mt-4 bg-white shadow-sm rounded-xl text-center p-3">
        <h4 className="text-xs text-gray-400 mb-2">Status</h4>
        <p className={`font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>{user.status}</p>
      </div>

      <button className="mt-8 w-full border text-red-600 py-2 rounded-xl font-medium hover:bg-red-50" onClick={handleDelete}>Delete this User Profile</button>
    </div>
  );
}