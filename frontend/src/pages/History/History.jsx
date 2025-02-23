import React, { useState } from "react";
import "./History.css";
import { StoreContext } from '../../context/StoreContext';
import NewGuestModal from "../../components/NewGuestModal/NewGuestModal";



const historyData = [
    {
        name: "Jane Cooper",
        status: ["Early Check In", "Late Check Out"],
        checkIn: "02-03-24, 1:00 PM",
        checkOut: "02-03-24, 11:30 AM",
        source: "Booking.com",
        details: "+1394734838 | jane.cooper@example.com"
    },
    {
        name: "Cody Fisher",
        status: ["Check In", "Check Out"],
        checkIn: "02-03-24, 3:00 PM",
        checkOut: "02-03-24, 3:00 PM",
        source: "Booking.com",
        details: "+1394734838 | jane.cooper@example.com"
    },
    {
        name: "Esther Howard",
        status: ["Early Check In", "Check Out"],
        checkIn: "02-03-24, 3:00 PM",
        checkOut: "02-03-24, 3:00 PM",
        source: "Booking.com",
        details: "+1394734838 | jane.cooper@example.com"
    },
    {
        name: "Jenny Wilson",
        status: ["Early Check In", "Late Check Out"],
        checkIn: "02-03-24, 3:00 PM",
        checkOut: "02-03-24, 3:00 PM",
        source: "Booking.com",
        details: "+1394734838 | jane.cooper@example.com"
    },
    {
        name: "Kristin Watson",
        status: ["Canceled"],
        checkIn: "02-03-24, 3:00 PM",
        checkOut: "02-03-24, 3:00 PM",
        source: "Booking.com",
        details: "+1394734838 | jane.cooper@example.com"
    },
    {
        name: "Cameron Williamson",
        status: ["Canceled"],
        checkIn: "02-03-24, 3:00 PM",
        checkOut: "02-03-24, 3:00 PM",
        source: "Booking.com",
        details: "+1394734838 | jane.cooper@example.com"
    }
];

const History = () => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div className="history-container">
            <div className="history-header">
                <h2>History</h2>
            </div>
            
            <div className="history-filters">
                <button className="active">Reservations</button>
                <button>Check In</button>
                <button>In House</button>
                <button>Check Out</button>
                <button>Checked Out</button>
                
                <div className="search-container">
                    <input type="text" placeholder="Search guests" />
                    <button className="new-guest-btn" onClick={() => setShowModal(true)}>New Guest</button>
                    </div>
                    {showModal && <NewGuestModal closeModal={() => setShowModal(false)} />}

            </div>

            <div className="history-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Check In / Check Out</th>
                            <th>Source</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {item.status.map((status, i) => (
                                        <span key={i} className={`status ${status.toLowerCase().replace(/\s+/g, "-")}`}>
                                            {status}
                                        </span>
                                    ))}
                                </td>
                                <td>{item.checkIn} <br /> {item.checkOut}</td>
                                <td>{item.source}</td>
                                <td>{item.details}</td>
                                <td>
                                    <button className="action-btn">✏️</button>
                                    <button className="action-btn">📄</button>
                                    <button className="action-btn">❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
