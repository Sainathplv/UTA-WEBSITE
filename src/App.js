import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage.js';
import About from './about.js';
import Services from './Services.js';
import ContactUs from './ContactUs.js';
import Login from './login.js';
import ForgotPassword from './ForgotPassword.js';
import SignUp from './SignUp.js';
import RegisterStudent from './register_student.js';
import RegisterAdmin from './register_admin.js';
import RegisterInstructor from './register_instructor.js';
import RegisterCoordinator from './register_pc.js';
import RegisterQaOfficer from './register_qa.js';
import { UserProvider, useUser } from './UserContext';
import StudentDashboard from './studentDashboard.js'; 
import InstructorDashboard from './instructorDashboard.js';
import CoordinatorDashboard from './CoordinatorDashboard.js';
import QAOfficerDashboard from './qaofficerDashboard.js';
import AdminDashboard from './adminDashboard.js';
import ImageUpload from './ImageUpload.js';

function App() {
    return (
        <UserProvider>
            <MainAppContent />
        </UserProvider>
    );
}

function MainAppContent() {
    const { isLoggedIn, userRole } = useUser();

    return (
        <Router>
            <div className="app-container">            
                {/* Define routes */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/ImageUpload" element={<ImageUpload />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/register_student" element={<RegisterStudent />} /> 
                    <Route path="/register_admin" element={<RegisterAdmin />} /> 
                    <Route path="/register_instructor" element={<RegisterInstructor />} />
                    <Route path="/register_pc" element={<RegisterCoordinator />} />
                    <Route path="/register_qa" element={<RegisterQaOfficer />} />
                    <Route path="/studentDashboard/:userId/*" element={isLoggedIn && userRole === 'student' ? <StudentDashboard /> : <Login />} />
                    <Route path="/instructorDashboard/:userId/*" element={isLoggedIn && userRole === 'instructor' ? <InstructorDashboard /> : <Login />} />
                    <Route path="/CoordinatorDashboard/:userId/*" element={isLoggedIn && userRole === 'program_coordinator' ? <CoordinatorDashboard /> : <Login />} />
                    <Route path="/qaofficerDashboard/:userId/*" element={isLoggedIn && userRole === 'qaofficer' ? <QAOfficerDashboard /> : <Login />} />
                    <Route path="/adminDashboard/:userId/*" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Login />} />
                </Routes>
            </div>    
        </Router>
    );
}

export default App;
