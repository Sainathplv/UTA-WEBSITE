import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useUser } from "./UserContext";
import "./style.css";
import HeaderCoordinator from "./Header_Coor";
import Footer from "./Footer";
import EditProfile from "./editprofile";
import ChatApp from "./chat";
import Studentsupport from "./studentsupport";
import Performance from "./performance";
import CollaborationPage from "./coloboration";
import { BASE_URL_API } from "./base";

const CoordinatorDashboard = () => {
  const [userData, setUserData] = useState({});
  const [studentEnrollment, setStudentEnrollment] = useState({});
  const [courseEnrollment, setCourseEnrollment] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      fetch(`${BASE_URL_API}/getprofile.php?role=program_coordinator&userId=${userId}`)
        .then(response => response.json())
        .then(data => setUserData(data.data))
        .catch(error => console.error("Error fetching user data:", error));

      fetch(`${BASE_URL_API}/studentEnrollment.php?userId=${userId}`)
        .then(response => response.json())
        .then(data => setStudentEnrollment(data))
        .catch(error => console.error("Error fetching student enrollment:", error));

      fetch(`${BASE_URL_API}/courseEnrollment.php?userId=${userId}`)
        .then(response => response.json())
        .then(data => setCourseEnrollment(data))
        .catch(error => console.error("Error fetching course enrollment:", error));
    }
  }, [userId]);

  return (
    <div>
      <HeaderCoordinator />
      <div className="main-content">
        <div className="sidebar">
          <h2>Welcome</h2>
          <p>Pc.{userData.lastname}</p>
          <Link to="editprofile" className="sidebar-link">
            Edit Profile
          </Link>
          <h2>Coordination Tools</h2>
          <Link to="coloboration" className="sidebar-link">
            <i className="fas fa-comments"></i> colaboration
          </Link>
          <Link to="performance" className="sidebar-link">
            <i className="fas fa-clipboard-list"></i> performance
          </Link>
          <Link to="studentsupport" className="sidebar-link">
            <i className="fas fa-chart-line"></i> Student support
          </Link>
          <Link to="chat" className="sidebar-link">
            <i className="fas fa-comment-dots"></i> Chat
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<CoordinatorDashboardHome studentEnrollment={studentEnrollment} courseEnrollment={courseEnrollment} />} />
          <Route
            path="editprofile"
            element={<EditProfile userRole="program_coordinator" userId={userId} />}
          />
          <Route path="chat" element={<ChatApp />} />
          <Route path="studentsupport" element={<Studentsupport />} />
          <Route path="performance" element={<Performance />} />
          <Route path="coloboration" element={<CollaborationPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const CoordinatorDashboardHome = ({ studentEnrollment, courseEnrollment }) => {
  return (
    <div class="container">
      <h2>Program Reports</h2>

      <section class="sreport">
        <h3>Student Enrollment</h3>
        <p>Total Students Enrolled: <strong>{studentEnrollment.totalStudents}</strong></p>
        <p>New Students This Semester: <strong>{studentEnrollment.newStudents}</strong></p>
      </section>

      <section class="sreport">
        <h3>Course Enrollment</h3>
        <ul>
          {courseEnrollment.map(course => (
            <li key={course.course_name}>
              <h3>{course.course_name}</h3>
                    {course.classes.map(c => (
                        <div key={c.class_id}>
                            <p>Class ID: {c.class_id}</p>
                            <p>Section: {c.section}</p>
                            <p>Students Joined: {c.students_joined}</p>
                        </div>
                    ))}
            </li>
          ))}
        </ul>
      </section>

      {/* ... other sections ... */}
    </div>
  );
};

export default CoordinatorDashboard;
