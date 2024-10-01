import React, { useEffect, useState } from 'react';
import './css/FacultyTimetablePage.css';

const FacultyTimetablePage = () => {
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timetables/faculty/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTimetable(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchTimetable();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="faculty-timetable-container">
            <h1>Timetable</h1>
            <table>
                <thead>
                    <tr>
                        <th>Batch</th>
                        <th>Subject</th>
                        <th>Day of Week</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry) => (
                        <tr key={entry.id}>
                            <td data-label="Batch">{entry.batch}</td>
                            <td data-label="Subject">{entry.subject}</td>
                            <td data-label="Day of Week">{entry.day_of_week}</td>
                            <td data-label="Start Time">{entry.start_time}</td>
                            <td data-label="End Time">{entry.end_time}</td>
                            <td data-label="Total Hours">{entry.total_hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyTimetablePage;