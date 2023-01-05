const Notification = ({ message, type }) => {
    return message && <div className={type}>{message}</div>;
};

export default Notification;
