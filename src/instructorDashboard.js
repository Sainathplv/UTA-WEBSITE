import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./style.css";  // Your CSS
import HeaderInstructor from "./Header_instr"
import Footer from "./Footer";
import EditProfile from "./editprofile";
import { useUser } from './UserContext';
import ChatApp from "./chat";
import CourseManagement from "./coursemanagement";
import StudentFeedback from "./feedback";
import ExamDesign from "./examdesign";
import GradeExams from "./grades";
import StudentProgress from "./studentProgress";
import { BASE_URL_API } from "./base";

const InstructorDashboard = () => {
    const [userData, setUserData] = useState({ lastname: "Professor said plv" });
    const { userId } = useUser();
    const [instructorClasses, setInstructorClasses] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL_API}/getprofile.php?role=instructor&userId=${userId}`)
        //fetch(`${BASE_URL_API}/profile/instructor/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUserData(data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data', error);
            });
    }, [userId]);

    useEffect(() => {
        fetch(`${BASE_URL_API}/fetchInstructorClasses.php?instructorId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setInstructorClasses(data.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the classes data', error);
            });
    }, [userId]);

    return (
        <div>
            <HeaderInstructor />
            <div className="main-content">
                <div className="sidebar">
                    <h2>Welcome</h2>
                    <p>Prof.{userData.lastname}</p>
                    <Link to="editprofile" className="sidebar-link">Edit Profile</Link>
                    <h2>Dashboard</h2>
                    <Link to="courseManagement" className="sidebar-link"><i className="fas fa-book"></i> Course Management</Link>
                    <Link to="feedback" className="sidebar-link"><i className="fas fa-comments"></i> CourseContent</Link>
                    <Link to="examdesign" className="sidebar-link"><i className="fas fa-pencil-ruler"></i> Exam Design</Link>
                    <Link to="grades" className="sidebar-link"><i className="fas fa-clipboard-list"></i> Grades & Feedback</Link>
                    <Link to="studentProgress" className="sidebar-link"><i className="fas fa-chart-line"></i> Student Progress</Link>
                    <Link to="chat" className="sidebar-link"><i className="fas fa-comment-dots"></i> Chat</Link>
                </div>

                <Routes>
                    <Route path="/" element={<InstructorDashboardHome classes={instructorClasses} />} />
                    <Route path="editprofile" element={<EditProfile userRole="instructor" userId={userId} />} />
                    <Route path="chat" element={<ChatApp/>} />
                    <Route path="coursemanagement" element={<CourseManagement/>} />
                    <Route path="feedback" element={<StudentFeedback/>} />
                    <Route path="examdesign" element={<ExamDesign />} />
                    <Route path="grades" element={<GradeExams />} />
                    <Route path="studentProgress" element={<StudentProgress />} />

                </Routes>
            </div>
            <Footer />
        </div>
    );
};

const InstructorDashboardHome = ({ classes }) => {
    return (
        <div className="main-section">
            {classes.map(cls => (
                <div class="instructor-card" key={cls.class_id}>
                    <div class="instructor-image" style={{ backgroundColor: "rgb(86, 86, 164)" }}></div>
                    <div class="instructor-content">
                        <h3 class="instructor-title">{cls.course_id} {cls.course_name}</h3> 
                        <a href={cls.syllabus_link} target="_blank" rel="noopener noreferrer">Syllabus</a>
                        <p>Block: {cls.location}</p> 
                        <p>Section:{cls.section}</p>
                        <p>Enrolled Students: {cls.total_seats - cls.leftover_seats} / {cls.total_seats}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InstructorDashboard;


