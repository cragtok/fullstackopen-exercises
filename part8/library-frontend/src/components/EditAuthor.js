import React, { useState } from "react";

const EditAuthor = ({ editAuthor }) => {
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        editAuthor(name, Number(birthYear));
        setName("");
        setBirthYear("");
    };
    return (
        <div>
            <h2>Set Birth Year</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
