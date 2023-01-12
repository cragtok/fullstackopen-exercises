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
                        type="text"
                        name="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password:{" "}
                    <input
                        type="password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
