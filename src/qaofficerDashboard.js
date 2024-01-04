import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import styles from "./QAOfficerDashboard.module.css";
import Footer from "./Footer"; 
import HeaderOfficer from "./HeaderOfficer"; 
import { useUser } from './UserContext';
import EditProfile from "./editprofile";
import ChatApp from "./chat";
import ReviewCourseContent from "./qacourse";
import Recommendations from "./recomendation";
import ManagementAssessment from "./qaasses";
import QAReport from "./qareport";
import { BASE_URL_API } from "./base";

const QAOfficerDashboard = () => {
  const [userData, setUserData] = useState({ lastname: "Officer AA Mark" });
  const { userId } = useUser();

  useEffect(() => {
    // Fetch user data if needed. Just as an example.
    fetch(`${BASE_URL_API}/getprofile.php?role=qaofficer&userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data', error);
      });
  }, [userId]);

  return (
    <div>
      <HeaderOfficer />
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <h2>Welcome</h2>
          <p>Officer {userData.lastname}</p>
          <Link to="editprofile" className={styles.sidebarLink}>Edit Profile</Link>
          <h2>Dashboard</h2>
          <Link to="qa_course" className={styles.sidebarLink}>Review Course Content</Link>
          <Link to="qareport" className={styles.sidebarLink}>QAReport</Link>
          <Link to="recommendation" className={styles.sidebarLink}>Recommendations</Link>
          <Link to="qaasses" className={styles.sidebarLink}>ManageAssessment</Link>
          <Link to="chat" className={styles.sidebarLink}>
            <i className="fas fa-comment-dots"></i> Chat
          </Link>
          {/* ... add any more sidebar links here */}
        </div>
        
        <Routes>
          <Route path="/" element={<QADashboardHome />} />
          <Route
            path="editprofile"
            element={<EditProfile userRole="qaofficer" userId={userId} />}
          />
          <Route path="chat" element={<ChatApp />} />
          <Route path="qa_course" element={<ReviewCourseContent />} />
          <Route path = "recommendation" element={<Recommendations />} />
          <Route path = "qaasses" element={<ManagementAssessment />} />
          <Route path = "qareport" element={<QAReport />} />

          {/* ... add more routes here if needed */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const QADashboardHome = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.qaCard}>
        <Link to="qa_course" className={styles.qaLink}>Review Course Content</Link>
      </div>
      <div className={styles.qaCard}>
        <Link to="qareport" className={styles.qaLink}>QAReport</Link>
      </div>
      <div className={styles.qaCard}>
        <Link to="recommendation" className={styles.qaLink}>Recommendations</Link>
      </div>
      <div className={styles.qaCard}>
        <Link to="qaasses" className={styles.qaLink}>ManagementAssessment</Link>
      </div>
    </div>
  );
};

export default QAOfficerDashboard;
