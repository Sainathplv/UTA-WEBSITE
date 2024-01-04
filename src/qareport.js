import React, { useState } from 'react';
import "./style.css";
import { BASE_URL_API } from "./base1";

function CourseDetails({ course }) {
    return (
        <div className="course-details">
            <h4>{course.course_name}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Class ID</th>
                        <th>Exam Name</th>
                        <th>Uploaded Solution</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {course.exams.map(exam => (
                        <tr key={exam.exam_id}>
                            <td>{course.class_id}</td>
                            <td>{exam.exam_name}</td>
                            <td>
                                {exam.student_upload ? (
                                    <a href={exam.student_upload} target="_blank" rel="noopener noreferrer">View Solution</a>
                                ) : "Not Uploaded"}
                            </td>
                            <td>{exam.grade ? exam.grade : "Not Graded"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StudentDetails({ student }) {
    return (
        <div className="student-details">
            <h2>{student.name} ({student.userid})</h2>
            <p>Email: {student.email}</p> 
            {student.courses.map(course => <CourseDetails key={course.course_id} course={course} />)}
        </div>
    );
}

function StudentReport() {
    const [studentId, setStudentId] = useState('');
    const [studentData, setStudentData] = useState(null);

    const fetchStudentData = () => {
        if (!studentId) return;

        fetch(`${BASE_URL_API}/fetchqasearchdata.php?studentId=${studentId}`)
        //fetch(`${BASE_URL_API}/fetchqasearchdata?studentId=${studentId}`)
            .then(response => response.json())
            .then(data => {
                setStudentData(data);
            })
            .catch(error => {
                console.error("Error fetching student data:", error);
            });
    };

    return (
        <div className="specialcontainer">
            <div className="mainsection">
                <input 
                    type="text" 
                    placeholder="Enter Student ID" 
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)} 
                />
                <button onClick={fetchStudentData}>Search</button>
                {studentData && <StudentDetails student={studentData} />}
            </div>
        </div>
    );
}

export default StudentReport;
