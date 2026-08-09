import React, { useEffect, useState } from "react";
import axios from "axios";
import CommitHistory from "./CommitHistory";
import "./version.css";
import { useNavigate } from "react-router-dom";

const VersionControl = () => {
    const navigate = useNavigate();
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await axios.get(
                "http://16.170.8.203:3002/version/history"
            );

            setCommits(res.data.commits);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <button
                onClick={() => navigate("/")}
                style={{
                    textAlign: "left",
                    marginBottom: "20px",
                    padding: "10px 18px",
                    background: "#24292f",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                ← Back to Dashboard
            </button>
            <div style={{ padding: "20px" }}>
                <h2>Version Control</h2>

                <CommitHistory commits={commits} />
            </div>
        </>
    );
};

export default VersionControl;
