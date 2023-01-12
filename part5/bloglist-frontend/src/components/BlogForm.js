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
                        type="text"
                        name="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    Author:{" "}
                    <input
                        type="text"
                        name="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div>
                    URL:{" "}
                    <input
                        type="text"
                        name="Url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );
};

export default BlogForm;
