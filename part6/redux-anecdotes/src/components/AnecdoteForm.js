import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
    showNotification,
    removeNotification,
} from "../reducers/notificationReducer";
import noteService from "../services/anecdotes";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        console.log("content", content);
        e.target.anecdote.value = "";
        const newAnecdote = await noteService.createNew(content);
        dispatch(createAnecdote(newAnecdote));
        dispatch(showNotification("Created anecdote!"));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
