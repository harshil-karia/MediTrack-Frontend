import React, { useState } from "react";
import "./lab.css";
import { Trash2, MessageCircle, Edit, PlusCircle } from "lucide-react";

const Lab = () => {
  const [popup, setPopup] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890", date: "2025-02-22", doctor: "Dr. Smith", lab: "City Lab" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", date: "2025-02-20", doctor: "Dr. Brown", lab: "Health Lab" },
  ]);
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", doctor: "", lab: "" });

  const openPopup = (type, user = null) => {
    setPopup({ type, user });
    setFormData(user ? { ...user } : { name: "", phone: "", date: "", doctor: "", lab: "" });
  };

  const closePopup = () => {
    setPopup(null);
    setFormData({ name: "", phone: "", date: "", doctor: "", lab: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    closePopup();
  };

  const handleEdit = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...formData } : user)));
    closePopup();
  };

  const handleAdd = () => {
    const newUser = { id: users.length + 1, ...formData };
    setUsers([...users, newUser]);
    closePopup();
  };

  return (
    <div className="container">
      <div className="header">
        <button className="new-guest-btn" onClick={() => openPopup("add")}>
          <PlusCircle /> New Guest
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Laboratory Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.date}</td>
                <td>{user.doctor}</td>
                <td>{user.lab}</td>
                <td>
                  <button className="icon-btn delete-btn" onClick={() => openPopup("delete", user)}>
                    <Trash2 />
                  </button>
                  <button className="icon-btn edit-btn" onClick={() => openPopup("edit", user)}>
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popup && (
        <>
          <div className="overlay" onClick={closePopup}></div>
          <div className="popup">
            <h3>{popup.type === "delete" ? "Confirm Delete" : popup.type === "edit" ? "Edit User" : "Add User"}</h3>
            {popup.type !== "delete" && (
              <>
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                <input type="text" placeholder="Doctor Name" value={formData.doctor} onChange={(e) => setFormData({ ...formData, doctor: e.target.value })} />
                <input type="text" placeholder="Laboratory Name" value={formData.lab} onChange={(e) => setFormData({ ...formData, lab: e.target.value })} />
              </>
            )}
            <button className="submit-btn" onClick={() => {
              if (popup.type === "edit") handleEdit(popup.user.id);
              else if (popup.type === "add") handleAdd();
              else handleDelete(popup.user.id);
            }}>
              Submit
            </button>
            <button className="cancel-btn" onClick={closePopup}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Lab;
