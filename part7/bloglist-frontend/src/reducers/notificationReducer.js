import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    timerRef: null,
    type: "",
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            if (state.timerRef) {
                clearTimeout(state.timerRef);
            }
            return {
                type: action.payload.type,
                message: action.payload.message,
                timerRef: action.payload.time,
            };
        },
        removeNotification() {
            return { ...initialState };
        },
    },
});

export const displayNotification = (message, type, seconds) => {
    return async dispatch => {
        const timerRef = setTimeout(() => {
            dispatch(removeNotification());
        }, seconds * 1000);
        dispatch(setNotification({ message, type, timerRef }));
    };
};

export const { setNotification, removeNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
