import React from "react";
import { Link } from "react-router-dom";

import { useLoggedInUser } from "../hooks";

const Users = ({ users }) => {
    const loggedInUser = useLoggedInUser();
    if (!loggedInUser.isLoggedIn()) {
        return null;
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>{" "}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {user.blogs.length}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
