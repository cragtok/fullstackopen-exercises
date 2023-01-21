import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { setBlogs } from "../reducers/blogsReducer";

import blogService from "../services/blogs";
import { setUsers } from "../reducers/usersReducer";
import { useLoggedInUser } from "../hooks";

const navbarStyle = {
    backgroundColor: "#c9c9c9",
    padding: "8px",
    margin: "4px",
};

const navbarItemStyle = {
    padding: "3px",
};

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoggedIn } = useLoggedInUser();

    const handleLogout = () => {
        dispatch(logoutUser());
        window.localStorage.removeItem("loggedInUser");
        blogService.setToken(null);
        dispatch(setBlogs([]));
        dispatch(setUsers([]));
        navigate("/");
    };

    if (!isLoggedIn()) {
        return null;
    }
    return (
        <div style={navbarStyle}>
            <Link style={navbarItemStyle} to="/">
                Home
            </Link>
            <Link style={navbarItemStyle} to={`/users/${user.id}`}>
                Blogs
            </Link>
            <Link style={navbarItemStyle} to="/users">
                Users
            </Link>
            <span style={navbarItemStyle}>
                {`${user.name} logged in`}{" "}
                <button onClick={handleLogout}>Logout</button>
            </span>
        </div>
    );
};

export default Navbar;
