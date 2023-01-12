import Blog from "./Blog";

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

export default BlogList;
