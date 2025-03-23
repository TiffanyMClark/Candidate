import { useState } from "react";
import { searchGithubUser } from "../api/API";

interface GitHubUser {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  html_url: string;
}

const CandidateSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [candidate, setCandidate] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");

  // Function to handle saving a candidate to localStorage
  const saveCandidate = () => {
    if (!candidate) return;

    // Retrieve existing candidates from localStorage
    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );

    // Avoid saving duplicates (check if the candidate already exists in the list)
    if (
      !storedCandidates.some((c: GitHubUser) => c.login === candidate.login)
    ) {
      storedCandidates.push(candidate);
      localStorage.setItem("candidates", JSON.stringify(storedCandidates));
    }
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchInput.trim()) return;

    const user = await searchGithubUser(searchInput);

    if (user) {
      setCandidate(user);
      setError("");
    } else {
      setCandidate(null);
      setError("User not found or an error occurred.");
    }
  };

  return (
    <div>
      <header>
        <h1>Candidate Search</h1>
        <p>Find GitHub users by searching their username.</p>
      </header>
      <section id="searchSection">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {candidate && candidate.login ? (
        <div>
          <h2>{candidate.name || "No Name Available"}</h2>
          <img src={candidate.avatar_url} alt="Profile" width={100} />
          <p>{candidate.bio || "No bio available."}</p>
          <a
            href={candidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </a>
          <button onClick={saveCandidate}>Save Candidate</button>
        </div>
      ) : (
        <p>No candidate found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
