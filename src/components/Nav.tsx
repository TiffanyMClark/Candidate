import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation().pathname;

  return (
    <nav>
      <h1>
        <Link to="/" id="logo">
          Candidate Search App.
        </Link>
      </h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/"
            className={location === "/" ? "nav-link active" : "nav-link"}
          >
            Search Candidates
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SavedCandidates"
            className={
              location === "/SavedCandidates" ? "nav-link active" : "nav-link"
            }
          >
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
