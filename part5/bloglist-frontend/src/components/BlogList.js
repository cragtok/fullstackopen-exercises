import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, likeBlog, removeBlog }) => {
    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    removeBlog={removeBlog}
                    likeBlog={likeBlog}
                />
            ))}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
};
export default BlogList;
