import React from 'react';
import { Link } from 'react-router-dom';
import './css/NoPage.css';

const NoPage = () => {
    return (
        <div className="no-page-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="home-link">Go Back Home</Link>
        </div>
    );
};

export default NoPage;