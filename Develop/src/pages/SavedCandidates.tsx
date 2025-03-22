import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate: any, index: number) => (
            <li key={index}>
              <h2>{candidate.name || candidate.login}</h2>
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                width={100}
              />
              <a
                href={candidate.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;
