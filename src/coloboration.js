import React, { useState } from 'react';
import { BASE_URL_API } from "./base1";

function CoordinationBoard() {
    const [instructorID, setInstructorID] = useState('');
    const [studentID, setStudentID] = useState('');
    const [classID, setClassID] = useState('');

    const assignInstructorToClass = async (instructorID, classID) => {
        const response = await fetch(`${BASE_URL_API}/assignInstructorToClass.php`, {
        //const response = await fetch(`${BASE_URL_API}/assign-instructor-to-class`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ instructorID, classID })
        });
        
        if (response.ok) {
            const result = await response.json();
            return result.status === 'success';
        }
        return false;
    }

    const enrollStudentToClass = async (studentID, classID, coordinatorOverride) => {
        const response = await fetch(`${BASE_URL_API}/enrollStudentToClass.php`, {
        //const response = await fetch(`${BASE_URL_API}/enroll-student-to-class`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentID, classID, coordinatorOverride })
        });
        
        if (response.ok) {
            const result = await response.json();
            return result.status === 'success';
        }
        return false;
    }

    const handleAssignInstructor = async () => {
        try {
            const result = await assignInstructorToClass(instructorID, classID);
            if (result) {
                alert('Instructor assigned successfully!');
            } else {
                alert('Failed to assign instructor. The instructor might be teaching 3 courses already.');
            }
        } catch (error) {
            console.error(error);
            alert('Error occurred while assigning instructor.');
        }
    }

    const handleEnrollStudent = async () => {
        try {
            const coordinatorOverride = window.confirm('Do you want to use the coordinator privilege to enroll the student even if they are already enrolled in 3 courses?');
            const result = await enrollStudentToClass(studentID, classID, coordinatorOverride);
            if (result) {
                alert('Student enrolled successfully!');
            } else {
                alert('Failed to enroll student. They might already be enrolled in the maximum allowed courses.');
            }
        } catch (error) {
            console.error(error);
            alert('Error occurred while enrolling student.');
        }
    }

    return (
        <div className="specialcontainer">
            <h2>Coordination Board</h2>
            
            {/* Instructor Assignment Section */}
            <h3>Assign Instructor to Class</h3>
            <label>
                Instructor ID: 
                <input type="text" value={instructorID} onChange={e => setInstructorID(e.target.value)} />
            </label>
            <label>
                Class ID:
                <input type="text" value={classID} onChange={e => setClassID(e.target.value)} />
            </label>
            <button onClick={handleAssignInstructor}>Assign Instructor</button>
            
            {/* Student Enrollment Section */}
            <h3>Enroll Student in Class</h3>
            <label>
                Student ID: 
                <input type="text" value={studentID} onChange={e => setStudentID(e.target.value)} />
            </label>
            <label>
                Class ID:
                <input type="text" value={classID} onChange={e => setClassID(e.target.value)} />
            </label>
            <button onClick={handleEnrollStudent}>Enroll Student</button>
        </div>
    );
}

export default CoordinationBoard;
