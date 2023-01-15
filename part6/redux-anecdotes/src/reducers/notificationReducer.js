import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
        removeNotification(state) {
            return initialState;
        },
    },
});

export const setNotification = (message, seconds) => {
    return async (dispatch) => {
        dispatch(showNotification(message));
        setTimeout(() => {
            dispatch(removeNotification());
        }, seconds * 1000);
    };
};

export const { showNotification, removeNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
