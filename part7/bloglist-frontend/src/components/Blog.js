import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedInUser } from "../hooks";

import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { displayNotification } from "../reducers/notificationReducer";
import { removeUserBlog } from "../reducers/usersReducer";

const Blog = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const navigate = useNavigate();
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id));

    const loggedInUser = useLoggedInUser();

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
            navigate("/");
        } else {
            dispatch(displayNotification(statusObj.message, "error", 4));
        }
    };

    if (!blog) {
        return <p>Blog not found</p>;
    }

    const showDeleteButton = blog.user.id === loggedInUser.user.id;

    return (
        <div>
            <h1>{blog.title} </h1>
            <br />
            <a
                className="blog-url"
                href={
                    blog.url.includes("http://")
                        ? blog.url
                        : `http://${blog.url}`
                }
            >
                {blog.url}
            </a>
            <p className="blog-likes">
                {blog.likes} likes <button onClick={handleLike}>like</button>
            </p>
            <p> added by {blog.author}</p>
            {showDeleteButton && <button onClick={handleRemove}>Delete</button>}
            <div>
                <h2>comments</h2>
                {blog.comments.length > 0 &&
                    blog.comments.map(comment => (
                        <li key={crypto.randomUUID()}>{comment}</li>
                    ))}
            </div>
        </div>
    );
};
export default Blog;
