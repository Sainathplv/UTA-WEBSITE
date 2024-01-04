import React, { useState, useEffect } from 'react';
import styles from './ManageUserAccounts.module.css';
import { BASE_URL_API } from "./base1";

const ManageUserAccounts = () => {
    const [selectedRole, setSelectedRole] = useState('student'); // Default to 'student'
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        fetchUsersForRole(selectedRole);
    }, [selectedRole]);

    const fetchUsersForRole = async (role) => {
        try {
            const response = await fetch(`${BASE_URL_API}/getdetailsonrole.php?role=${role}`);
            //const response = await fetch(`${BASE_URL_API}/users/role?role=${role}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.userid);
        setEditedUser(user);
    };

    const handleEditChange = (e, field) => {
        setEditedUser(prevUser => ({
            ...prevUser,
            [field]: e.target.value
        }));
    };

    const handleSave = async (userId) => {
        try {
            const response = await fetch(`${BASE_URL_API}/updateuserdetails.php`, {
           //const response = await fetch(`${BASE_URL_API}/user/update`, {    
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: userId,
                    firstname: editedUser.firstname,
                    lastname: editedUser.lastname,
                    mailid: editedUser.mailid // Assuming email is stored as mailid in editedUser object
                })
            });
            
            const responseData = await response.json();
            if (responseData.status === 'success') {
                fetchUsersForRole(selectedRole); // Re-fetch to update UI
                setEditingId(null);
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    
    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`${BASE_URL_API}/deleteUser.php`, {
            //const response = await fetch(`${BASE_URL_API}/user/delete`, {    
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid: userId }) // Sending the userid in the request body
            });
    
            const responseData = await response.json();
            if (responseData.status === 'success') {
                fetchUsersForRole(selectedRole); // Re-fetch to update UI
                alert("User deleted successfully.")
            } else {
                console.error(responseData.message);
                alert("Failed to delete user: " + responseData.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    };
    

    return (
        <div className={styles.scontainer}>
            <h2>AdminDashboard</h2>
            <div className={styles.roleButtonContainer}>
                {['student', 'admin', 'instructor', 'qaofficer', 'program_coordinator'].map(role => (
                    <button 
                        key={role} 
                        className={selectedRole === role ? styles.selected : ''} 
                        onClick={() => setSelectedRole(role)}
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize the role name */}
                    </button>
                ))}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userid}>
                            <td>
                                {editingId === user.userid ? 
                                    <input value={editedUser.userid} onChange={(e) => handleEditChange(e, 'userid')} />
                                    : 
                                    user.userid
                                }
                            </td>
                            <td>
                                {editingId === user.userid ? 
                                    <input value={editedUser.firstname} onChange={(e) => handleEditChange(e, 'firstname')} />
                                    : 
                                    user.firstname
                                }
                            </td>
                            <td>
                                {editingId === user.userid ? 
                                    <input value={editedUser.lastname} onChange={(e) => handleEditChange(e, 'lastname')} />
                                    : 
                                    user.lastname
                                }
                            </td>
                            <td>
                                {editingId === user.userid ? 
                                    <input value={editedUser.mailid} onChange={(e) => handleEditChange(e, 'mailid')} />
                                    : 
                                    user.mailid
                                }
                            </td>
                            <td>
                                {editingId === user.userid ? 
                                    <>
                                        <button onClick={() => handleSave(user.userid)}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </>
                                    : 
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                }
                                <button onClick={() => handleDelete(user.userid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUserAccounts;
