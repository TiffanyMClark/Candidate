import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  const removeSavedCandidate = (login: string) => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );

    const updatedCandidates = storedCandidates.filter(
      (c: any) => c.login !== login
    );

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
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
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email || "No email provided"}</p>
              <p>Company: {candidate.company || "No company"}</p>
              <a
                href={candidate.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>

              {/* Red - Button to Remove */}
              <button
                className="remove"
                onClick={() => removeSavedCandidate(candidate.login)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
