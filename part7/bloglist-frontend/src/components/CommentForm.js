import React, { useState } from "react";

const CommentForm = ({ addComment }) => {
    const [comment, setComment] = useState("");
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addComment(comment);
                }}
            >
                <input
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button>Add Comment</button>
            </form>
        </div>
    );
};

export default CommentForm;
