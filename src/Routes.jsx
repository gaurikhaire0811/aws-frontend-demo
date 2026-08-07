

import React, { useEffect } from "react";
import {useNavigate, useRoutes} from 'react-router-dom'

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import CreateRepository from "./components/repo/CreateRepository.jsx";
import VersionControl from "./components/versioncontrol/VersionControl.jsx";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./context/authContext.jsx";
// import { AuthProvider } from './components/authContext.jsx';
const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname))
        {
            navigate("/auth");
        }

        if(userIdFromStorage && window.location.pathname=='/auth'){
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
        path: "/create",
        element: <CreateRepository />
        },
        {
            path:"/profile",
            element:<Profile/>
        },
        {
            path:"/version-control",
            element:<VersionControl/>
        }
    ]);

    return element;
}

export default ProjectRoutes;