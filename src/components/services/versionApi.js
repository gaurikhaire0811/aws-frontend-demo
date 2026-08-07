import axios from "axios";

const BASE_URL = "http://localhost:3002/version";

// Get all commits
export const getCommitHistory = async () => {
  const res = await axios.get(`${BASE_URL}/history`);
  return res.data;
};

// Get files of a particular commit
export const getCommitFiles = async (commitID) => {
  const res = await axios.get(`${BASE_URL}/files/${commitID}`);
  return res.data;
};

// Revert to a specific commit
export const revertCommit = async (commitID) => {
  const res = await axios.post(`${BASE_URL}/revert/${commitID}`);
  return res.data;
};