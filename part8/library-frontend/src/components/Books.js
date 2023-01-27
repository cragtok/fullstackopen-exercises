import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";
const Books = (props) => {
    const result = useQuery(ALL_BOOKS);
    const [filterValue, setFilterValue] = useState("");
    const [filterTerm, setFilterTerm] = useState("");

    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>Loading...</div>;
    }

    const books = result.data.allBooks
        .map((book) => book)
        .filter((book) =>
            filterTerm ? book.genres.includes(filterTerm.toLowerCase()) : book
        );

    return (
        <div>
            <h2>books</h2>

            <div>
                <label>Filter by genre: </label>
                <input
                    value={filterValue}
                    onChange={(e) => {
                        setFilterValue(e.target.value);
                    }}
                />
                {filterTerm && (
                    <button
                        onClick={(e) => {
                            setFilterTerm("");
                            setFilterValue("");
                        }}>
                        Clear
                    </button>
                )}
                <button
                    onClick={(e) => {
                        setFilterTerm(filterValue);
                    }}>
                    Filter
                </button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                        <th>genres</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                            <td>{a.genres.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
