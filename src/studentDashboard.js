import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./style.css";
import Footer from "./Footer";
import Headerstu from "./Header_stu";
import EditProfile from "./editprofile";
import { useUser } from './UserContext';
import Exams from "./exams";
import Enroll from "./enroll";
import ChatApp from "./chat";
import Report from "./reports";
import { BASE_URL_API } from "./base1";

const StudentDashboard = () => {
    const [userData, setUserData] = useState({ lastname: "Mr. Palavala" });
    const [courses, setCourses] = useState([]);
    const { userId } = useUser();


    

    useEffect(() => {
        fetch(`${BASE_URL_API}/getprofile.php?role=student&userId=${userId}`)
        //fetch(`${BASE_URL_API}/profile/student/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setUserData(data.data);
                } else {
                    console.error('Error fetching data:', data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the user data', error);
            });
    }, [userId]);

    useEffect(() => {
        fetch(`${BASE_URL_API}/coursesenrolled.php?userId=${userId}`)
        //fetch(`${BASE_URL_API}/enrollments/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setCourses(data.data);
                } else {
                    console.error('Error fetching courses:', data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the courses data', error);
            });
    }, [userId]);



    return (
        <div>
            <Headerstu />
            <div className="main-content">
                <div className="sidebar">
                    <h2>Welcome</h2>
                    <p>{userData.lastname}</p>
                    <Link to="editprofile" className="sidebar-link">Edit Profile</Link>
                    <h2>Dashboard</h2>
                    <Link to="exams" className="sidebar-link"><i className="fas fa-file-alt"></i> Exams</Link>
                    <Link to="enroll" className="sidebar-link"><i className="fas fa-user-plus"></i> Enroll</Link>
                    <Link to="./" className="sidebar-link"><i className="fas fa-book-open"></i> Courses</Link>
                    <Link to="reports" className="sidebar-link"><i className="fas fa-chart-bar"></i> Results & Reports</Link>
                    <Link to="chat" className="sidebar-link"><i className="fas fa-comments"></i> Chat</Link>
                </div>

                <Routes>
                    <Route path="/" element={<DashboardHome courses={courses} />} />
                    <Route path="editprofile" element={<EditProfile userRole="student" userId={userId} />} />
                    <Route path="exams" element={<Exams />} />
                    <Route path="enroll" element={<Enroll />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="reports" element={<Report />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

const DashboardHome = ({ courses }) => {
    return (
        <div className="main-section">
            {courses.map(course => (
                <div className="course-card" key={course.course_id}>
                    <div className="course-image" style={{ backgroundColor: course.color || 'orange' }}></div>
                    <div className="course-content">
                        <h3 className="course-title">{course.course_id} {course.course_name}</h3>
                        <a href={course.syllabus_link} target="_blank" rel="noopener noreferrer">Syllabus</a>
                        <p>Section:{course.section}</p>
                        <p>Block:{course.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentDashboard;