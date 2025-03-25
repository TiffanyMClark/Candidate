import { useState } from "react";
import { searchGithub } from "../api/API";
import { useEffect } from "react";

interface GitHubUser {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  html_url: string;
  email: string;
  location: string;
  organizations_url: string;
  company: string;
}

const CandidateSearch = () => {
  //const [searchInput, setSearchInput] = useState("");
  const [candidate, setCandidate] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");

  const renderRandomCandidate = async () => {
    const userArray = await searchGithub();
    const user = userArray[0];
    if (user) {
      setCandidate(user);
      setError("");
      // Clear input after successful search
    } else {
      setCandidate(null);
      setError("User not found or an error occurred.");
    }
  };

  // Save the candidate to localStorage
  const saveCandidate = () => {
    if (!candidate) return;

    // Retrieve existing candidates from localStorage
    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );

    if (
      !storedCandidates.some((c: GitHubUser) => c.login === candidate.login)
    ) {
      storedCandidates.push(candidate);
      localStorage.setItem("candidates", JSON.stringify(storedCandidates));
      alert("Candidate saved successfully!");
    } else {
      alert("This candidate is already saved.");
    }
  };
  useEffect(() => {
    renderRandomCandidate();
  }, []);
  console.log("Here is candidate", candidate);
  return (
    <div>
      <header>
        <h1>Candidate Search</h1>
      </header>
      {/* <section id="searchSection">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {candidate && candidate.login ? (
        <div>
          <h2>{candidate.login || "No Name Available"}</h2>
          <img src={candidate.avatar_url} alt="Profile" width={100} />
          <h2>{candidate.email || "No email Available"}</h2>
          <p>{candidate.bio || "No bio available."}</p>
          <p>{candidate.location || "No location available."}</p>
          <p>{candidate.organizations_url || "No organization available."}</p>
          <p>{candidate.company || "No company available."}</p>
          <button onClick={renderRandomCandidate}>Next Candidate</button>

          {/* Add Save Candidate Button */}
          <button onClick={saveCandidate}>Save Candidate</button>
        </div>
      ) : (
        <p>No candidate found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
