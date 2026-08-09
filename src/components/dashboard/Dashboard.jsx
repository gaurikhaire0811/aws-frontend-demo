




import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [repositories, setRepositories] = useState([]);
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        console.log("User ID:", userId);

        const fetchRepositories = async () => {
            try {
                const response = await fetch(
                    `http://16.170.8.203:3002/repo/user/${userId}`
                );

                const data = await response.json();

                console.log("User Repositories:", data);

                if (response.ok) {
                    setRepositories(data.repositories || []);
                } else {
                    setRepositories([]);
                }
            } catch (err) {
                console.error("Error while fetching repositories:", err);
                setRepositories([]);
            }
        };

        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(
                    "http://16.170.8.203:3002/repo/all"
                );

                const data = await response.json();

                console.log("Suggested:", data);

                if (Array.isArray(data)) {
                    setSuggestedRepositories(data);
                } else {
                    setSuggestedRepositories([]);
                }
            } catch (err) {
                console.error(
                    "Error while fetching suggested repositories:",
                    err
                );
                setSuggestedRepositories([]);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults(repositories);
        } else {
            const filtered = repositories.filter((repo) =>
                repo.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );

            setSearchResults(filtered);
        }
    }, [repositories, searchQuery]);

    return (
        <>
            <Navbar />

            <section id="dashboard">
               
                <aside>
                    <h3>Suggested Repositories</h3>

                    {suggestedRepositories.length === 0 ? (
                        <p>No Suggested Repositories</p>
                    ) : (
                        suggestedRepositories.map((repo) => (
                            <div key={repo._id}>
                                <h4>{repo.name}</h4>
                                <p>{repo.description}</p>
                            </div>
                        ))
                    )}
                </aside>

                <main>
                    <h2>Your Repositories</h2>

                    <div style={{ marginBottom: "20px" }}>
                        <button
                            onClick={() => navigate("/version-control")}
                            style={{
                                padding: "10px 18px",
                                border: "none",
                                borderRadius: "6px",
                                backgroundColor: "#24292f",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            📜 Repository Version History
                        </button>
                    </div>

                    <div id="search">
                        <input
                            type="text"
                            placeholder="Search Repository..."
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.target.value)
                            }
                        />
                    </div>

                    {searchResults.length === 0 ? (
                        <p></p>
                    ) : (
                        searchResults.map((repo) => (
                            <div key={repo._id}>
                                <h4>{repo.name}</h4>
                                <p>{repo.description}</p>
                            </div>
                        ))
                    )}
                </main>

                <aside>
                    <h3>Upcoming Events</h3>

                    <ul>
                        <li>Tech Conference - Dec 15</li>
                        <li>Developer Meetup - Dec 25</li>
                        <li>React Summit - Jan 5</li>
                    </ul>
                </aside>
            </section>
        </>
    );
};

export default Dashboard;
