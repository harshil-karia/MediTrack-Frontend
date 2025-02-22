import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Profile = () => {
    const { url, token, setToken } = useContext(StoreContext);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        profilePic: ""
    });
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch user details
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching profile:", error);
            alert("Failed to load profile");
        }
    };

    // Update user details
    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            await axios.put(`${url}/api/user/update`, user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    // Handle Profile Picture Upload
    const handleProfilePicUpload = async () => {
        if (!newProfilePic) return alert("Please select an image!");

        setLoading(true);
        const formData = new FormData();
        formData.append("profilePic", newProfilePic);

        try {
            const response = await axios.post(`${url}/api/user/uploadProfilePic`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setUser((prevUser) => ({
                ...prevUser,
                profilePic: response.data.profilePic
            }));

            alert("Profile picture updated!");
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    // Logout User
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        window.location.href = "/";
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
                {/* Profile Picture */}
                <div className="relative">
                    <img
                        src={user.profilePic || assets.profile_icon || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full mx-auto border-4 border-gray-300 shadow-lg"
                    />
                    <label className="absolute bottom-1 right-10 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                        <FaUpload className="text-sm" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setNewProfilePic(e.target.files[0])}
                        />
                    </label>
                </div>

                {/* Profile Details */}
                <h2 className="text-xl font-bold mt-4">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>

                {/* Update Form */}
                <div className="mt-6">
                    <label className="block text-left font-semibold">Name:</label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-left mt-4 font-semibold">Phone:</label>
                    <input
                        type="text"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Update Button */}
                    <button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4 transition-all flex items-center justify-center gap-2"
                    >
                        <FaUserEdit />
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>

                {/* Logout Button */}
                <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-4 transition-all flex items-center justify-center gap-2"
                    onClick={logout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
