import { useState } from "react";

const Blog = ({ blog }) => {
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

    return (
        <div style={blogStyle}>
            {!visible ? (
                <div>
                    {blog.title} {blog.author}{" "}
                    <button onClick={toggleVisibility}>view</button>
                </div>
            ) : (
                <div>
                    <p>
                        {blog.title}{" "}
                        <button onClick={toggleVisibility}>hide</button>
                    </p>
                    <p>{blog.url}</p>
                    <p>
                        Likes {blog.likes}{" "}
                        <button onClick={() => {}}>likes</button>
                    </p>
                    <p>{blog.author}</p>
                </div>
            )}
        </div>
    );
};
export default Blog;
