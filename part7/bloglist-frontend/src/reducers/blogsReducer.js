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
            return state.filter(blog => blog.id !== action.payload.id);
        },
        likeBlog(state, action) {
            return state.map(blog =>
                blog.id === action.payload.id ? action.payload : blog
            );
        },
    },
});

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
        try {
            await blogService.remove(id);
            dispatch(removeBlog(id));
            return true;
        } catch (error) {
            return false;
        }
    };
};

export const like = blog => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.update(blog);
            dispatch(likeBlog(updatedBlog));
        } catch (error) {
            null;
        }
    };
};

export const { setBlogs, addBlog, removeBlog, likeBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
