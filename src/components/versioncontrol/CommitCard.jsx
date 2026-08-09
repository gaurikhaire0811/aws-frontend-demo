import React, { useState } from "react";
import axios from "axios";
import CommitFiles from "./CommitFiles";

const CommitCard = ({ commit }) => {
  const [files, setFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);

  const viewFiles = async () => {
    try {
      const res = await axios.get(
        `http://16.170.8.203:3002/version/files/${commit.commitID}`
      );

      setFiles(res.data.files);
      setShowFiles(true);
    } catch (err) {
      console.log(err);
    }
  };

  const revertCommit = async () => {
    try {
      const res = await axios.post(
        `http://16.170.8.203:3002/version/revert/${commit.commitID}`
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Unable to revert repository");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <h4>Commit ID</h4>
      <p>{commit.commitID}</p>
      {/* <p title={commit.commitID}>
      {commit.commitID.slice(0, 8)}...
      </p> */}

      <h4>Message</h4>
      <p>{commit.message}</p>

      <h4>Date</h4>
      <p>{new Date(commit.date).toLocaleString()}</p>

      <button onClick={viewFiles}>
        View Files
      </button>

      <button
        onClick={revertCommit}
        style={{ marginLeft: "10px" }}
      >
        Revert
      </button>

      {showFiles && <CommitFiles files={files} />}
    </div>
  );
};

export default CommitCard;
