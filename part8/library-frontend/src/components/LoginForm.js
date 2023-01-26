import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem("library-user-token", token);
        }
    }, [result.data]); //eslint-disable-line

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ variables: { username, password } });
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
