import { useState, useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css";

const App = () => {
    const [blogs, setBlogs] = useState([]);

    // LoginForm
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    // Notification
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState("");

    const blogFormRef = useRef();

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => a.likes < b.likes)));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const createBlog = async (newBlog) => {
        try {
            const createdBlog = await blogService.create(newBlog);
            blogFormRef.current.toggleVisibility();
            setBlogs(blogs.concat(createdBlog));
            displayNotification(
                `a new blog post ${createdBlog.title} by ${createdBlog.author} added`,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayNotification(error.response.data.error, "error");
        }
    };

    const likeBlog = async (oldBlog) => {
        try {
            const updatedBlog = await blogService.update({
                ...oldBlog,
                likes: oldBlog.likes + 1,
                user: oldBlog.user.id,
            });
            setBlogs(
                blogs
                    .map((blog) =>
                        blog.id === updatedBlog.id ? updatedBlog : blog
                    )
                    .sort((a, b) => a.likes < b.likes)
            );
            displayNotification(
                `Blog post ${updatedBlog.title} liked`,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayNotification(error.response.data.error, "error");
        }
    };

    const removeBlog = async (id) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        try {
            await blogService.remove(id);
            setBlogs(
                blogs
                    .filter((blog) => blog.id !== id)
                    .sort((a, b) => a.likes < b.likes)
            );
            displayNotification("Blog post deleted", "success");
        } catch (error) {
            console.error(error);
            displayNotification(error.response.data.error, "error");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginService.login({ username, password });
            setUser(response);
            setUsername("");
            setPassword("");
            window.localStorage.setItem(
                "loggedInUser",
                JSON.stringify(response)
            );
        } catch (error) {
            console.error(error);
            displayNotification(error.response.data.error, "error");
        }
    };

    const displayNotification = (message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setTimeout(() => {
            setNotificationMessage("");
            setNotificationType("");
        }, 3500);
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedInUser");
    };

    return (
        <div>
            {notificationMessage && notificationType && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
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
