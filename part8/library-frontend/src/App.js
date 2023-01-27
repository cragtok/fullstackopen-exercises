import {
    useQuery,
    useMutation,
    useSubscription,
    useApolloClient,
} from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null);

    const client = useApolloClient();

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded;
            window.alert(`New Book ${addedBook.title} added!`);
            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(addedBook),
                };
            });
        },
    });

    useEffect(() => {
        const loggedInUserToken =
            window.localStorage.getItem("library-user-token");
        if (loggedInUserToken) {
            setToken(loggedInUserToken);
        }
    }, []);

    const logout = () => {
        setPage("authors");
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    if (!token) {
        return <LoginForm setToken={setToken} />;
    }

    return (
        <div>
            <div>
                <button onClick={logout}>logout</button>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("add")}>add book</button>
                <button onClick={() => setPage("recommended")}>
                    recommended
                </button>
            </div>

            <Authors show={page === "authors"} />
            <Books show={page === "books"} />
            <NewBook show={page === "add"} />
            <Recommended show={page === "recommended"} />
        </div>
    );
};

export default App;
