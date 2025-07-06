import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    const userIdFromStorage = localStorage.getItem("userId");
    if(userIdFromStorage&&!currentUser){
        setCurrentUser(userIdFromStorage);
    }
    console.log((window.location.pathname));
    
    if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname))
    {
      navigate("/auth");
    }
    if(userIdFromStorage&&window.location.pathname == "/auth"){
        navigate("/")
    }
  },[currentUser,navigate,setCurrentUser]);

    let element = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/profile", element: <Profile /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/auth", element: <Login /> }
    ]);
    return element;
};

export default ProjectRoutes;