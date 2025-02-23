import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTable, setShowTable] = useState(false);

    const fetchReports = async () => {
        const at = localStorage.getItem("at");
        if (!at || at === "") {
            console.error("Access token is missing!");
            return;
        }
        try {
            const response = await axios.get("http://localhost:3000/medical-history/getHistory", {
                headers: { 'Authorization': `Bearer ${at}` }
            });

            console.log("Response Data:", response.data); // Check API response structure

            setReports(response.data.history); // Update state
            setLoading(false);

            // ✅ Wait 5 seconds before showing table
            setTimeout(() => {
                setShowTable(true);
            }, 5000);

        } catch (error) {
            console.error("Error fetching reports:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // ✅ Delay API call by 2 seconds
        const timeout = setTimeout(() => {
            fetchReports();
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    // ✅ Debugging: Track state updates
    useEffect(() => {
        console.log("Updated Reports:", reports);
    }, [reports]); // Runs whenever reports changes

    return (
        <div className="history-container">
            <div className="history-table">
                <h2>Medical Report History</h2>

                {loading && <p>Loading reports...</p>}

                {showTable && !loading && (
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
                            {reports.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td> 
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.doctorName}</td>
                                    <td>{item.date}</td>
                                    <td>{item.laboratory ? item.laboratory.name : "N/A"}</td>
                                    <td>
                                        <a href={item.reports[0].url} target="_blank">
                                            <button className="action-btn">📄</button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default History;
