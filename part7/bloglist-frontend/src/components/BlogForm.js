import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { displayNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const dispatch = useDispatch();

    const addBlog = async e => {
        e.preventDefault();
        const statusObj = await dispatch(createBlog({ title, author, url }));
        if (statusObj.success) {
            dispatch(
                displayNotification(
                    `a new blog post ${title} by ${author} added`,
                    "success",
                    4
                )
            );
            setTitle("");
            setAuthor("");
            setUrl("");
        } else {
            dispatch(displayNotification(statusObj.message, "error", 4));
        }
    };
    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    Title:{" "}
                    <input
                        id="blog-title"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="blog title..."
                    />
                </div>

                <div>
                    Author:{" "}
                    <input
                        id="blog-author"
                        type="text"
                        name="Author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        placeholder="blog author..."
                    />
                </div>

                <div>
                    URL:{" "}
                    <input
                        id="blog-url"
                        type="text"
                        name="Url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="blog url..."
                    />
                </div>
                <button id="blog-create">Create</button>
            </form>
        </div>
    );
};

export default BlogForm;
