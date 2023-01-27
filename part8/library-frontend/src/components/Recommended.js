import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = (props) => {
    const meResult = useQuery(ME);

    const booksResult = useQuery(ALL_BOOKS, {
        variables: {
            genre: meResult.data ? meResult.data.me.favouriteGenre : null,
        },
        skip: !meResult,
    });

    if (!props.show) {
        return null;
    }

    if (meResult.loading || booksResult.loading) {
        return <p>loading...</p>;
    }

    return (
        <div>
            <h2>recommended</h2>
            <p>
                books in your favourite genre{" "}
                <strong>{meResult.data.me.favouriteGenre}</strong>
            </p>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                        <th>genres</th>
                    </tr>

                    {booksResult.data &&
                        booksResult.data.allBooks.map((a) => (
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

export default Recommended;
