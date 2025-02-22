import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './Reports.css';

const Reports = () => {
    const { url, token } = useContext(StoreContext);
    const [reports, setReports] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

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
            // console.error("Error uploading report:", error);
            // alert("Upload failed, please try again.");
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

    // Filter reports based on search input
    const filteredReports = reports.filter(report =>
        report.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="reports-container">
            <h2>Medical Reports</h2>

            {/* Upload Report Section */}
            <div className="upload-section">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={uploadReport} disabled={loading}>
                    {loading ? "Uploading..." : "Upload Report"}
                </button>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />

            {/* Reports List */}
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Report Name</th>
                        <th>Upload Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No reports found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
