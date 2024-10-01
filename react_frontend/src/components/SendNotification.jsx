import React, { useState } from 'react';
import './css/SendNotification.css';

const SendNotification = () => {
    const [recipientType, setRecipientType] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recipientType || !subject || !message) {
            setStatusMessage('All fields are required.');
            return;
        }

        const token = localStorage.getItem('token'); // Replace with your method of storing the token

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/send-notification/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`, // Include the token in the headers
                },
                body: JSON.stringify({
                    recipient_type: recipientType,
                    subject,
                    message,
                }),
            });

            if (response.status === 201) {
                setStatusMessage('Notification sent successfully.');
            } else {
                const errorData = await response.json();
                setStatusMessage(`Failed to send notification: ${errorData.error}`);
            }
        } catch (error) {
            setStatusMessage('An error occurred while sending the notification.');
        }
    };

    return (
        <div className="send-notification-container">
            <h1>Send Notification</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="recipientType">Recipient Type:</label>
                    <select
                        id="recipientType"
                        value={recipientType}
                        onChange={(e) => setRecipientType(e.target.value)}
                    >
                        <option value="">Select Recipient</option>
                        <option value="students">Students</option>
                        <option value="faculty">Faculty</option>
                        <option value="both">Both</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
            {statusMessage && <div className="alert alert-info">{statusMessage}</div>}
        </div>
    );
};

export default SendNotification;