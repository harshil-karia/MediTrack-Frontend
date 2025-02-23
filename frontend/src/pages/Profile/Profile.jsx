import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Profile.css";

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
            // console.error("Error fetching profile:", error);
            // alert("Failed to load profile");
        }
    };

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

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        window.location.href = "/";
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>My Profile</h2>
                </div>

                <div className="profile-pic-section">
                    <img 
                        src={user.profilePic || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="profile-pic" 
                    />
                    <input type="file" onChange={(e) => setNewProfilePic(e.target.files[0])} />
                    <button className="upload-btn" onClick={handleProfilePicUpload} disabled={loading}>
                        {loading ? "Uploading..." : "Change Picture"}
                    </button>
                </div>

                <div className="profile-form">
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={user.email} disabled />
                    </div>

                    <div className="input-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                    </div>

                    <button className="update-btn" onClick={handleUpdateProfile} disabled={loading}>
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>

                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
