import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/ListExamsPage.css';

const ListExamsPage = () => {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExams = async () => {
            const token = localStorage.getItem('token'); // Replace with your method of storing the token

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/list-exams/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setExams(data);
                } else {
                    setError('Failed to fetch exams.');
                }
            } catch (error) {
                setError('An error occurred while fetching exams.');
            }
        };

        fetchExams();
    }, []);

    return (
        <div className="exams-list-container">
            <h1>Exams</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {exams.length === 0 ?
                <div className="not-test-div">There are no test available</div>
                :
                <ul className="exams-list">
                    {exams.map((exam) => (
                        <li key={exam.id} className="exam-item">
                            <h2>{exam.title}</h2>
                            <p>{exam.description}</p>
                            <small>Created by: {exam.created_by}</small>
                            <br />
                            <small>Start Time: {new Date(exam.start_time).toLocaleString()}</small>
                            <br />
                            <small>End Time: {new Date(exam.end_time).toLocaleString()}</small>
                            <br />
                            <Link to={`/take-exam/${exam.id}`}>Take Exam</Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default ListExamsPage;