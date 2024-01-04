import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import styles from "./AdminDashboard.module.css";  // Assuming you have this CSS module
import Footer from "./Footer";
import HeaderAdmin from "./HeaderAdmin";  // You might need to create this component or use an existing header component
import { useUser } from './UserContext';
import EditProfile from "./editprofile"; 
import Chat from "./chat"; 
import ManageCourses from "./managecourses";
import ManageUserAccounts from "./manageuseraccount";
import ManageReports from "./adminreport";
import AdminPermissions from "./adminpermissions";
import { BASE_URL_API } from "./base";
//... import other necessary components like ManageCourse, Reports, UserAccounts, etc.

const AdminDashboard = () => {
  const [userData, setUserData] = useState({ name: "Admin Adam Jackson" });
  const { userId } = useUser();

  useEffect(() => {
    // Fetch user data if needed. Just as an example.
    fetch(`${BASE_URL_API}/getprofile.php?role=admin&userId=${userId}`)
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
      <HeaderAdmin />
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <h2>Welcome</h2>
          <p>{userData.lastname}</p>
          <Link to="editprofile" className={styles.sidebarLink}>Edit Profile</Link>
          <h2>Dashboard</h2>
          <Link to="managecourses" className={styles.sidebarLink}>ManageCourses</Link>
          <Link to="manageuseraccount" className={styles.sidebarLink}>ManageUserAccounts</Link>
          <Link to="adminreport" className={styles.sidebarLink}>ManageReports</Link>
          <Link to="adminpermissions" className={styles.sidebarLink}>AdminPermissions</Link>
          <Link to="chat" className={styles.sidebarLink}><i className="fas fa-comments"></i> Chat</Link>
          {/* ... add any more sidebar links here */}
        </div>

        <Routes>
          <Route path="/" element={<AdminDashboardHome />} />
          <Route path="editprofile" element={<EditProfile userRole="admin" userId={userId} />} />
          <Route path="chat" element={<Chat />} />
          <Route path="managecourses" element={<ManageCourses />} />
          <Route path="manageuseraccount" element={<ManageUserAccounts />} />
          <Route path="adminreport" element={<ManageReports />} />
          <Route path="adminpermissions" element={<AdminPermissions />} />


          {/* ... add more routes here if needed */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const AdminDashboardHome = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.adminCard}>
        <Link to="managecourses" className={styles.adminLink}>ManageCourses</Link>
      </div>
      <div className={styles.adminCard}>
        <Link to="manageuseraccount" className={styles.adminLink}>ManageUserAccounts</Link>
      </div>
      <div className={styles.adminCard}>
        <Link to="manageassessment" className={styles.adminLink}>ManageAssessments</Link>
      </div>
      <div className={styles.adminCard}>
        <Link to="adminreport" className={styles.adminLink}>ManageReports</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
