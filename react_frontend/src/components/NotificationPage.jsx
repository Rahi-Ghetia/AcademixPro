import React, { useEffect, useState } from 'react';
import './css/NotificationPage.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token'); // Replace with your method of storing the token

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/notifications/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    setError('Failed to fetch notifications.');
                }
            } catch (error) {
                setError('An error occurred while fetching notifications.');
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="notifications-list">
                {notifications.map((notification) => (
                    <li key={notification.id} className="notification-item">
                        <h2>{notification.subject}</h2>
                        <p>{notification.message}</p>
                        <small>{new Date(notification.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;