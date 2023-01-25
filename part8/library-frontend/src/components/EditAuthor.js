import React, { useState } from "react";

const EditAuthor = ({ editAuthor, authors }) => {
    const [author, setAuthor] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        editAuthor(author, Number(birthYear));
        setBirthYear("");
    };
    return (
        <div>
            <h2>Set Birth Year</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Author</label>
                    <select
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}>
                        <option value="">Select author...</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Birth Year: </label>
                    <input
                        type="number"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                    />
                </div>
                <button>Update Author</button>
            </form>
        </div>
    );
};

export default EditAuthor;
