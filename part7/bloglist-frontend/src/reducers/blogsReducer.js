import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        addBlog(state, action) {
            return [...state, action.payload];
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload);
        },
        updateBlog(state, action) {
            return state.map(blog =>
                blog.id === action.payload.id ? action.payload : blog
            );
        },
    },
});

export const fetchBlogs = () => {
    return async dispatch => {
        blogService.getAll().then(blogs => {
            dispatch(setBlogs(blogs));
        });
    };
};

export const createBlog = blog => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog);
            dispatch(addBlog(newBlog));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response.data.error };
        }
    };
};

export const deleteBlog = id => {
    return async dispatch => {
        let statusObj;
        try {
            await blogService.remove(id);
            statusObj = { success: true };
        } catch (error) {
            statusObj = { success: false, message: error.response.data.error };
        }
        dispatch(removeBlog(id));
        return statusObj;
    };
};

export const likeBlog = blog => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.update({
                ...blog,
                user: blog.user.id,
                likes: blog.likes + 1,
            });
            dispatch(updateBlog(updatedBlog));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response.data.error };
        }
    };
};

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
