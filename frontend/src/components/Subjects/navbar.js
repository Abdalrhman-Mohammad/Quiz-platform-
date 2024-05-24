// Navbar.js
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Navbar = () => {
    const { subjectId } = useParams();

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/subject/users/${subjectId}/students`}>Participants</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/subject/users/${subjectId}/exams`}>Exams</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
