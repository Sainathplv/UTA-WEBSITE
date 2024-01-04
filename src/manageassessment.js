import React, { useState, useEffect } from 'react';
import styles from "./Adminmanagecourses.module.css";
const dummyData = [
    {
        id: 1,
        program: 'MSC in Computer Science',
        course: 'Algorithms and Data structures',
        assessmentName: 'Basic Assessment',
        description: 'Basic details',
        assessmentDate: '2022-09-20'
    },
    {
        id: 2,
        program: 'MSC in Computer Science',
        course: 'Algorithms and Data structures',
        assessmentName: 'Advanced Assessment',
        description: 'Advanced details',
        assessmentDate: '2022-09-25'
    }
];
const ManageAssessments = () => {
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        program: 'mscComputerScience',
        course: 'advancedAlgorithms',
        assessmentName: '',
        description: '',
        assessmentDate: ''
    });

    useEffect(() => {
        fetchAssessments();
    }, []);

    const fetchAssessments = async () => {
        try {
            const response = await fetch('fetchAssessments.php');
            
            if(!response.ok) {
                throw new Error("Failed to fetch data.");
            }

            const data = await response.json();
            setAssessments(data);
        } catch (error) {
            console.error("Error fetching assessments:", error);
            setError('Failed to connect to the database. Displaying dummy data.');
            setAssessments(dummyData);
        }
    };

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async (assessmentId) => {
        try {
            const response = await fetch(`deleteAssessment.php?id=${assessmentId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchAssessments();
            }
        } catch (error) {
            console.error("Error deleting assessment:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('addAssessment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                fetchAssessments();
            }
        } catch (error) {
            console.error("Error adding assessment:", error);
        }
    };

    return (
        <div className={styles.mainSection}>
            {error && <div className="error-message">{error}</div>}
            
            <h1 className="center">Assessment Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="programSelect">Select Program:</label>
                <select id="programSelect" name="program" value={form.program} onChange={handleFormChange}>
                    <option value="mscComputerScience">Computer Science</option>
                    <option value="mscDataScience">Data Science</option>
                    <option value="mscAI">Artificial Intelligence</option>
                </select>
                <br/><br/>

                <label htmlFor="courseSelect">Select Course:</label>
                <select id="courseSelect" name="course" value={form.course} onChange={handleFormChange}>
                    <option value="advancedAlgorithms">Advanced Algorithms and Data Structures</option>
                    <option value="machineLearning">Machine Learning and Artificial Intelligence</option>
                    <option value="cybersecurity">Cybersecurity Fundamentals</option>
                </select>
                <br/><br/>

                <label htmlFor="assessmentName">Assessment Name:</label>
                <input type="text" id="assessmentName" name="assessmentName" value={form.assessmentName} onChange={handleFormChange} required />
                <br/><br/>

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows="4" value={form.description} onChange={handleFormChange} required></textarea>
                <br/><br/>

                <label htmlFor="assessmentDate">Assessment Date:</label>
                <input type="date" id="assessmentDate" name="assessmentDate" value={form.assessmentDate} onChange={handleFormChange} required />
                <br/><br/>

                <input type="submit" value="Add New Assessment" />
            </form>

            <h1 className="center">Assessment List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Program</th>
                        <th>Course</th>
                        <th>Assessment Name</th>
                        <th>Description</th>
                        <th>Assessment Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map(assessment => (
                        <tr key={assessment.id}>
                            <td>{assessment.program}</td>
                            <td>{assessment.course}</td>
                            <td>{assessment.assessmentName}</td>
                            <td>{assessment.description}</td>
                            <td>{assessment.assessmentDate}</td>
                            <td>
                                {/* Edit button can be linked similarly to Delete */}
                                <input type="submit" value="Edit" />
                                <input type="submit" value="Delete" onClick={() => handleDelete(assessment.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageAssessments;
