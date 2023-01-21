import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Notification from "./components/Notification";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import User from "./components/User";

import blogService from "./services/blogs";
import usersService from "./services/users";

import { setBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";
import { setUsers } from "./reducers/usersReducer";

import "./App.css";
import Logout from "./components/Logout";

const App = () => {
    const dispatch = useDispatch();

    const notification = useSelector(state => state.notification);
    const users = useSelector(state =>
        [...state.users].sort((a, b) => b.blogs.length - a.blogs.length)
    );
    const blogs = useSelector(state =>
        [...state.blogs].sort((a, b) => b.likes - a.likes)
    );

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
            blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
            usersService.getAll().then(users => dispatch(setUsers(users)));
        }
    }, []);

    const isLoggedIn = () => {
        return window.localStorage.getItem("loggedInUser") !== null
            ? true
            : false;
    };

    return (
        <div>
            {notification.message && notification.type && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
            {isLoggedIn() && (
                <>
                    <h2>blogs</h2>
                    <Logout />
                    <br />
                </>
            )}

            <Routes>
                <Route
                    path="/users/:id"
                    element={
                        isLoggedIn() ? (
                            <User />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="/users"
                    element={
                        isLoggedIn() ? (
                            <Users users={users} />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        isLoggedIn() ? (
                            <Navigate replace to="/" />
                        ) : (
                            <LoginForm />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        isLoggedIn() ? (
                            <Home blogs={blogs} />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
