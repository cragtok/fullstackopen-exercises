import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import { setBlogs } from "./reducers/blogsReducer";
import { setToken } from "./reducers/userReducer";

import "./App.css";

const App = () => {
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const blogs = useSelector(state =>
        [...state.blogs].sort((a, b) => b.likes - a.likes)
    );
    const notification = useSelector(state => state.notification);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setToken(user));
            blogService.setToken(user.token);
            blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
        }
    }, []);

    return (
        <div>
            {notification.message && notification.type && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
            {JSON.stringify(user) === "{}" ? (
                <>
                    <h2>Log in to application</h2>
                    <LoginForm />
                </>
            ) : (
                <>
                    <h2>blogs</h2>
                    <Logout name={user.name} />
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
