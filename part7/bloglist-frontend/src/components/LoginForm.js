import React from "react";

const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username:{" "}
                    <input
                        id="login-username"
                        type="text"
                        name="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password:{" "}
                    <input
                        id="login-password"
                        type="password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button id="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
