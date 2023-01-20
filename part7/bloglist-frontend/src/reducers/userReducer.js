import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});

export const setToken = user => {
    return async dispatch => {
        dispatch(setUser(user));
    };
};

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const loggedInUser = await loginService.login({
                username,
                password,
            });
            dispatch(setUser(loggedInUser));
            return { success: true, loggedInUser };
        } catch (error) {
            return { success: false, message: error.response.data.error };
        }
    };
};

export const logoutUser = () => {
    return async dispatch => {
        dispatch(setUser({}));
    };
};
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
