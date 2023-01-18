import { useState, useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { displayNotification } from "./reducers/notificationReducer";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const [blogs, setBlogs] = useState([]);

    // LoginForm
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    const dispatch = useDispatch();

    const notification = useSelector(state => state.notification);

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const createBlog = async newBlog => {
        let success = false;
        try {
            const createdBlog = await blogService.create(newBlog);
            blogFormRef.current.toggleVisibility();
            setBlogs(blogs.concat(createdBlog));
            dispatch(
                displayNotification(
                    `a new blog post ${createdBlog.title} by ${createdBlog.author} added`,
                    "success",
                    4
                )
            );
            success = true;
        } catch (error) {
            console.error(error);
            dispatch(
                displayNotification(error.response.data.error, "error", 4)
            );
        }
        return success;
    };

    const likeBlog = async oldBlog => {
        try {
            const updatedBlog = await blogService.update({
                ...oldBlog,
                likes: oldBlog.likes + 1,
                user: oldBlog.user.id,
            });
            setBlogs(
                blogs
                    .map(blog =>
                        blog.id === updatedBlog.id ? updatedBlog : blog
                    )
                    .sort((a, b) => b.likes - a.likes)
            );
            dispatch(
                displayNotification(
                    `Blog post ${updatedBlog.title} liked`,
                    "success",
                    4
                )
            );
        } catch (error) {
            console.error(error);
            dispatch(
                displayNotification(error.response.data.error, "error", 4)
            );
        }
    };

    const removeBlog = async id => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        try {
            await blogService.remove(id);
            setBlogs(
                blogs
                    .filter(blog => blog.id !== id)
                    .sort((a, b) => b.likes - a.likes)
            );
            dispatch(displayNotification("Blog post deleted", "success", 4));
        } catch (error) {
            console.error(error);
            dispatch(
                displayNotification(error.response.data.error, "error", 4)
            );
        }
    };

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
                        <BlogForm createBlog={createBlog} />
                    </Togglable>
                    <br />
                    <BlogList
                        removeBlog={removeBlog}
                        likeBlog={likeBlog}
                        blogs={blogs}
                        loggedInUser={user.username}
                    />
                </>
            )}
        </div>
    );
};

export default App;
