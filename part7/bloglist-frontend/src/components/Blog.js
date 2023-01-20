import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { displayNotification } from "../reducers/notificationReducer";
import { removeUserBlog } from "../reducers/usersReducer";

const Blog = ({ blog, showDeleteButton }) => {
    const dispatch = useDispatch();

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

    const handleLike = async () => {
        const statusObj = await dispatch(likeBlog(blog));
        if (statusObj.success) {
            dispatch(
                displayNotification(
                    `Blog post ${blog.title} liked`,
                    "success",
                    4
                )
            );
        } else {
            dispatch(displayNotification(statusObj.message, "error", 4));
        }
    };

    const handleRemove = async () => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        const statusObj = await dispatch(deleteBlog(blog.id));
        if (statusObj.success) {
            dispatch(displayNotification("Blog post deleted", "success", 4));
            dispatch(removeUserBlog({ blogId: blog.id, userId: blog.user.id }));
        } else {
            dispatch(displayNotification(statusObj.message, "error", 4));
        }
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
                        <button onClick={handleLike}>like</button>
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
