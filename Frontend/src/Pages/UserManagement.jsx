import { useState, useEffect } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import userIcon from "../assets/Images/userManagement.svg";
import UserDetails from "../Components/UserManagement/UserDetails.jsx";
import AddUserForm from "../Components/UserManagement/AddUserForm.jsx";
import EditUserForm from "../Components/UserManagement/EditUserForm.jsx";
import { usersAPI } from "../Services/api.js";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("view");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.data);
      if (response.data.length > 0 && !selectedUser) {
        setSelectedUser(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
    setSelectedUser(newUser);
    setMode("view");
  };

  const handleUserUpdated = (updatedUser) => {
    if (updatedUser === null) {
      fetchUsers();
      setSelectedUser(null);
      setMode("view");
      return;
    }
    setUsers(prev => prev.map(user => 
      user._id === updatedUser._id ? updatedUser : user
    ));
    setSelectedUser(updatedUser);
    setMode("view");
  };

  const handleDeleteUser = async (userId, e) => {
    e.stopPropagation(); 
    
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await usersAPI.delete(userId);
        
        
        setUsers(prev => prev.filter(user => user._id !== userId));
        
      
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(users.length > 1 ? users.find(user => user._id !== userId) : null);
          setMode("view");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-6.5rem)] overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className="mb-4 max-w-3xl flex-shrink-0">
          <h2 className="text-3xl font-semibold md:text-xl sm:text-md flex items-center gap-2 mb-4">
            <img src={userIcon} alt="User Icon" className="w-8 h-8 md:w-6 md:h-6 sm:w-6 sm:h-6 object-contain" />
            User Management
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex items-center flex-1 border border-gray-200 rounded-xl overflow-hidden bg-white">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-2 text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="p-2 bg-[rgba(253,249,245,1)] hover:bg-yellow-50 text-yellow-500 rounded-lg m-1">
                <FiSearch />
              </button>
            </div>

            <button
              className="p-2 border border-yellow-400 rounded-lg text-yellow-500 hover:bg-[rgba(253,249,245,1)]"
              onClick={() => {
                setSelectedUser(null);
                setMode("add");
              }}
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll max-w-3xl">
          <div className="bg-[rgba(253,249,245,1)] border border-[rgba(245,197,109,0.25)] rounded-lg p-3 mb-3 sticky top-0 z-10">
            <div className="grid grid-cols-[3fr_2fr_1fr_1fr_2fr] items-center text-sm font-medium text-gray-700">
              <div>Name</div>
              <div>Designation</div>
              <div>Role</div>
              <div className="text-center">Status</div>
              <div className="text-center">Action Buttons</div>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                {searchTerm ? "No users found" : "No users available"}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  role="button"
                  onClick={() => {
                    setSelectedUser(user);
                    setMode("view");
                  }}
                  className={`bg-white rounded-lg p-3 mb-3 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                    selectedUser?._id === user._id ? "ring-1 ring-yellow-400" : "ring-0"
                  }`}
                >
                  <div className="grid grid-cols-[3fr_2fr_1fr_1fr_2fr] items-center sm:text-xs md:text-xs gap-3">
                    <div>
                      <p className="font-medium md:font-normal text-gray-900">{user.name}</p>
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                        {user.userId}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {user.designation.map((d, i) => (
                        <span
                          key={i}
                          className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                        {user.role}
                      </span>
                    </div>

                    <div className="text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        className="text-gray-500 hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setMode("edit");
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600"
                        onClick={(e) => handleDeleteUser(user._id, e)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="w-96 p-2 overflow-y-auto custom-scroll h-[calc(100vh-6.5rem)]">
        {mode === "add" && (
          <AddUserForm 
            onUserAdded={handleUserAdded} 
            onCancel={() => {
              setSelectedUser(users[0] || null);
              setMode("view");
            }} 
          />
        )}
        {mode === "edit" && selectedUser && (
          <EditUserForm 
            user={selectedUser} 
            onUserUpdated={handleUserUpdated}
            onBack={() => {
              setMode("view");
            }} 
          />
        )}
        {mode === "view" && selectedUser && (
          <UserDetails 
            user={selectedUser} 
            onUserUpdated={handleUserUpdated}
          />
        )}
        {mode === "view" && !selectedUser && users.length > 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to view details
          </div>
        )}
        {mode === "view" && !selectedUser && users.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            No users available. Click the + button to add a new user.
          </div>
        )}
      </div>
    </div>
  );
}