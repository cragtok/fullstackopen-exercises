import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";

import blogService from "./services/blogs";
import usersService from "./services/users";

import { setBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";

import "./App.css";
import { setUsers } from "./reducers/usersReducer";

const App = () => {
    const blogFormRef = useRef();

    const dispatch = useDispatch();

    const blogs = useSelector(state =>
        [...state.blogs].sort((a, b) => b.likes - a.likes)
    );
    const notification = useSelector(state => state.notification);
    const user = useSelector(state => state.user);
    const users = useSelector(state =>
        [...state.users].sort((a, b) => b.blogs.length - a.blogs.length)
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
                    <h2>Users</h2>
                    <Users users={users} />
                    <br />
                    <h2>create new</h2>
                    <Togglable ref={blogFormRef} buttonLabel="Create New Post">
                        <BlogForm
                            toggleVisibility={() => {
                                blogFormRef.current.toggleVisibility();
                            }}
                        />
                    </Togglable>
                    <br />
                    <BlogList blogs={blogs} loggedInUser={user.username} />
                </>
            )}
        </div>
    );
};

export default App;
