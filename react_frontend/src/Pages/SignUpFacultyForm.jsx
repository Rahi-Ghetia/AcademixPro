import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUpFacultyForm.css'; // Import the CSS file

const SignUpFacultyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    hire_date: '',
    subject: '',
    department: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.user) {
      setFormData((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup-faculty/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/success'); // Redirect to a success page or any other page
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error signing up!', error);
      setError('There was an error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-faculty-container">
      <form onSubmit={handleSubmit} className="signup-faculty-form">
        <h2>Sign Up Faculty</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label htmlFor="hire_date">Hire Date</label>
          <input
            type="date"
            name="hire_date"
            id="hire_date"
            value={formData.hire_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpFacultyForm;