import React, { useState } from "react";
import "./History.css";
import { StoreContext } from '../../context/StoreContext';
import NewGuestModal from "../../components/NewGuestModal/NewGuestModal";



const historyData = [
    {
        No : 1,
        Name: "Jane Cooper",
        Description: "About ...",
        DoctorName: "abc",
        CreatedAt: "02-03-24 11:30 AM",
        LaboratoryName: "xyz",
        Reports: "xyz"
    }
];

const History = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="history-container">
            



            <div className="history-table">
            <h2>Medical Report History</h2>

                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Doctor Name</th>
                            <th>CreatedAt</th>
                            <th>Laboratory Name</th>
                            <th>Reports</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((item, index) => (
                            <tr key={index}>
                               
                                <td>{index + 1}</td> 
                                <td>{item.Name}</td>
                                <td>
                                    {item.Description}
                                </td>
                                <td>{item.DoctorName}</td>
                                <td>{item.CreatedAt}</td>
                                <td>{item.LaboratoryName}</td>
                                <td>
                                    <button className="action-btn">📄</button>
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
