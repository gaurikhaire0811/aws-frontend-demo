import React from "react";
import CommitCard from "./CommitCard";

const CommitHistory = ({ commits }) => {
  if (!commits || commits.length === 0) {
    return (
      <div>
        <h3>No Commits Found</h3>
      </div>
    );
  }

  return (
   <div>
  <h3>Commit History</h3>

  {commits.map((commit) => (
    <CommitCard
      key={commit.commitID}
      commit={commit}
    />
  ))}
</div> 
  );
};

export default CommitHistory;