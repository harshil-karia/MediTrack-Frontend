import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './History.css';

const History = () => {
    const { url, token } = useContext(StoreContext);
    const [reports, setReports] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch medical reports on page load
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get(`${url}/api/reports`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReports(response.data.reports);
        } catch (error) {
            // console.error("Error fetching reports:", error);
            // alert("Failed to load reports");
        }
    };

    // Upload a new report
    const uploadReport = async () => {
        if (!file) {
            alert("Please select a file to upload!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("report", file);

        try {
            const response = await axios.post(`${url}/api/reports/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert(response.data.message);
            fetchReports(); // Refresh list after upload
        } catch (error) {
            console.error("Error uploading report:", error);
            alert("Upload failed, please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Delete a report
    const deleteReport = async (reportId) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;

        try {
            await axios.delete(`${url}/api/reports/${reportId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Report deleted successfully");
            fetchReports(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report");
        }
    };

    return (
        <div className="history-container">
            <h2>Medical Report History</h2>

           

            {/* Reports List */}
            <table className="report-table">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Report Name</th>
                        <th>Upload Date</th>
                        <th>Action</th>
                        <th>By user or not ?</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report._id}>
                                <td>
                                    <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                                        {report.name}
                                    </a>
                                </td>
                                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => deleteReport(report._id)}>
                                        Delete
                                    </button>
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No reports found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default History;
