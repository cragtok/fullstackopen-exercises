import React, { useState } from "react";
import { useDispatch } from "react-redux";

import blogService from "../services/blogs";

import { displayNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { fetchBlogs } from "../reducers/blogsReducer";
import { fetchUsers } from "../reducers/usersReducer";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async e => {
        e.preventDefault();
        const statusObj = await dispatch(loginUser(username, password));

        if (statusObj.success) {
            setUsername("");
            setPassword("");
            window.localStorage.clear();
            window.localStorage.setItem(
                "loggedInUser",
                JSON.stringify(statusObj.loggedInUser)
            );
            blogService.setToken(statusObj.loggedInUser.token);
            dispatch(fetchBlogs());
            dispatch(fetchUsers());
        } else {
            dispatch(displayNotification(statusObj.message, "error", 4));
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username:{" "}
                    <input
                        id="login-username"
                        type="text"
                        name="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password:{" "}
                    <input
                        id="login-password"
                        type="password"
                        name="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button id="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
