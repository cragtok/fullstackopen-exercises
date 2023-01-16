import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timerRef: null,
    message: "",
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            if (state.timerRef !== null) {
                clearTimeout(state.timerRef);
            }
            return {
                timerRef: action.payload.timerRef,
                message: action.payload.message,
            };
        },
        removeNotification() {
            return { ...initialState };
        },
    },
});

export const setNotification = (message, seconds) => {
    return async (dispatch) => {
        const timerRef = setTimeout(() => {
            dispatch(removeNotification());
        }, seconds * 1000);
        dispatch(showNotification({ message, timerRef }));
    };
};

export const { showNotification, removeNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
