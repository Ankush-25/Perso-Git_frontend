import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from './navbar'
const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepo, setSuggestedRepo] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      const fetchRepositories = async () => {
        const response = await fetch(
          `52.90.195.7/repo/Current/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repositories);
      };
      fetchRepositories();
    } catch (error) {
      console.error("Error while Fetching all repositories of user!");
    }

    try {
      const fetchSuggestedRepositories = async () => {
        const response = await fetch(`52.90.195.7/repo/all`);
        const data = await response.json();
        setSuggestedRepo(data);
      };
      fetchSuggestedRepositories();
    } catch (error) {
      console.error("Error while Fetching all repositories!");
    }
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <div className="dashboard">
      <Navbar/>
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button
              className="btn-primary"
              onClick={() => alert("Create repository")}
            >
              + New
            </button>
          </div>
          <div className="search-bar">
            <input
              type="search"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
        </header>

        <div className="content-wrapper">
          <div className="main-column">
            <div className="repo-section">
              <div className="section-header">
                <h2>Your repositories</h2>
                <div className="filter-buttons">
                  <button className="filter-btn active">Recent</button>
                  <button className="filter-btn">Starred</button>
                </div>
              </div>
              <div className="repo-cards">
                {searchResults.length > 0 ? (
                  searchResults.map((repo) => (
                    <div className="repo-card" key={repo._id}>
                      <div className="repo-header">
                        <svg
                          className="octicon octicon-repo"
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                        >
                          <path
                            fill="#7d8590"
                            fillRule="evenodd"
                            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                          ></path>
                        </svg>
                        <h3>
                          <a href="#" className="repo-link">
                            {repo.name}
                          </a>
                        </h3>
                        <span className="repo-visibility">Public</span>
                      </div>
                      <p className="repo-description">
                        {repo.description || "No description provided"}
                      </p>
                      <div className="repo-meta">
                        <span className="repo-language">
                          <span className="language-color"></span>
                          JavaScript
                        </span>
                        <span className="repo-updated">Updated 2 days ago</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <svg
                      className="octicon octicon-repo"
                      viewBox="0 0 16 16"
                      width="32"
                      height="32"
                      aria-hidden="true"
                    >
                      <path
                        fill="#7d8590"
                        fillRule="evenodd"
                        d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                      ></path>
                    </svg>
                    <h3>No repositories found</h3>
                    <p>Create a new repository to get started</p>
                  </div>
                )}
              </div>
            </div>

            <div className="activity-section">
              <div className="activity-feed">
                <h2>Recent activity</h2>
                <div className="activity-container">
                  <div className="activity-timeline">
                    <div className="timeline-badge"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <ul>
                    <li>
                      <span className="activity-icon">📝</span>
                      <div className="activity-details">
                        <span>
                          Pushed to <span className="highlight">main</span> branch
                        </span>
                        <span className="time-ago">2 hours ago</span>
                      </div>
                    </li>
                    <li>
                      <span className="activity-icon">🌿</span>
                      <div className="activity-details">
                        <span>
                          Created new branch{" "}
                          <span className="highlight">feature/login</span>
                        </span>
                        <span className="time-ago">1 day ago</span>
                      </div>
                    </li>
                    <li>
                      <span className="activity-icon">🔀</span>
                      <div className="activity-details">
                        <span>
                          Merged pull request{" "}
                          <span className="highlight">#42</span>
                        </span>
                        <span className="time-ago">3 days ago</span>
                      </div>
                    </li>
                    <li>
                      <span className="activity-icon">📄</span>
                      <div className="activity-details">
                        <span>
                          Updated{" "}
                          <span className="highlight">README.md</span>
                        </span>
                        <span className="time-ago">1 week ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="right-sidebar">
            <div className="suggested-repos">
              <h2>Suggested repositories</h2>
              <ul>
                {suggestedRepo.slice(0, 5).map((repo) => (
                  <li key={repo._id}>
                    <div className="suggested-repo-header">
                      <a href="#" className="repo-link">
                        {repo.name}
                      </a>
                      <button className="star-btn">
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                        >
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        Star
                      </button>
                    </div>
                    <p className="repo-description">
                      {repo.description?.substring(0, 60) ||
                        "No description provided"}
                      ...
                    </p>
                    <div className="repo-stats">
                      <span>
                        <span className="language-color"></span>
                        {["JavaScript", "TypeScript", "Python"][
                          Math.floor(Math.random() * 3)
                        ]}
                      </span>
                      <span>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                        >
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                        </svg>
                        {Math.floor(Math.random() * 1000)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="upcoming-events">
              <h2>Upcoming events</h2>
              <ul>
                <li>
                  <div className="event-date">DEC 15</div>
                  <div className="event-details">
                    <strong>Tech Conference 2023</strong>
                    <p>Virtual Event</p>
                  </div>
                </li>
                <li>
                  <div className="event-date">JUL 1</div>
                  <div className="event-details">
                    <strong>Developer Meetup</strong>
                    <p>San Francisco, CA</p>
                  </div>
                </li>
                <li>
                  <div className="event-date">JAN 5</div>
                  <div className="event-details">
                    <strong>React Submit</strong>
                    <p>New York, NY</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;