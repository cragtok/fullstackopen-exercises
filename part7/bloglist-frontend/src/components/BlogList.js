import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, loggedInUser }) => {
    if (blogs.length === 0) {
        return null;
    }

    return (
        <div>
            {blogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    showDeleteButton={blog.user.id === loggedInUser.user.id}
                />
            ))}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
};
export default BlogList;
