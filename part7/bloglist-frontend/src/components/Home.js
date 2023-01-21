import React, { useRef } from "react";

import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

import { useLoggedInUser } from "../hooks";

const Home = ({ blogs }) => {
    const blogFormRef = useRef();

    const loggedInUser = useLoggedInUser();
    if (!loggedInUser.isLoggedIn()) {
        return null;
    }

    return (
        <div>
            <>
                <h2>Blog App</h2>
                <Togglable
                    title="create new"
                    ref={blogFormRef}
                    buttonLabel="Create New Post"
                >
                    <BlogForm
                        toggleVisibility={() => {
                            blogFormRef.current.toggleVisibility();
                        }}
                    />
                </Togglable>
                <br />
                <BlogList blogs={blogs} />
            </>
        </div>
    );
};

export default Home;
