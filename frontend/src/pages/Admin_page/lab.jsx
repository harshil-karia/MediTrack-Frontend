import React, { useState } from "react";
import "./lab.css";
import { Trash2, MessageCircle, Edit } from "lucide-react";

const LabDashboard = () => {
  const [popup, setPopup] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const users = [
    { id: 1, name: "John Doe", phone: "123-456-7890", date: "2025-02-22", status: "Pending" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", date: "2025-02-20", status: "Approved" },
  ];

  const openPopup = (type, id) => {
    setPopup({ type, id });
  };

  const closePopup = () => {
    setPopup(null);
    setInputValue("");
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <button className="new-guest-btn">+ New Guest</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
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
                <td>{user.status}</td>
                <td>
                  <button className="icon-btn delete-btn" onClick={() => openPopup("delete", user.id)}>
                    <Trash2 />
                  </button>
                  <button className="icon-btn comment-btn" onClick={() => openPopup("comment", user.id)}>
                    <MessageCircle />
                  </button>
                  <button className="icon-btn edit-btn" onClick={() => openPopup("edit", user.id)}>
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop-up */}
      {popup && (
        <>
          <div className="overlay" onClick={closePopup}></div>
          <div className="popup">
            <h3>{popup.type === "delete" ? "Confirm Delete" : popup.type === "comment" ? "Add Comment" : "Edit User"}</h3>
            {popup.type !== "delete" && <input type="text" placeholder="Enter details..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />}
            <button className="submit-btn" onClick={closePopup}>Submit</button>
            <button className="cancel-btn" onClick={closePopup}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LabDashboard;