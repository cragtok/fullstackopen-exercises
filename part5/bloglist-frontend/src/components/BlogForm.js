import React from "react";

const BlogForm = ({
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
    createBlog,
}) => {
    return (
        <div>
            <form onSubmit={createBlog}>
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
