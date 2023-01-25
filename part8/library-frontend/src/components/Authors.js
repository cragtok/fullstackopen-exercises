import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

import EditAuthor from "./EditAuthor";

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS);
    const [editAuthor, mutationResult] = useMutation(EDIT_AUTHOR);
    const [error, setError] = useState("");

    useEffect(() => {
        if (mutationResult.data && mutationResult.data.editAuthor === null) {
            setError("Person not found");
        }
        const timerRef = setTimeout(() => {
            setError("");
        }, 3000);

        return () => clearTimeout(timerRef);
    }, [mutationResult.data]);

    const editAuthorBirthYear = (name, birthYear) => {
        editAuthor({ variables: { name, setBornTo: birthYear } });
    };

    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>Loading...</div>;
    }

    const authors = [...result.data.allAuthors];
    return (
        <div>
            <h2>authors</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <EditAuthor editAuthor={editAuthorBirthYear} />
        </div>
    );
};

export default Authors;
