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

afterAll(() => {
    mongoose.connection.close();
});
