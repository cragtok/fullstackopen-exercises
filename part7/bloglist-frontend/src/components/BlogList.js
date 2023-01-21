import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
};

const BlogList = ({ blogs }) => {
    if (blogs.length === 0) {
        return null;
    }

    return (
        <div>
            {blogs.map(blog => (
                <div style={blogStyle} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </Link>
                </div>
            ))}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
};
export default BlogList;
