import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./CreateRepository.css";

const CreateRepository = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const createRepository = async (e) => {
    e.preventDefault();

    const owner = localStorage.getItem("userId");

    if (!owner) {
      alert("Please login first!");
      navigate("/auth");
      return;
    }

    if (!name.trim()) {
      alert("Repository name is required!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://16.170.8.203:3002/repo/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner,
            name,
            description,
            visibility,
            content: [],
            issues: [],
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Repository Created Successfully!");

        navigate("/");
      } else {
        alert(data.error || data.message || "Unable to create repository.");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-repo-container">
        <form className="create-repo-card" onSubmit={createRepository}>

          <h1>Create Repository</h1>

          <label>Repository Name</label>

          <input
            type="text"
            placeholder="Repository Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Description</label>

          <textarea
            rows="5"
            placeholder="Repository Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Visibility</label>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value === "true")
            }
          >
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Repository"}
          </button>

        </form>
      </div>
    </>
  );
};

export default CreateRepository;
