
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './style.css';  // This should be Header.css to match with the file name.
import mainlogo from "./mainlogo.png";
import { useUser } from './UserContext';

function Headerinst() {
    const { setIsLoggedIn,userId } = useUser();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
        navigate("/login");
    };
    return (
        <header className='header-stu'>
            <div className="logo">
                <Link to="/"><img src={mainlogo} alt="University of Texas at Arlington" style={{height: '40px'}} /></Link>
            </div>
            <h1>InstructorDashboard</h1>
            <nav className="main-nav">
                <ul className="links">
                    <li><Link to={`/instructorDashboard/${userId}`}>Home</Link></li>
                    <li><Link to="/login" onClick={handleLogout}>LogOut</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Headerinst;
