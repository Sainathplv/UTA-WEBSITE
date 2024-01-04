import React, { useState, useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { BASE_URL_API } from "./base1";

const EditProfile = ({ userRole, userId }) => {
    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        mailid: '',
        dob: '',
        password: '',
        enrollmentYear: null,
        enrollmentSeason: '',
        start_date: '',
        salary: null,
        program: '',
        experience: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);


    const fetchProfileData = useCallback(async () => { // Wrap with useCallback
        setIsLoading(true);
        try {
            const endpoint = `${BASE_URL_API}/getprofile.php?role=${userRole}&userId=${userId}`;
            const response = await axios.get(endpoint);
            // Fetch profile
            //const response = await axios.get(`${BASE_URL_API}/profile/${userRole}/${userId}`);
            console.log('Full Response:', response);
            if (response.data && response.data.status === 'success') {
                setProfileData(prev => ({ ...prev, ...response.data.data }));
            } else if (response.data && response.data.message) {
                console.error("Error from server:", response.data.message);
                setError("An error occurred. Please try again.");
            } else {
                console.error("Unexpected server response:", response);
                setError("An unexpected error occurred.");
            }
            
        } catch (error) {
            setError("An error occurred while fetching data.");
        } finally {
            setIsLoading(false);
        }
    }, [userRole, userId]); // Add dependencies here

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updateEndpoint = `${BASE_URL_API}/updateprofile.php?role=${userRole}&userId=${userId}`;
            const response = await axios.post(updateEndpoint, profileData);
            // Update profile
            //const response = await axios.post(`${BASE_URL_API}/profile/${userRole}/${userId}`, profileData);
            if (response.data.status === 'success') { // Changed this line
                console.log(response.data.message);
                setIsUpdated(true);  // For update feedback
                setTimeout(() => setIsUpdated(false), 3000);
                fetchProfileData(); // Refetch profile after update
            } else {
                console.error("Error from server:", response.data.message);
                setError("An error occurred. Please try again.");
            }
        } catch (error) {
            setError("An error occurred while updating data.");
        }
    }

    if (isLoading) return <div>Loading...</div>; // Show a loading message (or spinner) while fetching data
    if (error) return <div>{error}</div>;

    return (
        <div className="editProfile-container">
            {isUpdated && <div className="success-message">Profile updated successfully!</div>}
            <FormComponent profileData={profileData} handleUpdate={handleUpdate} setProfileData={setProfileData} userRole={userRole} />
        </div>
    );
};

const FormComponent = ({ profileData, handleUpdate, setProfileData, userRole }) => {
    return (
        <form onSubmit={handleUpdate}>
            <input className="editProfile-input" type="text" value={profileData.firstname} onChange={e => setProfileData({ ...profileData, firstname: e.target.value })} placeholder="First Name" />
            <input className="editProfile-input" type="text" value={profileData.lastname} onChange={e => setProfileData({ ...profileData, lastname: e.target.value })} placeholder="Last Name" />
            <input className="editProfile-input" type="email" value={profileData.mailid} onChange={e => setProfileData({ ...profileData, mailid: e.target.value })} placeholder="Email" />
            <input className="editProfile-input" type="date" value={profileData.dob} onChange={e => setProfileData({ ...profileData, dob: e.target.value })} placeholder="Date of Birth" />
            <input className="editProfile-input" type="password" value={profileData.password} onChange={e => setProfileData({ ...profileData, password: e.target.value })} placeholder="Password" />
            
            {userRole === 'student' && (
                <>
                    <input className="editProfile-input" type="number" value={profileData.enrollmentYear} onChange={e => setProfileData({ ...profileData, enrollmentYear: e.target.value })} placeholder="Enrollment Year" />
                    <select className="editProfile-input" value={profileData.enrollmentSeason} onChange={e => setProfileData({ ...profileData, enrollmentSeason: e.target.value })}>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                    </select>
                </>
            )}
            {(userRole === 'qaofficer' || userRole === 'instructor' || userRole === 'admin' || userRole === 'program_coordinator') && (
                <input className="editProfile-input" type="date" value={profileData.start_date} onChange={e => setProfileData({ ...profileData, start_date: e.target.value })} placeholder="Start Date" />
            )}
            {userRole === 'qaofficer' && (
                <>
                    <input className="editProfile-input" type="number" step="0.01" value={profileData.salary} onChange={e => setProfileData({ ...profileData, salary: e.target.value })} placeholder="Salary" />
                </>
            )}
            {userRole === 'program_coordinator' && (
                <input className="editProfile-input" type="text" value={profileData.program} onChange={e => setProfileData({ ...profileData, program: e.target.value })} placeholder="Program" />
            )}
            {userRole === 'admin' && (
                <input className="editProfile-input" type="text" value={profileData.experience} onChange={e => setProfileData({ ...profileData, experience: e.target.value })} placeholder="Experience" />
            )}
            
            <button type="submit">Update Profile</button>
            <Link to="./">Go Back</Link>
        </form>
    );
};

export default EditProfile;
