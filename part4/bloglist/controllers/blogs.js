const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!decodedToken.id) {
            return response
                .status(401)
                .json({ error: "token missing or invalid" });
        }
        const user = await User.findById(decodedToken.id);
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id,
        });
        const newBlog = await blog.save();
        user.blogs = user.blogs.concat(newBlog._id);
        await user.save();
        response.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!decodedToken.id) {
            return response
                .status(401)
                .json({ error: "token missing or invalid" });
        }
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return response.status(401).json({ error: "User not found" });
        }

        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(400).json({ error: "Blog not found" });
        }
        if (blog.user.toString() !== user._id.toString()) {
            return response.status(401).json({ error: "Authorization denied" });
        }
        user.blogs.filter((blog) => blog.toString() !== blog._id.toString());
        await user.save();
        await blog.delete();
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
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
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;
