const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

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

describe("when there are some blogs saved in the database", () => {
    test("all blogs are returned as json", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test("each blog has a property named 'id'", async () => {
        const blogs = await helper.blogsInDb();
        blogs.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    });
});

describe("addition of a new blog via a POST request to the /api/blogs endpoint", () => {
    test("successfully creates a new blog post with a HTTP 201 response", async () => {
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

    test("without a 'likes' property defaults it to 0", async () => {
        const newBlog = {
            title: "This Blog Has No Likes",
            author: "newAuthor",
            url: "http://www.blogs.com/this_blog_has_no_likes.html",
        };
        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body.likes).toBe(0);
    });

    test("without a 'title' or 'url' properties results in an HTTP 400 response ", async () => {
        const badBlogs = [helper.initialBlogs[0], helper.initialBlogs[1], {}];

        delete badBlogs[0].url;
        delete badBlogs[1].title;

        const promiseArray = badBlogs.map((blog) =>
            api
                .post("/api/blogs")
                .send(blog)
                .expect(400)
                .expect("Content-Type", /application\/json/)
        );
        await Promise.all(promiseArray);
    });
});

describe("deleting a blog via a DELETE request to the /api/blogs/:id endpoint", () => {
    test("succeeds with status code 204 when the id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        const blogIds = blogsAtEnd.map((r) => r.id);
        expect(blogIds).not.toContain(blogToDelete.id);
    });

    test("fails with status code 400 when the id is invalid", async () => {
        await api.delete("/api/blogs/w1334rwovwj3cw3sfwffefsfsf").expect(400);
    });
});

describe("updating a blog's likes via a PUT request to the /api/blogs/:id endpoint", () => {
    test("succeeds with status code 200 ", async () => {
        const initialBlogs = await helper.blogsInDb();
        const blogToUpdate = initialBlogs[3];
        blogToUpdate.likes += 1;
        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body.likes).toBe(blogToUpdate.likes);

        const blogsAtEnd = await helper.blogsInDb();
        const updatedBlog = blogsAtEnd.find(
            (blog) => blog.id === blogToUpdate.id
        );

        expect(updatedBlog.likes).toBe(blogToUpdate.likes);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
