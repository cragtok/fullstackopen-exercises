const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blogs");

jest.setTimeout(20000);
beforeEach(async () => {
    console.log("Deleting blogs");
    await Blog.deleteMany({});
    console.log("Blogs deleted");
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    console.log("Adding blogs");
    await Promise.all(promiseArray);
    console.log("Blogs added");
});

test("all blogs are returned", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique property of the blog posts is named id", async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
        expect(blog.id).toBeDefined();
    });
});

test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    const newBlog = {
        title: "Type wars 2",
        author: "Robert C. Martin2",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 22,
    };
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();
    const titles = blogs.map((b) => b.title);
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("Type wars 2");
});

afterAll(() => {
    mongoose.connection.close();
});
