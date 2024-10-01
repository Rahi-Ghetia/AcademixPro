import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/FacultyTimetableForm.css'; // Import the CSS file for styling

const FacultyTimetableForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        start_time: '',
        end_time: '',
        batch: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timetables/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/');
            } else {
                setError(data.error || 'Failed to add timetable.');
            }
        } catch (error) {
            console.error('There was an error adding the timetable!', error);
            setError('There was an error adding the timetable. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="faculty-timetable-form">
            <div className="form-group">
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Start Time:</label>
                <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>End Time:</label>
                <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Batch:</label>
                <input type="text" name="batch" value={formData.batch} onChange={handleChange} required />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="submit-button">Add Timetable</button>
        </form>
    );
};

export default FacultyTimetableForm;