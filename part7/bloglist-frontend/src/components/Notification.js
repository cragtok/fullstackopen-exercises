import React from "react";

const Notification = ({ message, type }) => {
    return (
        <div>
            <div className={`notification-${type}`}>{message}</div>
        </div>
    );
};

export default Notification;
