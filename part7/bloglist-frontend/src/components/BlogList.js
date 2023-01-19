import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, loggedInUser }) => {
    return (
        <div>
            {blogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    showDeleteButton={blog.user.username === loggedInUser}
                />
            ))}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
};
export default BlogList;
