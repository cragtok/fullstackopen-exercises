import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);

    // LoginForm
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    // BlogForm
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const createBlog = async (e) => {
        e.preventDefault();
        const newBlog = {
            title,
            author,
            url,
        };
        try {
            const createdBlog = await blogService.create(newBlog);
            setBlogs(blogs.concat(createdBlog));
        } catch (error) {
            console.error(error);
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
        }
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedInUser");
    };

    return (
        <div>
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
                    <BlogForm
                        title={title}
                        author={author}
                        url={url}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setUrl={setUrl}
                        createBlog={createBlog}
                    />
                    <br />
                    <BlogList blogs={blogs} />
                </>
            )}
        </div>
    );
};

export default App;
