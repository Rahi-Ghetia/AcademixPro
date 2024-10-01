import React, { useState } from 'react';
import './css/CreateExamPage.css';

const CreateExamPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [questions, setQuestions] = useState([{ question: '', correct_answer: '' }]);
    const [statusMessage, setStatusMessage] = useState('');

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', correct_answer: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !startTime || !endTime || questions.some(q => !q.question || !q.correct_answer)) {
            setStatusMessage('All fields are required.');
            return;
        }

        const token = localStorage.getItem('token'); // Replace with your method of storing the token

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-exam/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    start_time: startTime,
                    end_time: endTime,
                    questions,
                    department
                }),
            });

            if (response.status === 201) {
                setStatusMessage('Exam created successfully.');
            } else {
                const errorData = await response.json();
                setStatusMessage(`Failed to create exam: ${errorData.error}`);
            }
        } catch (error) {
            setStatusMessage('An error occurred while creating the exam.');
        }
    };

    return (
        <div className="create-exam-container">
            <h1>Create Exam</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Questions:</label>
                    {questions.map((q, index) => (
                        <div key={index} className="question-group">
                            <input
                                type="text"
                                placeholder="Question"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Correct Answer"
                                value={q.correct_answer}
                                onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion}>Add Question</button>
                </div>
                <button type="submit">Create Exam</button>
            </form>
            {statusMessage && <div className="alert alert-info">{statusMessage}</div>}
        </div>
    );
};

export default CreateExamPage;