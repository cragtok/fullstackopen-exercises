import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { setBlogs } from "../reducers/blogsReducer";

import blogService from "../services/blogs";
import { setUsers } from "../reducers/usersReducer";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        window.localStorage.removeItem("loggedInUser");
        blogService.setToken(null);
        dispatch(setBlogs([]));
        dispatch(setUsers([]));
        navigate("/");
    };

    if (!loggedInUser) {
        return null;
    }
    return (
        <div>
            {`${loggedInUser.name} logged in`}{" "}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
