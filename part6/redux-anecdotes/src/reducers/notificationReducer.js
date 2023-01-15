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

export const { showNotification, removeNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
