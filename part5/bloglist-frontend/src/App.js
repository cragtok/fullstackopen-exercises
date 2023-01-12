import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginService.login({ username, password });
            setUser(response);
            setUsername("");
            setPassword("");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        Username:{" "}
                        <input
                            type="text"
                            name="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        Password:{" "}
                        <input
                            type="password"
                            name="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>blogs</h2>
            <div>{`${user.name} logged in`}</div>
            <br />
            <div>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default App;
