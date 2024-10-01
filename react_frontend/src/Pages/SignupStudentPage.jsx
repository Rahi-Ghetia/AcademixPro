import React, { useState } from 'react';
import './css/SignupStudentPage.css';
import { useNavigate } from 'react-router-dom';

const SignupStudentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_type: 'student',
    user: {
      // username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    },
    roll_number: '',
    enrollment_number: '',
    branch: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.user) {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup-student/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error during signup:', data);
        setError(data.error || 'An error occurred during signup.'); // Set error message from response
      } else {
        console.log('Signup successful:', data);
        setError(''); // Clear any previous error messages
        navigate('/')
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An unexpected error occurred. Please try again.'); // Set a generic error message
    }
  };

  return (
    <div className="signup-student-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        {/* <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.user.username}
            onChange={handleChange}
            required
            />
            </div> */}
        <div className="form-group">
          <label htmlFor="enrollment_number">Enrollment Number</label>
          <input
            type="text"
            name="enrollment_number"
            id="enrollment_number"
            value={formData.enrollment_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.user.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roll_number">Roll Number</label>
          <input
            type="text"
            name="roll_number"
            id="roll_number"
            value={formData.roll_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            name="branch"
            id="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up Student</button>
      </form>
    </div>
  );
};

export default SignupStudentPage;