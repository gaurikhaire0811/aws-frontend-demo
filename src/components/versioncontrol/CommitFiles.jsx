import React from "react";

const CommitFiles = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <div>
        <p>No files found.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h4>Files in this Commit</h4>

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommitFiles;