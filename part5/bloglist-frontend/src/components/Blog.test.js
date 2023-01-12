import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog's title and author, but not its URL or number of likes by default.", async () => {
    const blog = {
        title: "TEST",
        author: "author",
        url: "www.blog.com",
        likes: 12,
        user: { username: "username" },
    };

    const { container } = render(
        <Blog likeBlog={() => {}} removeBlog={() => {}} blog={blog} />
    );

    const titleAuthor = container.querySelector(".blog-titleAuthor");
    const likes = container.querySelector("blog-likes");
    const url = container.querySelector("blog-url");

    expect(titleAuthor).toBeDefined();
    expect(titleAuthor).toHaveTextContent("TEST author ");

    expect(likes).toBeDefined();
    expect(url).toBeDefined();
});
