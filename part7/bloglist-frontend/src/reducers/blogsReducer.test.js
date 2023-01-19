import blogsReducer from "./blogsReducer";
import deepFreeze from "deep-freeze";

const blogsArray = [
    {
        author: "user1",
        id: "1",
        likes: 0,
        title: "Blog Post1",
        url: "www.blogs.com",
        user: {
            id: "a",
            name: "user1",
            username: "user1",
        },
    },
    {
        author: "user2",
        id: "2",
        likes: 0,
        title: "Blog Post2",
        url: "www.blogs.com",
        user: {
            id: "b",
            name: "user2",
            username: "user2",
        },
    },
];

describe("blogsReducer", () => {
    test("should return new state upon creation of a new blog", () => {
        const initialState = [...blogsArray];
        deepFreeze(initialState);

        const action = {
            type: "blogs/addBlog",
            payload: {
                author: "user1",
                id: "3",
                likes: 0,
                title: "ADDED BY REDUCER - user1",
                url: "www.blogs.com",
                user: {
                    ...initialState[0]["user"],
                },
            },
        };
        const newState = blogsReducer(initialState, action);
        expect(newState).toHaveLength(initialState.length + 1);
        expect(newState.map(s => s.title)).toContainEqual(action.payload.title);
    });
    test("should return new state upon deletion of a new blog", () => {
        const initialState = [...blogsArray];
        deepFreeze(initialState);
        const action = {
            type: "blogs/removeBlog",
            payload: {
                id: "2",
            },
        };
        const newState = blogsReducer(initialState, action);
        expect(newState).toHaveLength(initialState.length - 1);
        expect(newState.map(s => s.id)).not.toContainEqual(action.payload.id);
    });
    test("should return new state upon liking a blog", () => {
        // Note: Change likeBlog reducer to pass test
        const initialState = [...blogsArray];
        deepFreeze(initialState);
        const action = {
            type: "blogs/likeBlog",
            payload: { ...initialState[0] },
        };
        const newState = blogsReducer(initialState, action);
        expect(newState).toHaveLength(initialState.length);
        const likedBlog = newState.find(blog => blog.id === action.payload.id);
        expect(likedBlog.likes).toBe(action.payload.likes + 1);
    });
});
