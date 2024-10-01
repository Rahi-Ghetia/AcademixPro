import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import SignupStudentPage from './Pages/SignupStudentPage';
import LoginPage from './Pages/LoginPage';
import BatchTimetable from './Pages/BatchTimetable';
import FacultyTimetablePage from './Pages/FacultyTimetablePage';
import HomePage from './Pages/HomePage';
import SignUpFacultyForm from './Pages/SignUpFacultyForm';
import FacultyTimetableForm from './Pages/FacultyTimetableForm';
import AdminTimetable from './Pages/AdminTimetable';
import SendNotification from './components/SendNotification';
import Notifications from './components/NotificationPage';
import TakeExamPage from './ExamsPages/TakeExamPage';
import ListExamsPage from './ExamsPages/ListExamsPage';
import CreateExamPage from './ExamsPages/CreateExamPage';
import NoPage from './Pages/NoPage';

function App() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  useEffect(() => {
    setAuthToken(() => localStorage.getItem('token'));
    setUserRole(localStorage.getItem('userRole'));
  }, [localStorage.getItem('token')]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setError('Invalid Request Please Login First!');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setAuthToken('');
        navigate('/login');
      } else {
        console.error('Failed to log out');
        setError('Failed to log out');
      }
    } catch (error) {
      console.error('There was an error logging out!', error);
      setError('There was an error logging out!');
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">
            <img src="AcademixProNoBG.png" id="navBrandLogo" style={{ height: '40px' }} alt="Logo" />
            &nbsp;AcademixPro
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {authToken && (
                <>
                  <li className="nav-item">
                    <Link to='/notifications' className="nav-link">Notifications</Link>
                  </li>
                  {userRole === 'student' && (<>
                    <li className="nav-item">
                      <Link to='/batchtimetable' className="nav-link">Time&nbsp;Table</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/listexams' className="nav-link">Exams</Link>
                    </li>
                  </>)}
                  {userRole === 'faculty' && (<>
                    <li className="nav-item">
                      <Link to='/facultytimetable' className="nav-link">Faculty Timetable</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/facultytimetableform' className="nav-link">Add Timetable</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/createExam' className="nav-link">Create Exam</Link>
                    </li>
                  </>)}
                  {userRole === 'superuser' && (
                    <>
                      <li className="nav-item">
                        <Link to='/signupstudent' className="nav-link">Sign Up Student</Link>
                      </li>
                      <li className="nav-item">
                        <Link to='/signupfaculty' className="nav-link">Sign Up Faculty</Link>
                      </li>
                      <li className="nav-item">
                        <Link to='/admintimetable' className="nav-link">Admin Timetable</Link>
                      </li>
                      <li className="nav-item">
                        <Link to='/sendnotification' className="nav-link">Send Notification</Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
            <div className="d-flex me-4">
              {authToken ? (
                <button onClick={handleLogout} className="btn btn-outline-danger" type="submit">Logout</button>
              ) : (
                <Link to='/login' className="btn btn-outline-success" type="submit" style={{ textDecoration: 'None' }}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav >
      {error !== '' && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )
      }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {userRole === 'student' && <>
          <Route path="/batchtimetable" element={<BatchTimetable />} />
          <Route path="/listexams" element={<ListExamsPage />} />
          <Route path="/take-exam/:examId" element={<TakeExamPage />} />
        </>}
        {userRole === 'faculty' && <>
          <Route path="/facultytimetable" element={<FacultyTimetablePage />} />
          <Route path="/facultytimetableform" element={<FacultyTimetableForm />} />
          <Route path="/createExam" element={<CreateExamPage />} />
        </>}
        {userRole === 'superuser' && <>
          <Route path="/signupstudent" element={<SignupStudentPage />} />
          <Route path="/signupfaculty" element={<SignUpFacultyForm />} />
          <Route path="/admintimetable" element={<AdminTimetable />} />
          <Route path="/sendnotification" element={<SendNotification />} />
        </>}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div >
  );
}

export default App;