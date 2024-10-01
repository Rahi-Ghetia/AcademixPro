import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/TakeExamPage.css';

const TakeExamPage = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchExam = async () => {
            const token = localStorage.getItem('token'); // Replace with your method of storing the token

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/exams/${examId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setExam(data);
                } else {
                    setStatusMessage('Failed to fetch exam.');
                }
            } catch (error) {
                setStatusMessage('An error occurred while fetching the exam.');
            }
        };

        fetchExam();
    }, [examId]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers({
            ...answers,
            [questionId]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Replace with your method of storing the token

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/submit-answers/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    answers: Object.keys(answers).map(questionId => ({
                        question_id: questionId,
                        answer: answers[questionId],
                    })),
                }),
            });

            if (response.ok) {
                setStatusMessage('Answers submitted successfully.');
            } else {
                setStatusMessage('Failed to submit answers.');
            }
        } catch (error) {
            setStatusMessage('An error occurred while submitting the answers.');
        }
    };

    return (
        <div className="take-exam-container">
            <h1>Take Exam</h1>
            {statusMessage && <div className="alert alert-info">{statusMessage}</div>}
            {exam && (
                <form onSubmit={handleSubmit}>
                    <h2>{exam.title}</h2>
                    <p>{exam.description}</p>
                    {exam.questions.map((q) => (
                        <div key={q.id} className="question-group">
                            <p>{q.question}</p>
                            <input
                                type="text"
                                value={answers[q.id] || ''}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit Answers</button>
                </form>
            )}
        </div>
    );
};

export default TakeExamPage;