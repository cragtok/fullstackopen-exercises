import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const addBlog = async (e) => {
        e.preventDefault();
        await createBlog({ title, author, url });
        setTitle("");
        setAuthor("");
        setUrl("");
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
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setAuthor(e.target.value)}
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
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="blog url..."
                    />
                </div>
                <button id="blog-create">Create</button>
            </form>
        </div>
    );
};

export default BlogForm;
