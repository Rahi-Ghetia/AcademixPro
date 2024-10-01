import React, { useEffect, useState } from 'react';
import './css/BatchTimetable.css';

const BatchTimetable = () => {
    const [timetables, setTimetables] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timetables/batch/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setTimetables(data);
                    setError('');
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError('An unexpected error occurred. Please try again.');
            }
        };

        fetchTimetables();
    }, []);

    return (
        <div className="batch-timetable-container">
            <h2>Your Timetable</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="timetable">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Subject</th>
                        <th>Faculty</th>
                        <th>Total Hrs.</th>
                    </tr>
                </thead>
                <tbody>
                    {timetables.map((timetable) => (
                        <tr key={timetable.id}>
                            <td data-label="Day">{timetable.day}</td>
                            <td data-label="Date">{timetable.date}</td>
                            <td data-label="Start Time">{timetable.start_time}</td>
                            <td data-label="End Time">{timetable.end_time}</td>
                            <td data-label="Subject">{timetable.subject}</td>
                            <td data-label="Faculty">
                                {timetable.faculty.first_name} {timetable.faculty.last_name}
                            </td>
                            <td data-label="Total Hrs.">{timetable.total_hours} hrs</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BatchTimetable;