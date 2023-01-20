import React from "react";
import { useDispatch } from "react-redux";

import { logoutUser } from "../reducers/userReducer";
import { setBlogs } from "../reducers/blogsReducer";

import blogService from "../services/blogs";
import { setUsers } from "../reducers/usersReducer";

const Logout = ({ name }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
        window.localStorage.removeItem("loggedInUser");
        blogService.setToken(null);
        dispatch(setBlogs([]));
        dispatch(setUsers([]));
    };

    return (
        <div>
            {`${name} logged in`} <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
