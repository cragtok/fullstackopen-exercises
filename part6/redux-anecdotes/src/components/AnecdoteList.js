import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
    showNotification,
    removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch();

    const anecdotes = useSelector(({ anecdotes, filterStr }) =>
        anecdotes
            .filter((anecdote) =>
                anecdote.content.toLowerCase().includes(filterStr.toLowerCase())
            )
            .sort((a, b) => b.votes > a.votes)
    );

    const vote = (anecdote) => {
        console.log("vote", anecdote.id);
        dispatch(voteAnecdote(anecdote));
        dispatch(showNotification(`voted for anecdote!`));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };
    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
