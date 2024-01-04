import React, { useState, useEffect } from 'react';
import styles from './AdminPermissions.module.css';
import { BASE_URL_API } from "./base1";   

const AdminPermissions = () => {
    const [userData, setUserData] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserData = () => {
        fetch(`${BASE_URL_API}/getlogsuserdata.php`)
        //fetch(`${BASE_URL_API}/getlogsuserdata`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success && data.users) {
                    setUserData(data.users);
                } else {
                    setError(data.message || 'Failed to fetch user data.');
                }
            })
            .catch(err => setError('Failed to fetch user data. ' + err.message));

    }
    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL_API}/getActivityData.php`)
        //fetch(`${BASE_URL_API}/getActivityData`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success && data.activityData) {
                    setActivityData(data.activityData);
                } else {
                    setError(data.message || 'Failed to fetch activity data.');
                }
            })
            .catch(err => setError('Failed to fetch activity data. ' + err.message));
    }, []);

    const handleEditPermissions = (user) => {
        console.log("Editing permissions for:", user);
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSavePermissions = (userId, newPermissions) => {
        fetch(`${BASE_URL_API}/admin_permissionedit.php`, { 
        //fetch(`${BASE_URL_API}/editPermissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, permissions: newPermissions }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Permissions updated successfully");
                setIsModalOpen(false);// Close the modal on success
                fetchUserData(); 
            } else {
                alert("Failed to update permissions: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error updating permissions:", error);
        });
    };
    

    return (
        <div className={styles.adminpermissionscontainer}>
        <section>
            <div>
                {error && <div className={styles.error}>{error}</div>}

                <h2>User Management</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Permissions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => (
                            <tr key={user.userid}>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.role}</td>
                                <td>{user.permissions || 'None'}</td>
                                <td>
                                    <button className={styles.btn} onClick={() => handleEditPermissions(user)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Activity Monitoring</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Activity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityData.map(activity => (
                            <tr key={activity.id}>
                                <td>{activity.name}</td>
                                <td>{activity.activity}</td>
                                <td>{activity.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && selectedUser && (
                <PermissionsModal 
                    user={selectedUser} 
                    onClose={handleCloseModal} 
                    onSave={handleSavePermissions} 
                />
            )}
        </section>
        </div>
    );
};

const PermissionsModal = ({ user, onClose, onSave }) => {
    console.log("permissionsModal for:", user);
    // Assuming these are the possible permissions
    const allPermissions = ["read", "upload", "download", "edit", "delete"];
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    /*useEffect(() => {
        // Initialize the selected permissions from the user's current permissions
        setSelectedPermissions(user.permissions.split(', '));
    }, [user]);*/
    useEffect(() => {
        // Split the permissions string into an array and set it as the initial state
        const userPermissions = user.permissions ? user.permissions.split(', ') : [];
        setSelectedPermissions(userPermissions);
        console.log("Permissions for user:", user.firstname, user.lastname, userPermissions);
    }, [user]);

    const handlePermissionChange = (permission) => {
        setSelectedPermissions(prevPermissions => {
            if (prevPermissions.includes(permission)) {
                return prevPermissions.filter(p => p !== permission);
            } else {
                return [...prevPermissions, permission];
            }
        });
    };

    const handleSave = () => {
        console.log("Saving permissions for user:", user.userid, "with permissions:", selectedPermissions);
        onSave(user.user_id, selectedPermissions);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Edit Permissions for {user.firstname} {user.lastname}</h2>
                <div>
                    <label>Permissions:</label>
                    {allPermissions.map(permission => (
                        <div key={permission}>
                            <input 
                                type="checkbox" 
                                checked={selectedPermissions.includes(permission)}
                                onChange={() => handlePermissionChange(permission)}
                            />
                            {permission}
                        </div>
                    ))}
                </div>
                <div className={styles.modalActions}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};


export default AdminPermissions;
