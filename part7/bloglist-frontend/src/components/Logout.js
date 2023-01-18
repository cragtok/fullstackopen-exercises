import React from "react";

const Logout = ({ name, handleLogout }) => {
    return (
        <div>
            {`${name} logged in`} <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
