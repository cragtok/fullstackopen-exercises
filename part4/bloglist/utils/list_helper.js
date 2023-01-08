const dummy = (blogs) => {
    blogs;
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
    const blog = blogs.find((blog) => blog.likes === maxLikes);
    return { title: blog.title, author: blog.author, likes: blog.likes };
};
module.exports = { favoriteBlog, dummy, totalLikes };
