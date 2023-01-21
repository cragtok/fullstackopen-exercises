const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id).populate("user", {
            username: 1,
            name: 1,
        });
        if (blog) {
            response.json(blog);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body;
    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    try {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id,
        });
        const newBlog = await blog.save();
        user.blogs = user.blogs.concat(newBlog._id);
        await user.save();
        await newBlog.populate("user", { username: 1, name: 1 });
        response.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const user = request.user;
        if (!user) {
            return response
                .status(401)
                .json({ error: "token missing or invalid" });
        }

        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(400).json({ error: "Blog not found" });
        }
        if (blog.user.toString() !== user._id.toString()) {
            return response.status(401).json({ error: "Authorization denied" });
        }
        user.blogs = user.blogs.filter(
            blog => blog.id.toString() !== blog._id.toString()
        );
        await user.save();
        await blog.delete();
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body;

    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user,
    };
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        );
        await updatedBlog.populate("user", { username: 1, name: 1 });
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

// Blog Comment Routers

blogsRouter.post("/:id/comments", async (request, response, next) => {
    const body = request.body;
    const comment = body.comment;
    const user = request.user;

    if (!user) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    if (!comment || comment.length < 1) {
        return response.status(400).json({ error: "Comment missing" });
    }

    try {
        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(400).json({ error: "Blog not found" });
        }
        blog.comments = blog.comments.concat(comment);
        await blog.save();
        response.status(201).json({ comment });
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;
