import { useState } from "react";
import { usersAPI } from "../Services/api";

export default function useUserForm(initialData, onSuccess) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file)
      }));
      setProfileImageFile(file);
    }
  };

  const handleFeatureAdd = (feature) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature],
      }));
    }
  };

  const handleFeatureRemove = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = async (userId = null) => {
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(item => submitData.append(key, item));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });
      
      if (profileImageFile) {
        submitData.append('avatar', profileImageFile);
      }

      let response;
      if (userId) {
        response = await usersAPI.update(userId, submitData);
      } else {
        response = await usersAPI.create(submitData);
      }
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    profileImageFile,
    setProfileImageFile,
    handleInputChange,
    handleFileChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleSubmit
  };
}