import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../dashboard/navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon, PeopleIcon, LocationIcon, MailIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import { Avatar, Box, Button, Text } from "@primer/react";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username", email: "user@example.com" });
  const { setCurrentUser } = useAuth();
  const [reposCount, setReposCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `52.90.195.7:3000/userProfile/${userId}`
          );
          setUserDetails(response.data);
          
          // Fetch additional user stats
          const reposResponse = await axios.get(
            `52.90.195.7:3000/repo/Current/${userId}`
          );
          setReposCount(reposResponse.data.length || 0);
          
          // Mock data for followers/following
          setFollowersCount(Math.floor(Math.random() * 50));
          setFollowingCount(Math.floor(Math.random() * 30));
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      <Navbar />
      
      <div className="profile-header">
        <UnderlineNav aria-label="Profile Navigation">
          <UnderlineNav.Item
            aria-current="page"
            icon={BookIcon}
            sx={{
              backgroundColor: "transparent",
              color: "#c9d1d9",
              "&:hover": {
                color: "#f0f6fc",
              },
              "&[aria-current]": {
                color: "#f0f6fc",
                fontWeight: 600,
                borderBottom: "2px solid #f78166"
              }
            }}
          >
            Overview
          </UnderlineNav.Item>

          <UnderlineNav.Item
            onClick={() => navigate("/repo")}
            icon={RepoIcon}
            sx={{
              backgroundColor: "transparent",
              color: "#c9d1d9",
              "&:hover": {
                color: "#f0f6fc",
              }
            }}
          >
            Repositories
            <Box as="span" sx={{ bg: 'neutral.emphasis', color: 'fg.onEmphasis', ml: 1, px: 2, py: 0.5, borderRadius: 10, fontSize: 0 }}>
              {reposCount}
            </Box>
          </UnderlineNav.Item>
          
          <UnderlineNav.Item
            onClick={() => navigate("/starred")}
            icon={RepoIcon}
            sx={{
              backgroundColor: "transparent",
              color: "#c9d1d9",
              "&:hover": {
                color: "#f0f6fc",
              }
            }}
          >
            Starred repositories
          </UnderlineNav.Item>
        </UnderlineNav>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <Avatar 
            src="https://avatars.githubusercontent.com/u/1?s=200&v=4" 
            size={296}
            alt={userDetails.username}
            className="profile-avatar"
          />
          
          <div className="profile-info">
            <h1 className="profile-username">{userDetails.username}</h1>
            <h2 className="profile-name">{userDetails.name || userDetails.username}</h2>
            
            <Button 
              variant="primary" 
              className="profile-btn"
              sx={{ width: '100%', mt: 2 }}
            >
              Follow
            </Button>
            
            <div className="profile-stats">
              <div className="stat-item">
                <PeopleIcon size={16} />
                <span>
                  <strong>{followersCount}</strong> followers
                </span>
              </div>
              <div className="stat-item">
                <span>·</span>
                <span>
                  <strong>{followingCount}</strong> following
                </span>
              </div>
            </div>
            
            <div className="profile-meta">
              {userDetails.location && (
                <div className="meta-item">
                  <LocationIcon size={16} />
                  <span>{userDetails.location}</span>
                </div>
              )}
              {userDetails.email && (
                <div className="meta-item">
                  <MailIcon size={16} />
                  <span>{userDetails.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="profile-main">
          <div className="heatmap-container">
            <h2 className="section-title">Contribution Activity</h2>
            <HeatMapProfile />
          </div>
          
          <div className="repositories-container">
            <h2 className="section-title">Repositories</h2>
            <div className="repositories-grid">
              {Array(Math.min(6, reposCount)).fill().map((_, idx) => (
                <div className="repo-card" key={idx}>
                  <div className="repo-header">
                    <RepoIcon size={16} />
                    <Link to={`/repo/${idx}`} className="repo-name">
                      repo-{userDetails.username}-{idx + 1}
                    </Link>
                  </div>
                  <div className="repo-description">
                    Sample repository description
                  </div>
                  <div className="repo-meta">
                    <span className="repo-language">JavaScript</span>
                    <span className="repo-updated">Updated 2 days ago</span>
                  </div>
                </div>
              ))}
            </div>
            {reposCount > 6 && (
              <Button variant="default" className="view-all-btn">
                View all repositories
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Button 
        variant="danger"
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);
          navigate("/auth");
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default Profile;