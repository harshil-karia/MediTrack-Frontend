import React from "react";
import "./NewGuestModal.css";

const NewGuestModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>New Guest</h3>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>

        <div className="modal-tabs">
          <button className="active">Reservation</button>
          <button>In House</button>
          <button>Checked Out</button>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Phone Number" />
            <input type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <select>
              <option>Check In</option>
            </select>
            <select>
              <option>Check Out</option>
            </select>
          </div>

          <div className="input-group">
            <input type="text" placeholder="03 / 05    03:00 PM" />
            <input type="text" placeholder="03 / 08    10:00 AM" />
          </div>

          <div className="input-group">
            <input type="text" placeholder="Confirmation number" />
            <select>
              <option>Online</option>
            </select>
          </div>

          <div className="toggle-group">
            <label>Message Guest</label>
            <input type="checkbox" />
          </div>

          <div className="message-box">
            Default status message template text goes here and not editable..
          </div>
        </div>

        <div className="modal-footer">
          <button className="add-guest-btn">Add Guest</button>
        </div>
      </div>
    </div>
  );
};

export default NewGuestModal;
