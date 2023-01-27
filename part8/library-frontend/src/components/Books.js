import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";
const Books = (props) => {
    const [filterValue, setFilterValue] = useState("");
    const [filterTerm, setFilterTerm] = useState("");

    const result = useQuery(ALL_BOOKS);

    const filteredResult = useQuery(ALL_BOOKS, {
        variables: {
            genre: filterTerm,
        },
        skip: !filterTerm,
        fetchPolicy: "network-only",
    });

    if (!props.show) {
        return null;
    }

    if (result.loading || filteredResult.loading) {
        return <div>Loading...</div>;
    }

    const books = (filterTerm ? filteredResult : result).data.allBooks.map(
        (book) => book
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
