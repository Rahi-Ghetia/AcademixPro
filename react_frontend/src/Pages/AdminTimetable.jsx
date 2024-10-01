import React, { useEffect, useState } from 'react';
import './css/AdminTimetable.css';

const AdminTimetable = () => {
    const [timetables, setTimetables] = useState([]);
    const [error, setError] = useState('');
    const [selectedTimetable, setSelectedTimetable] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchTimetables = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timetables/admin/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setTimetables(data);
            } else {
                setError('Failed to fetch timetables');
            }
        } catch (error) {
            console.error('Error fetching timetables:', error);
            setError('Error fetching timetables');
        }
    };

    useEffect(() => {
        fetchTimetables();
    }, []);

    const handleRowClick = (timetable) => {
        setSelectedTimetable(timetable);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTimetable(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTimetable((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timetables/admin/${selectedTimetable.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    date: selectedTimetable.date,
                    start_time: selectedTimetable.start_time,
                    end_time: selectedTimetable.end_time,
                    total_hours: selectedTimetable.total_hours,
                    batch: selectedTimetable.batch,
                    subject: selectedTimetable.subject,
                })
            });
            if (response.ok) {
                setTimetables(timetables.map(t => t.id === selectedTimetable.id ? selectedTimetable : t));
                handleCloseModal();
            } else {
                const errorData = await response.json();
                setError(`Failed to update timetable: ${errorData.error}`);
            }
            fetchTimetables();
        } catch (error) {
            console.error('Error updating timetable:', error);
            setError('Error updating timetable');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timetables/admin/${selectedTimetable.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.ok) {
                setTimetables(timetables.filter(t => t.id !== selectedTimetable.id));
                handleCloseModal();
            } else {
                setError('Failed to delete timetable');
            }
        } catch (error) {
            console.error('Error deleting timetable:', error);
            setError('Error deleting timetable');
        }
    };

    return (
        <div className="admin-timetable-container">
            <h1>Admin Timetable</h1>
            {error && <div className="alert">{error}</div>}
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Faculty ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Hours</th>
                            <th>Batch</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetables.map((timetable) => (
                            <tr key={timetable.id} onClick={() => handleRowClick(timetable)}>
                                <td>{timetable.id}</td>
                                <td>{timetable.faculty.id}</td>
                                <td>{timetable.faculty.username}</td>
                                <td>{timetable.faculty.first_name}</td>
                                <td>{timetable.faculty.last_name}</td>
                                <td>{timetable.faculty.email}</td>
                                <td>{timetable.faculty.department}</td>
                                <td>{timetable.date}</td>
                                <td>{timetable.start_time}</td>
                                <td>{timetable.end_time}</td>
                                <td>{timetable.total_hours}</td>
                                <td>{timetable.batch}</td>
                                <td>{timetable.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-div">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Manage Timetable</h2>
                            <div className="modal-table-div">
                                <table className="modal-table">
                                    <tbody>
                                        <tr>
                                            <td>Faculty ID</td>
                                            <td>Username</td>
                                            <td>Department</td>
                                            <td>Date</td>
                                            <td>Start Time</td>
                                            <td>End Time</td>
                                            <td>Batch</td>
                                            <td>Subject</td>
                                        </tr>
                                        <tr>
                                            <td>{selectedTimetable.faculty.id}</td>
                                            <td>{selectedTimetable.faculty.username}</td>
                                            <td>{selectedTimetable.faculty.department}</td>
                                            <td><input type="date" name="date" value={selectedTimetable.date} onChange={handleInputChange} /></td>
                                            <td><input type="time" name="start_time" value={selectedTimetable.start_time} onChange={handleInputChange} /></td>
                                            <td><input type="time" name="end_time" value={selectedTimetable.end_time} onChange={handleInputChange} /></td>
                                            <td><input type="text" name="batch" value={selectedTimetable.batch} onChange={handleInputChange} /></td>
                                            <td><input type="text" name="subject" value={selectedTimetable.subject} onChange={handleInputChange} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button className='update-btn' onClick={handleUpdate}>Update</button>
                            <button className='delete-btn' onClick={handleDelete}>Delete</button>
                            <button className='cancel-btn' onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTimetable;