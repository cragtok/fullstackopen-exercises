import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { displayNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogsReducer";

import "./App.css";

const App = () => {
    // LoginForm
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const blogs = useSelector(state =>
        [...state.blogs].sort((a, b) => b.likes - a.likes)
    );
    const notification = useSelector(state => state.notification);

    useEffect(() => {
        blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const response = await loginService.login({ username, password });
            setUser(response);
            setUsername("");
            setPassword("");
            window.localStorage.clear();
            window.localStorage.setItem(
                "loggedInUser",
                JSON.stringify(response)
            );
            blogService.setToken(response.token);
        } catch (error) {
            console.error(error);
            dispatch(
                displayNotification(error.response.data.error, "error", 4)
            );
        }
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedInUser");
        blogService.setToken(null);
    };

    return (
        <div>
            {notification.message && notification.type && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
            {!user ? (
                <>
                    <h2>Log in to application</h2>
                    <LoginForm
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                    />
                </>
            ) : (
                <>
                    <h2>blogs</h2>
                    <Logout name={user.name} handleLogout={handleLogout} />
                    <br />
                    <h2>create new</h2>
                    <Togglable ref={blogFormRef} buttonLabel="Create New Post">
                        <BlogForm />
                    </Togglable>
                    <br />
                    <BlogList blogs={blogs} loggedInUser={user.username} />
                </>
            )}
        </div>
    );
};

export default App;
