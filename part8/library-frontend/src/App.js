import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null);

    const client = useApolloClient();

    useEffect(() => {
        const loggedInUserToken =
            window.localStorage.getItem("library-user-token");
        if (loggedInUserToken) {
            setToken(loggedInUserToken);
        }
    }, []);

    const logout = () => {
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
            </div>

            <Authors show={page === "authors"} />
            <Books show={page === "books"} />
            <NewBook show={page === "add"} />
        </div>
    );
};

export default App;
