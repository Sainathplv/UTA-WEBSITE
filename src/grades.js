import React, { useState, useEffect } from "react";
import { useUser } from './UserContext';
import { Link } from "react-router-dom";
import "./style.css";
import { BASE_URL_API } from "./base1";
const GradeExams = () => {
    const [exams, setExams] = useState([]);
    const [grades, setGrades] = useState({}); // To manage grades
    const [feedbacks, setFeedbacks] = useState({}); // New state to manage feedbacks
    const { userId } = useUser();

    useEffect(() => {
        fetch(`${BASE_URL_API}/getExamsForGrading.php?instructorId=${userId}`)
        //fetch(`${BASE_URL_API}/get-exams-for-grading?instructorId=${userId}`)

            .then(response => response.json())
            .then(data => setExams(data))
            .catch(error => {
                console.error('There was an error fetching the exams for grading', error);
            });
    }, [userId]);

    const handleGradeChange = (uploadId, grade) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [uploadId]: grade
        }));
    };

    const handleFeedbackChange = (uploadId, feedback) => {
        setFeedbacks(prevFeedbacks => ({
            ...prevFeedbacks,
            [uploadId]: feedback
        }));
    };

    const handleGradeSubmit = (exam) => {
        const grade = grades[exam.upload_id];
        const feedback = feedbacks[exam.upload_id];

        // Validate grade and feedback
        if (!grade) {
            alert("Please enter a grade before submitting.");
            return;
        }
        if (!feedback) {
            alert("Please enter feedback before submitting.");
            return;
        }

        fetch(`${BASE_URL_API}/submitGrade.php`, {
        //fetch(`${BASE_URL_API}/submit-grade`, {    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                upload_id: exam.upload_id,
                instructor_id: userId,
                grade: grade,
                feedback: feedback
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Remove graded exam from the front end
                const updatedExams = exams.filter(e => e.upload_id !== exam.upload_id);
                setExams(updatedExams);
            } else {
                console.error('Failed to submit grade');
            }
        });
    };

    return (
        <div className="mainsection">
            <h2>Grade Exams</h2>
            <table className="progress-table">
                <thead>
                    <tr>
                        <th>Class ID</th>
                        <th>Exam Name</th>
                        <th>Student ID</th>
                        <th>Student Submission</th>
                        <th>Exam_Date</th>
                        <th>Uploaded_at</th>
                        <th>Grade</th>
                        <th>Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map(exam => (
                        <tr key={exam.upload_id}>
                            <td>{exam.class_id}</td>
                            <td>{exam.exam_name}</td>
                            <td>{exam.student_id}</td>
                            <td><Link to={exam.student_file} target="_blank" className="exam-download-link">Download Submission</Link></td>
                            <td>{exam.exam_date}</td>
                            <td>{exam.uploaded_at}</td>
                            <td>
                                <input 
                                    type="number" 
                                    min="0" 
                                    max={exam.max_marks}
                                    placeholder="Enter grade"
                                    value={grades[exam.upload_id] || ""}
                                    onChange={e => handleGradeChange(exam.upload_id, e.target.value)}
                                />
                            </td>
                            
                            <td>
                                <textarea 
                                    placeholder="Enter feedback"
                                    value={feedbacks[exam.upload_id] || ""}
                                    onChange={e => handleFeedbackChange(exam.upload_id, e.target.value)}
                                ></textarea>
                            </td>
                            <td>
                                <button className="btn-submit" onClick={() => handleGradeSubmit(exam)}>Grade</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GradeExams;
