import { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlog, showDeleteButton }) => {
    const [visible, setVisible] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLike = () => {
        likeBlog(blog);
    };

    const handleRemove = () => {
        removeBlog(blog.id);
    };
    return (
        <div style={blogStyle}>
            {!visible ? (
                <div className="blog-titleAuthor">
                    {blog.title} {blog.author}{" "}
                    <button onClick={toggleVisibility}>view</button>
                </div>
            ) : (
                <div>
                    <p>
                        {blog.title}{" "}
                        <button onClick={toggleVisibility}>hide</button>
                    </p>
                    <p className="blog-url">{blog.url}</p>
                    <p className="blog-likes">
                        Likes {blog.likes}{" "}
                        <button onClick={handleLike}>likes</button>
                    </p>
                    <p>{blog.author}</p>
                    {showDeleteButton && (
                        <button onClick={handleRemove}>Delete</button>
                    )}
                </div>
            )}
        </div>
    );
};
export default Blog;
