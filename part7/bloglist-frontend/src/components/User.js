import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useLoggedInUser } from "../hooks";

const User = () => {
    const id = useParams().id;
    const user = useSelector(state => state.users.find(user => user.id === id));

    const loggedInUser = useLoggedInUser();
    if (!loggedInUser.isLoggedIn()) {
        return null;
    }

    if (!user) {
        return (
            <div>
                <p>User not found</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            {user.blogs.map(blog => (
                <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default User;
